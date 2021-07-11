using AutoMapper;
using Dapper;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.ViewModels;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Extensions;
using KeTePongo.Core.Services;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Abstractions.Events;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Modules;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public class ConsumerAppService : IConsumerAppService   
    {
        public static string ConsumerMediaFolderName(long consumerOID) => "consumer/"+consumerOID.ToString()+"/profile";

        private readonly IEmailTemplateService _emailTemplateService;
        private readonly IBlobStorageImageService _blobStorageImageService;
        private readonly IMapper _mapper;
        private readonly ILogger<ConsumerAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<IConsumerUserChangesEventHandler>> _consumerUserChangesEventHandlers;
        private readonly Lazy<IEnumerable<IConsumerChangesEventHandler>> _consumerChangesEventHandler;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;
        private readonly IMemoryCache _memoryCache;

        private readonly IStringLocalizer S;

        public ConsumerAppService(
            IBlobStorageImageService blobStorageImageService,
            ISession session,
            IMapper mapper,
            IInvitationTokenProvider invitationTokenProvider,
            ILogger<ConsumerAppService> logger,
            IEmailTemplateService emailTemplateService,
            IServiceProvider serviceProvider,
            IStringLocalizer<ConsumerAppService> stringLocalizer,
            IMemoryCache memoryCache)
        {
            S = stringLocalizer;
            _emailTemplateService = emailTemplateService;
            _consumerUserChangesEventHandlers = new Lazy<IEnumerable<IConsumerUserChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IConsumerUserChangesEventHandler>>());
            _consumerChangesEventHandler = new Lazy<IEnumerable<IConsumerChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IConsumerChangesEventHandler>>());
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _blobStorageImageService = blobStorageImageService;
            _session = session;
            _mapper = mapper;
            _logger = logger;
            _memoryCache = memoryCache;
        }
        public async Task<ConsumerDTO> GetAsync(ConsumerClaimsPrincipal user)
        {
            var result = await _session.Query<Consumer, ConsumerIndex>(i => i.OID == user.ConsumerOID).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<Consumer, ConsumerDTO>(result);
        }
        public async Task<ConsumerDTO> GetAsync(long OID)
        {
            var result = await _session.Query<Consumer,ConsumerIndex>(i => i.OID == OID).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<Consumer, ConsumerDTO>(result);
        }
        public async Task<IEnumerable<ConsumerDTO>> GetAllAsync(Pager pager)
        {
            var result = await _session.Query<Consumer,ConsumerIndex>().Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<Consumer>, IEnumerable<ConsumerDTO>>(result);
        }
        public Task<int> GetCountAsync()
        {
            return _session.Query<Consumer>().CountAsync();
        }
        public async Task<ConsumerDTO> AddAsync(NewConsumerDTO newConsumerDTO, Action<string, string> addError)
        {
            (Consumer consumer, Consumption newConsumption) = AddNewConsumer(newConsumerDTO);
            var result = _mapper.Map<Consumer, ConsumerDTO>(consumer);
            try
            {
                result.ImageUrl = await _blobStorageImageService.UploadImageAsync(newConsumerDTO.ImageFile, ConsumerMediaFolderName(result.OID));
            }
            catch (Exception)
            {
                _session.Cancel();
                throw;
            }

            await _session.CommitAsync();
            await _consumerChangesEventHandler.Value.InvokeAsync(x => x.AddedConsumerAsync(result, addError), _logger);

            return result;
        }
        public async Task<ConsumerDTO> AddFromProviderAlreadyAddedAsync(ConsumerDTO consumerDTO, Action<string, string> addError)
        {
            (Consumer consumer, Consumption newConsumption) = AddNewConsumerFromProvider(consumerDTO);
            var result = _mapper.Map<Consumer, ConsumerDTO>(consumer);
            await _session.CommitAsync();
            var consumerChangesContext = new ConsumerChangesContext(consumer.OID, consumer.ExtraDataForConsumerModule.ProviderOID);
            await _consumerChangesEventHandler.Value.InvokeAsync(x => x.ConsumerSavedOIDAsync(consumerChangesContext, addError), _logger);

            return result;
        }

        public async Task<ConsumerDTO> AddAsync(ConsumerClaimsPrincipal user, NewConsumerDTO newConsumerDTO, Action<string, string> addError)
        {
            if (user.ConsumerOID != 0)
            {
                addError("", S["The user already has a consumer, it was not posible to create a new one"]);
                return null;
            }
            (Consumer consumer, Consumption newConsumption) = AddNewConsumer(newConsumerDTO);
            try
            {
                consumer.ExtraDataForConsumerModule.ImageUrl = (await _blobStorageImageService.UploadImageAsync(newConsumerDTO.ImageFile, ConsumerMediaFolderName(consumer.OID))) ?? "";
            }
            catch (Exception)
            {
                _session.Cancel();
                throw;
            }
            var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(i => i.UserName == user.UserName).FirstOrDefaultAsync();
            consumerUserProfile.IsAdmin = true;
            consumerUserProfile.ConsumerOID = consumer.OID;
            _session.Save(consumerUserProfile);
            await _session.CommitAsync();

            var changedUsersOfAConsumerContext = new AddedUsersToAConsumerContext(
                sourceConsumerOID: consumerUserProfile.ConsumerOID,
                targetConsumerOID: consumerUserProfile.ConsumerOID,
                userNames: new string[] { consumerUserProfile.UserName },
                isAdminUser: consumerUserProfile.IsAdmin
                );
            var result = _mapper.Map<Consumer, ConsumerDTO>(consumer);
            try
            {
                await SendWelcomeToConsumerCreatorEmailAsync(consumerUserProfile, consumer, addError);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error sending WelcomeToConsumerCreatorEmail");
            }
            await _consumerChangesEventHandler.Value.InvokeAsync(x => x.AddedConsumerAsync(result, addError), _logger);
            await _consumerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAConsumerAsync(changedUsersOfAConsumerContext, addError), _logger);
            result = _mapper.Map<Consumer, ConsumerDTO>(consumer);

            return result;
        }

        private (Consumer consumer, Consumption newConsumption) AddNewConsumer(NewConsumerDTO newConsumerDTO)
        {
            var consumer = _mapper.Map<NewConsumerDTO, Consumer>(newConsumerDTO);
            consumer.ExtraDataForConsumerModule.Code = GetNextAlphanumericCode();
            consumer.ExtraDataForConsumerModule.IsActivated = true;
            _session.Save(consumer);
            var newConsumption = new Consumption(consumer.OID);
            _session.Save(newConsumption);
            return (consumer, newConsumption);
        }
        private (Consumer consumer, Consumption newConsumption) AddNewConsumerFromProvider(ConsumerDTO consumerDTO)
        {
            var consumer = _mapper.Map<ConsumerDTO, Consumer>(consumerDTO);
            consumer.ExtraDataForConsumerModule.Code = GetNextAlphanumericCode();
            consumer.ExtraDataForConsumerModule.IsActivated = false;
            _session.Save(consumer);
            var newConsumption = new Consumption(consumer.OID);
            _session.Save(newConsumption);
            return (consumer, newConsumption);
        }

        private string GetNextAlphanumericCode()
        {
            string code;
            using (var connection = _session.Store.Configuration.ConnectionFactory.CreateConnection())
            {
                connection.Open();
                var dialect = SqlDialectFactory.For(connection);
                if (dialect.Name == "SqlServer")
                {
                    code = connection.ExecuteScalar($"UPDATE TOP (1) {_session.Store.Configuration.TablePrefix}{nameof(RandomStringsPool)} " +
                    $"SET {nameof(RandomStringsPool.IsUsed)} = 1 OUTPUT inserted.{nameof(RandomStringsPool.RandomString)} WHERE isUsed = 0") as string;
                }
                else
                {
                    code = connection.ExecuteScalar($"SELECT {nameof(RandomStringsPool.RandomString)} FROM {_session.Store.Configuration.TablePrefix}{nameof(RandomStringsPool)} WHERE isUsed = 0 LIMIT 1") as string;
                    connection.ExecuteScalar($"UPDATE {_session.Store.Configuration.TablePrefix}{nameof(RandomStringsPool)} SET {nameof(RandomStringsPool.IsUsed)} = 1  WHERE {nameof(RandomStringsPool.RandomString)} = '{code}'");
                }
                connection.Close();
            }

            return code;
        }

        private async Task<bool> SendWelcomeToConsumerCreatorEmailAsync(ConsumerUserProfile consumerUserProfile, Consumer consumer, Action<string, string> addError)
        {
            var welcomeViewModel = new WelcomeToConsumerCreatorEmailViewModel()
            {
                ConsumerUserProfile = consumerUserProfile,
                Consumer = consumer
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(welcomeViewModel, "TemplateWelcomeToConsumerCreatorEmail");
            return await _emailTemplateService.SendEmailAsync(consumerUserProfile.Email, $"{Constants.KeTePonGoAppName} - Bienvenido/a", body);
        }
        public Task<ConsumerDTO> UpdateAsync(ConsumerClaimsPrincipal user, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError)
        {
            return UpdateAsync(user.ConsumerOID, updateConsumerDTO, addError);
        }
        public Task<ConsumerDTO> UpdateAsync(UpdateAnyConsumerDTO updateConsumerDTO, Action<string, string> addError)
        {
            return UpdateAsync(updateConsumerDTO.OID, updateConsumerDTO, addError);
        }
        public Task<ConsumerDTO> UpdateAsync(long consumerOID, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError)
        {
            return UpdateAsync(consumerOID, updateConsumerDTO, addError, true);
        }
        public async Task<ConsumerDTO> UpdateAsync(long consumerOID, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError, bool haveToRaiseEvents)
        {
            if (consumerOID == 0)
            {
                addError("", S["There is no consumer assigned to this user"]);
                return null;
            }
            var consumer = await _session.Query<Consumer,ConsumerIndex>(i => i.OID == consumerOID).FirstOrDefaultAsync();
            var nextChangeVersion = consumer.ChangeVersion + 1;
            _mapper.Map<UpdateConsumerDTO, Consumer>(updateConsumerDTO, consumer);

            string previousImage = consumer.ExtraDataForConsumerModule.ImageUrl;
            if (string.IsNullOrEmpty(updateConsumerDTO.ImageUrl) || updateConsumerDTO.ImageFile != null)
            {
                consumer.ExtraDataForConsumerModule.ImageUrl = (await _blobStorageImageService.UploadImageAsync(updateConsumerDTO.ImageFile, ConsumerMediaFolderName(consumer.OID)))??"";
            }
            string currentImage = consumer.ExtraDataForConsumerModule.ImageUrl;
            bool haveToDeletePreviousImage = !string.IsNullOrEmpty(previousImage) && (currentImage != previousImage);
            if (haveToDeletePreviousImage)
            {
                try
                {
                    await _blobStorageImageService.RemoveImageAsync(previousImage);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error removing image from blob storage, imageurl: " + previousImage+ "consumerOID: "+ consumer.OID);
                }
            }
            consumer.ChangeVersion = nextChangeVersion;
            _session.Save(consumer);
            await _session.CommitAsync();            
            var result = _mapper.Map<Consumer, ConsumerDTO>(consumer);
            if (haveToRaiseEvents)
            {
                await _consumerChangesEventHandler.Value.InvokeAsync(x => x.UpdatedConsumerAsync((int)consumer.ExtraDataForConsumerModule.ProviderOID, result, addError), _logger);
            }
            return result;
        }
        public Task<ConsumerDTO> UpdateFromProviderAlreadyUpdatedAsync(long consumerOID, UpdateConsumerDTO updateConsumerDTO, Action<string, string> addError)
        {
            return UpdateAsync(consumerOID, updateConsumerDTO, addError, false);
        }
        public Task<bool> RemoveAsync(ConsumerClaimsPrincipal user, Action<string, string> addError)
        {
            return RemoveAsync(user.ConsumerOID, addError);
        }
        public Task<bool> RemoveAsync(long consumerOID, Action<string, string> addError)
        {
            return RemoveAsync(consumerOID, addError,true);
        }
        public async Task<bool> RemoveAsync(long consumerOID, Action<string, string> addError, bool haveToRaiseEvents)
        {
            if (consumerOID == 0)
            {
                addError("", S["There is no consumer assigned to this user"]);
                return false;
            }
             var consumer = await _session.Query<Consumer,ConsumerIndex>(ConsumerIndex.GetExprByConsumerOID(consumerOID)).FirstOrDefaultAsync();
            if (consumer == null)
            {
                return false;
            }
            var consumerUserProfiles = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(ConsumerUserProfileIndex.GetExprByConsumerOID(consumerOID)).ListAsync();
            var consumptionId = (await _session.QueryIndex<ConsumptionIndex>(ConsumptionIndex.GetExprByConsumerOID(consumerOID)).FirstOrDefaultAsync())?.DocumentId;            
            foreach (var consumerUserProfile in consumerUserProfiles)
            {
                consumerUserProfile.IsAdmin = false;
                consumerUserProfile.ConsumerOID = 0;
                _session.Save(consumerUserProfile);
            }
            if (consumptionId != null)
            {
                _session.Delete<Consumption>(consumptionId.Value);
            }
            var providerOID = consumer.ExtraDataForConsumerModule.ProviderOID;
            _session.Delete(consumer);
            await _session.CommitAsync();

            if (haveToRaiseEvents)
            {
                await _consumerChangesEventHandler.Value.InvokeAsync(x => x.RemovedConsumerAsync(providerOID, consumerOID, addError), _logger);
            }
            
            var changedUsersOfAConsumerContext = new AddedUsersToAConsumerContext(
                sourceConsumerOID: consumerOID,
                targetConsumerOID: 0,
                userNames: consumerUserProfiles.Select(i => i.UserName).ToArray(),
                isAdminUser: false
                );
            await _consumerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAConsumerAsync(changedUsersOfAConsumerContext, addError), _logger);
            return true;
        }
        public Task<bool> RemoveFromProviderAlreadyRemovedAsync(long consumerOID, Action<string, string> addError)
        {
            return RemoveAsync(consumerOID, addError, false);
        }
        public async Task UpdateProviderOIDAsync(long consumerOID, long providerOID, Action<string, string> addError)
        {
            var consumer = await _session.Query<Consumer, ConsumerIndex>(i => i.OID == consumerOID).FirstOrDefaultAsync();
            consumer.ChangeVersion = consumer.ChangeVersion + 1;
            consumer.ExtraDataForConsumerModule.ProviderOID = providerOID;
            _session.Save(consumer);
            await _session.CommitAsync();
        }

        public async Task<ConsumerDTO> ActivateConsumerAsync(ConsumerClaimsPrincipal user, long providerOID, Action<string, string> addError)
        {
            var consumer = await _session.Query<Consumer, ConsumerIndex>(p => p.ProviderOID == providerOID).FirstOrDefaultAsync();
            if (consumer == null)
            {
                return null;
            }
            consumer.ExtraDataForConsumerModule.IsActivated = true;

            var consumerUserProfile = await _session.Query<ConsumerUserProfile, ConsumerUserProfileIndex>(i => i.UserName == user.UserName).FirstOrDefaultAsync();
            _session.Save(consumer);
            consumerUserProfile.ConsumerOID = consumer.OID;
            consumerUserProfile.IsAdmin = true;
            consumerUserProfile.IsActivated = true;
            _session.Save(consumerUserProfile);
            await _session.CommitAsync();

            var changedUsersOfAProviderContext = new AddedUsersToAConsumerContext(
               sourceConsumerOID: consumerUserProfile.ConsumerOID,
               targetConsumerOID: consumerUserProfile.ConsumerOID,
               userNames: new string[] { consumerUserProfile.UserName },
               isAdminUser: consumerUserProfile.IsAdmin
               );
            try
            {
                await SendWelcomeToConsumerCreatorEmailAsync(consumerUserProfile, consumer, addError);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error sending WelcomeToConsumerCreatorEmail");
            }
            await _consumerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAConsumerAsync(changedUsersOfAProviderContext, addError), _logger);

            return _mapper.Map<Consumer, ConsumerDTO>(consumer);
        }
    }
}
