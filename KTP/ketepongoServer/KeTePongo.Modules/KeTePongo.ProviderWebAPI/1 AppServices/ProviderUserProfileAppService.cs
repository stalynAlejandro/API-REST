using AutoMapper;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using OrchardCore.Modules;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.ViewModels;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Indexes;
using KeTePongo.ProviderWebAPI.WebAPI.ViewModels;
using Microsoft.Extensions.DependencyInjection;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using System.Linq;
using KeTePongo.Notifications.Abstractions.Events;
using KeTePongo.Notifications.Abstractions.DTOs;
using Microsoft.Extensions.Localization;
using KeTePongo.Core.Extensions;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public class ProviderUserProfileAppService : IProviderUserProfileAppService
    {
        private readonly IMapper _mapper;
        private readonly IInvitationTokenProvider _invitationTokenProvider;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly ILogger<ProviderAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<IProviderUserChangesEventHandler>> _providerUserChangesEventHandlers;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;

        private readonly IStringLocalizer S;

        public ProviderUserProfileAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            IInvitationTokenProvider invitationTokenProvider,
            ILogger<ProviderAppService> logger,
            IEmailTemplateService emailTemplateService,
            IStringLocalizer<ProviderUserProfileAppService> stringLocalizer)
        {
            _providerUserChangesEventHandlers = new Lazy<IEnumerable<IProviderUserChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IProviderUserChangesEventHandler>>());
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _session = session;
            _mapper = mapper;
            _invitationTokenProvider = invitationTokenProvider;
            _logger = logger;
            _emailTemplateService = emailTemplateService;
            S = stringLocalizer;
        }
        public async Task<ProviderInvitationValidationViewModel> GetProviderInvitationValidationViewModelAsync(string token, Action<string, string> addError)
        {
            ProviderInvitationValidationViewModel providerInvitationValidationViewModel;
            var invitation = _invitationTokenProvider.ValidateInvitationToken(token);
            if (invitation.oid == 0 || invitation.email == null || invitation.userType == 0)
            {
                return new ProviderInvitationValidationViewModel() { UserExists = false };
            }
            ProviderUserProfileIndex userIndex;
            userIndex = await _session.QueryIndex<ProviderUserProfileIndex>(i => i.Email == invitation.email).FirstOrDefaultAsync();
            if (userIndex == null)
                return new ProviderInvitationValidationViewModel() { UserExists = false };

            var providerInvitation = await GetProviderInvitationInternal(invitation.oid);
            if (providerInvitation == null)
            {
                addError(nameof(invitation.oid), $"There was a problem getting the provider with invitation {invitation.oid}");
                return null;
            }
            var newProvider = await _session.Query<Provider, ProviderIndex>(p => p.OID == providerInvitation.ProviderOID).FirstOrDefaultAsync();
            if (newProvider == null)
            {
                addError(nameof(providerInvitation.ProviderOID), $"The provider with id {providerInvitation.ProviderOID} doesn't exist ");
                return null;
            }
            providerInvitationValidationViewModel = new ProviderInvitationValidationViewModel()
            {
                Email = userIndex.Email,
                OID = invitation.oid,
                NewProviderTradeName = newProvider.TradeName,
                OldProviderTradeName = null,
                UserExists = true
            };
            Provider oldProvider;
            if (userIndex != null && (oldProvider = await _session.Query<Provider, ProviderIndex>(p => p.OID == userIndex.ProviderOID).FirstOrDefaultAsync()) != null)
            {
                if (oldProvider.OID != newProvider.OID)
                    providerInvitationValidationViewModel.OldProviderTradeName = oldProvider.TradeName;
                else
                {
                    await RemoveExpiredInvitationsOrOldInvitations(providerInvitation);
                    return null;
                }
            }
            return providerInvitationValidationViewModel;
        }
        public Task<bool> AssignProviderToUserAsync(string userName, long providerOID, Action<string, string> addError)
        {
            return AssignProviderToUserAsync(userName, null, providerOID, addError);
        }
        private Task<bool> AssignProviderToUserAsync(ProviderInvitation providerInvitation, Action<string, string> addError)
        {
            return AssignProviderToUserAsync(null, providerInvitation.Email, providerInvitation.ProviderOID, addError);
        }
        private async Task<bool> AssignProviderToUserAsync(string userName, string userEmail, long providerOID, Action<string, string> addError)
        {
            long sourceProviderOID;
            ProviderUserProfile providerUserProfile;
            var providerDataIndex = await _session.Query<Provider, ProviderIndex>(i => i.OID == providerOID).FirstOrDefaultAsync();
            if (providerDataIndex == null)
            {
                _logger.LogError("Unable to get the New consumer");
                return false;
            }

            var filter = !string.IsNullOrWhiteSpace(userName) ? ProviderUserProfileIndex.GetExprByUserName(userName) : ProviderUserProfileIndex.GetExprByUserEmail(userEmail);
            providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(filter).FirstOrDefaultAsync();
            providerUserProfile.IsAdmin = false;
            sourceProviderOID = providerUserProfile.ProviderOID;
            providerUserProfile.ProviderOID = providerOID;
            _session.Save(providerUserProfile);
            await _session.CommitAsync();

            var changedUsersOfAConsumerContext = new AddedUsersToAProviderContext(
                sourceProviderOID: sourceProviderOID,
                targetProviderOID: providerUserProfile.ProviderOID,
                userNames: new string[] { providerUserProfile.UserName },
                isAdminUser: providerUserProfile.IsAdmin
                );
            await _providerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAProviderAsync(changedUsersOfAConsumerContext, addError), _logger);
            return true;
        }
        public async Task<bool> ConfirmProviderInvitationAsync(ProviderInvitationValidationViewModel invitationToProviderViewModel, Action<string, string> addError)
        {
            ProviderInvitation providerInvitation = await GetProviderInvitationInternal(invitationToProviderViewModel.OID);
            if (providerInvitation is null)
            {
                addError(nameof(providerInvitation.OID), "Invitation not found");
                return false;
            }

            var result = await AssignProviderToUserAsync(providerInvitation, addError);
            if (result)
            {
                await RemoveExpiredInvitationsOrOldInvitations(providerInvitation);
            }
            return result;
        }

        private async Task RemoveExpiredInvitationsOrOldInvitations(ProviderInvitation providerInvitation)
        {
            var invitationsIds = (await _session.QueryIndex<ProviderInvitationIndex>(ProviderInvitationIndex.GetExprByEmail(providerInvitation.Email)).ListAsync())?.Select(c=>c.DocumentId);
            foreach (var invitationId in invitationsIds)
            {
                _session.Delete<ProviderInvitation>(invitationId);
            }
            await _session.CommitAsync();
        }

        public async Task<List<ProviderInvitationDTO>> CreateProviderInvitationAsync(List<NewProviderInvitationDTO> newProviderInvitationsDTO, ProviderClaimsPrincipal user, IUrlHelper urlHelper, string httpContextScheme, Action<string, string> addError)
        {
            if (user.ProviderOID == 0)
            {
                _logger.LogInformation($"The User {user.Identity.Name} hasn't any provider");
                return null;
            }
            var result = new List<ProviderInvitation>();
            foreach (NewProviderInvitationDTO newProviderInvitationDTO in newProviderInvitationsDTO)
            {
                var newUserInvitation = _mapper.Map<NewProviderInvitationDTO, ProviderInvitation>(newProviderInvitationDTO);
                newUserInvitation.ProviderOID = user.ProviderOID;
                newUserInvitation.CreatorUserName = user.UserName;
                _session.Save(newUserInvitation);
                await _session.CommitAsync();
                string invitationToken = _invitationTokenProvider.GenerateInvitationToken(newUserInvitation.OID, newUserInvitation.Email, (int)UserType.ProviderUser);
                var invitationUrl = urlHelper.Action("ConfirmInvitation", "ConfirmInvitation", new { area = "KeTePongo.UsersWebAPI", token = invitationToken }, httpContextScheme);
                if (await SendInvitationEmailAsync(newUserInvitation, invitationUrl, addError))
                {
                    result.Add(newUserInvitation);
                }
            }
            return _mapper.Map<List<ProviderInvitation>, List<ProviderInvitationDTO>>(result); ;
        }

        public async Task<bool> SendInvitationEmailAsync(ProviderInvitation providerInvitation, string invitationUrl, Action<string, string> addError)
        {
            var emailViewModel = new ProviderUserConfirmInvitationEmailViewModel()
            {
                ProviderInvitation = providerInvitation,
                ConfirmationUrl = invitationUrl
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(emailViewModel, "TemplateUserConfirmInvitationEmail");
            return await _emailTemplateService.SendEmailAsync(providerInvitation.Email, $"{Constants.KeTePonGoAppName} - Accede a tu cuenta", body);
        }
        public async Task<(Abstractions.DTOs.ProviderDTO provider, ProviderUserProfileDTO providerUserProfile)> GetProviderAndUserInfoAsync(string userName)
        {
            var providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>().Where(i => i.UserName == userName).FirstOrDefaultAsync();
            if (providerUserProfile == null)
            {
                return (null, null);
            }
            var resultProviderUserProfile = _mapper.Map<ProviderUserProfile, ProviderUserProfileDTO>(providerUserProfile);
            var Provider = await _session.Query<Provider, ProviderIndex>(p => p.OID == providerUserProfile.ProviderOID).FirstOrDefaultAsync();
            if (Provider == null)
            {
                return (null, resultProviderUserProfile);
            }
            return (_mapper.Map<Provider, Abstractions.DTOs.ProviderDTO>(Provider), resultProviderUserProfile);
        }
        public async Task<IEnumerable<ProviderUserProfileDTO>> GetProviderUsersAsync(long providerOID, Pager pager)
        {
            var result = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>().Where(i => i.ProviderOID == providerOID).Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<ProviderUserProfile>, IEnumerable<ProviderUserProfileDTO>>(result);
        }
        public Task<int> GetCountOfProvidersToMoveUserFromCurrentProviderAsync(long currentProviderOID)
        {
            return _session.Query<Provider, ProviderIndex>(ProviderIndex.GetExprByProviderOID(currentProviderOID)).CountAsync();
        }

        public async Task<IEnumerable<Abstractions.DTOs.ProviderDTO>> GetProvidersToMoveUserFromCurrentProviderAsync(long currentProviderOID, Pager pager)
        {
            var query = _session.Query<Provider, ProviderIndex>().Where(i => i.OID != currentProviderOID);
            var result = await query.Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<Provider>, IEnumerable<Abstractions.DTOs.ProviderDTO>>(result);
        }
        public async Task<ProviderInvitationDTO> GetProviderInvitation(long OID)
        {
            return _mapper.Map<ProviderInvitation, ProviderInvitationDTO>(await GetProviderInvitationInternal(OID));
        }
        private async Task<ProviderInvitation> GetProviderInvitationInternal(long oid)
        {
            return await _session.Query<ProviderInvitation, ProviderInvitationIndex>(ProviderInvitationIndex.GetExprByOID(oid)).FirstOrDefaultAsync();
        }
    }
}
