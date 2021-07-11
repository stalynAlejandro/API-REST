using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.ViewModels;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using OrchardCore.Modules;
using KeTePongo.ConsumerWebAPI.Abstractions;
using Microsoft.Extensions.DependencyInjection;
using KeTePongo.UsersWebAPI.Abstractions.DTOs;
using Microsoft.Extensions.Localization;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Notifications.Abstractions.Events;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Core.Extensions;
using System.Linq;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public class ConsumerUserProfileAppService : IConsumerUserProfileAppService
    {
        private readonly IMapper _mapper;
        private readonly IInvitationTokenProvider _invitationTokenProvider;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly ILogger<ConsumerAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<IConsumerUserChangesEventHandler>> _consumerUserChangesEventHandlers;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;

        private IStringLocalizer S;
        public ConsumerUserProfileAppService(
            ISession session,
            IMapper mapper,
            IInvitationTokenProvider invitationTokenProvider,
            ILogger<ConsumerAppService> logger,
            IEmailTemplateService emailTemplateService,
            IServiceProvider serviceProvider,
            IStringLocalizer<ConsumerUserProfileAppService> stringLocalizer)
        {
            S = stringLocalizer;
            _consumerUserChangesEventHandlers = new Lazy<IEnumerable<IConsumerUserChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IConsumerUserChangesEventHandler>>());
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _session = session;
            _mapper = mapper;
            _invitationTokenProvider = invitationTokenProvider;
            _logger = logger;
            _emailTemplateService = emailTemplateService;
        }
        public async Task<ConsumerInvitationValidationViewModel> GetConsumerInvitationValidationViewModelAsync(string token, Action<string, string> addError)
        {
            var invitation = _invitationTokenProvider.ValidateInvitationToken(token);
            if (invitation.oid == 0 || string.IsNullOrWhiteSpace(invitation.email) || invitation.userType != (int)UserType.ConsumerUser)
            {
                return new ConsumerInvitationValidationViewModel() { UserExists = false };
            }
            var userIndex = await _session.QueryIndex<ConsumerUserProfileIndex>(ConsumerUserProfileIndex.GetExprByUserEmail(invitation.email)).FirstOrDefaultAsync();
            if (userIndex == null)
            {
                return new ConsumerInvitationValidationViewModel() { UserExists = false };
            }
            var consumerInvitation = await GetConsumerInvitationInternal(invitation.oid);
            if (consumerInvitation == null)
            {
                addError(nameof(invitation.oid), S["There was a problem getting the invitation to {0}", invitation.oid]);
                return null;
            }
            var newConsumer = await _session.Query<Consumer, ConsumerIndex>(ConsumerIndex.GetExprByConsumerOID(consumerInvitation.ConsumerOID)).FirstOrDefaultAsync();
            if (newConsumer == null)
            {
                addError(nameof(consumerInvitation.ConsumerOID), S["The consumer doesn't exist", consumerInvitation.ConsumerOID]);
                return null;
            }
            var invitationToConsumerViewModel = new ConsumerInvitationValidationViewModel()
            {
                Email = userIndex.Email, 
                OID = invitation.oid,
                NewConsumerTradeName = newConsumer.TradeName,
                OldConsumerTradeName = null,
                UserExists = true
            };
            Consumer oldConsumer;
            if (userIndex != null && (oldConsumer = await _session.Query<Consumer, ConsumerIndex>(ConsumerIndex.GetExprByConsumerOID(userIndex.ConsumerOID)).FirstOrDefaultAsync()) != null)
            {
                if (oldConsumer.OID != newConsumer.OID)
                {
                    invitationToConsumerViewModel.OldConsumerTradeName = oldConsumer.TradeName;
                }
                else
                {
                    await RemoveExpiredInvitationsOrOldInvitations(consumerInvitation);
                    return null;
                }
            }
            return invitationToConsumerViewModel;
        }
        public Task<bool> AssignConsumerToUserAsync(string userName, long consumerOID, Action<string, string> addError)
        {
            return AssignConsumerToUserAsync(userName, null, consumerOID, addError);
        }
        private Task<bool> AssignConsumerToUserAsync(ConsumerInvitation consumerInvitation, Action<string, string> addError)
        {
            return AssignConsumerToUserAsync(null, consumerInvitation.Email, consumerInvitation.ConsumerOID, addError);
        }
        private async Task<bool> AssignConsumerToUserAsync(string userName, string userEmail, long consumerOID, Action<string, string> addError)
        {
            var consumerDataIndex = await _session.Query<Consumer,ConsumerIndex>(ConsumerIndex.GetExprByConsumerOID(consumerOID)).FirstOrDefaultAsync();
            if (consumerDataIndex == null)
            {
                _logger.LogError("Unable to get the New consumer");
                return false;
            }
            var filter = string.IsNullOrEmpty(userName) ? ConsumerUserProfileIndex.GetExprByUserEmail(userEmail) : ConsumerUserProfileIndex.GetExprByUserName(userName);
            var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(filter).FirstOrDefaultAsync();
            consumerUserProfile.IsAdmin = false;
            var sourceConsumerOID = consumerUserProfile.ConsumerOID;
            consumerUserProfile.ConsumerOID = consumerOID;
            _session.Save(consumerUserProfile);
            await _session.CommitAsync();

            var changedUsersOfAConsumerContext = new AddedUsersToAConsumerContext(
                sourceConsumerOID: sourceConsumerOID,
                targetConsumerOID: consumerUserProfile.ConsumerOID,
                userNames: new string[] { consumerUserProfile.UserName },
                isAdminUser: consumerUserProfile.IsAdmin
                );
            await _consumerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAConsumerAsync(changedUsersOfAConsumerContext, addError), _logger);
            return true;
        }
        public async Task<bool> ConfirmConsumerInvitationAsync(ConsumerInvitationValidationViewModel invitationToConsumerViewModel, Action<string, string> addError)
        {
            ConsumerInvitation consumerInvitation = await GetConsumerInvitationInternal(invitationToConsumerViewModel.OID);
            if (consumerInvitation is null)
            {
                addError(nameof(consumerInvitation.OID), S["Invitation not found"]);
                return false;
            }

            var result = await AssignConsumerToUserAsync(consumerInvitation, addError);
            if (result)
            {
                await RemoveExpiredInvitationsOrOldInvitations(consumerInvitation);
            }
            return result;
        }

        private async Task RemoveExpiredInvitationsOrOldInvitations(ConsumerInvitation consumerInvitation)
        {
            var invitationsIds = (await _session.QueryIndex<ConsumerInvitationIndex>(ConsumerInvitationIndex.GetExprByEmail(consumerInvitation.Email)).ListAsync())?.Select(c=>c.DocumentId);
            foreach (var invitationId in invitationsIds)
            {
                _session.Delete<ConsumerInvitation>(invitationId);
            }
            await _session.CommitAsync();
        }
       
        public async Task<List<ConsumerInvitationDTO>> CreateConsumerInvitationAsync(List<NewConsumerInvitationDTO> newConsumerInvitationsDTO, ConsumerClaimsPrincipal user, IUrlHelper urlHelper, string httpContextScheme, Action<string, string> addError)
        {
            if (user.ConsumerOID == 0)
            {
                _logger.LogInformation($"The User {user.Identity.Name} hasn't any consumer");
                return null;
            }
            var result = new List<ConsumerInvitation>();
            foreach (NewConsumerInvitationDTO newConsumerInvitationDTO in newConsumerInvitationsDTO)
            {
                var newUserInvitation = _mapper.Map<NewConsumerInvitationDTO, ConsumerInvitation>(newConsumerInvitationDTO);
                newUserInvitation.ConsumerOID = user.ConsumerOID;
                newUserInvitation.CreatorUserName = user.UserName;
                _session.Save(newUserInvitation);
                await _session.CommitAsync();
                string invitationToken = _invitationTokenProvider.GenerateInvitationToken(newUserInvitation.OID, newUserInvitation.Email, (int)UserType.ConsumerUser);
                var invitationUrl = urlHelper.Action("ConfirmInvitation", "ConfirmInvitation", new { area = "KeTePongo.UsersWebAPI", token = invitationToken }, httpContextScheme);
                if (await SendInvitationEmailAsync(newUserInvitation, invitationUrl, addError))
                {
                    result.Add(newUserInvitation);
                }
            }
            return _mapper.Map<List<ConsumerInvitation>, List<ConsumerInvitationDTO>>(result); ;
        }
        private async Task<bool> SendInvitationEmailAsync(ConsumerInvitation consumerInvitation, string invitationUrl, Action<string, string> addError)
        {
            var emailViewModel = new ConsumerUserConfirmInvitationEmailViewModel()
            {
                ConsumerInvitation = consumerInvitation,
                ConfirmationUrl = invitationUrl
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(emailViewModel, "TemplateUserConfirmInvitationEmail");
            return await _emailTemplateService.SendEmailAsync(consumerInvitation.Email, $"{Constants.KeTePonGoAppName} - Accede a tu cuenta", body);
        }
        
        public async Task<(ConsumerDTO consumer, ConsumerUserProfileDTO consumerUserProfile)> GetConsumerAndUserInfoAsync(string userName)
        {
            var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(ConsumerUserProfileIndex.GetExprByUserName(userName)).FirstOrDefaultAsync();
            if (consumerUserProfile == null)
            {
                return (null,null);
            }
            var resultConsumerUserProfile = _mapper.Map<ConsumerUserProfile, ConsumerUserProfileDTO>(consumerUserProfile);
            var consumer = await _session.Query<Consumer,ConsumerIndex>(i => i.OID == consumerUserProfile.ConsumerOID).FirstOrDefaultAsync();
            if (consumer == null)
            {
                return (null, resultConsumerUserProfile);
            }
            return (_mapper.Map<Consumer, ConsumerDTO>(consumer), resultConsumerUserProfile);
        }
        public async Task<IEnumerable<ConsumerDTO>> GetConsumersToMoveUserFromCurrentConsumerAsync(long currentConsumerOID, Pager pager)
        {
            var query = _session.Query<Consumer, ConsumerIndex>(ConsumerIndex.GetExprByConsumerOID(currentConsumerOID));
            var result = await query.Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<Consumer>, IEnumerable<ConsumerDTO>>(result);
        }
        public Task<int> GetCountOfConsumersToMoveUserFromCurrentConsumerAsync(long currentConsumerOID)
        {
            return _session.Query<Consumer, ConsumerIndex>().Where(i => i.OID != currentConsumerOID).CountAsync();
        }

        public async Task<IEnumerable<ConsumerUserProfileDTO>> GetConsumerUsersAsync(long currentConsumerOID, Pager pager)
        {
            var result = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(ConsumerUserProfileIndex.GetExprByConsumerOID(currentConsumerOID)).Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<ConsumerUserProfile>, IEnumerable<ConsumerUserProfileDTO>>(result);
        }
        public async Task<ConsumerInvitationDTO> GetConsumerInvitation(long oid)
        {
            return _mapper.Map<ConsumerInvitation,ConsumerInvitationDTO>(await GetConsumerInvitationInternal(oid));
        }
        private async Task<ConsumerInvitation> GetConsumerInvitationInternal(long oid)
        {
            var result = await _session.Query<ConsumerInvitation, ConsumerInvitationIndex>()
                    .Where(x => x.OID == oid)
                    .FirstOrDefaultAsync();
            return result;
        }
    }
}
