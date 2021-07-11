using AutoMapper;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Services;
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
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Localization;
using KeTePongo.Notifications.Abstractions.Events;
using System.Text.RegularExpressions;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public class ProviderAppService : IProviderAppService
    {
        private readonly IMapper _mapper;
        private readonly IInvitationTokenProvider _invitationTokenProvider;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly ILogger<ProviderAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<IProviderUserChangesEventHandler>> _providerUserChangesEventHandlers;
        private readonly Lazy<IEnumerable<IProviderChangesEventHandler>> _providerChangesEventHandler;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;

        private readonly IBlobStorageImageService _blobStorageImageService;
        private readonly IProviderCatalogProductsAppService _providerCatalogProductsAppService;
        private IStringLocalizer S;
      

        public static string ProviderMediaFolderName(long providerOID) => "provider/" + providerOID.ToString() + "/profile";

        public ProviderAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            IInvitationTokenProvider invitationTokenProvider,
            ILogger<ProviderAppService> logger,
            IEmailTemplateService emailTemplateService,
            IBlobStorageImageService blobStorageImageService,
            IProviderCatalogProductsAppService providerCatalogProductsAppService,
            IStringLocalizer<ProviderAppService> stringLocalizer)
        {
            _providerUserChangesEventHandlers = new Lazy<IEnumerable<IProviderUserChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IProviderUserChangesEventHandler>>());
            _providerChangesEventHandler = new Lazy<IEnumerable<IProviderChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IProviderChangesEventHandler>>());
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _session = session;
            _mapper = mapper;
            _invitationTokenProvider = invitationTokenProvider;
            _logger = logger;
            _emailTemplateService = emailTemplateService;
            _blobStorageImageService = blobStorageImageService;
            _providerCatalogProductsAppService = providerCatalogProductsAppService;
            S = stringLocalizer;
        }
        public async Task<ProviderDTO> GetAsync(ProviderClaimsPrincipal user)
        {
            var result = await _session.Query<Provider, ProviderIndex>(p => p.OID == user.ProviderOID).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<Provider, ProviderDTO>(result);
        }
        public async Task<ProviderDTO> GetAsync(long oid)
        {
            var result = await _session.Query<Provider, ProviderIndex>(p => p.OID == oid).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<Provider, ProviderDTO>(result);
        }

        public async Task<IEnumerable<ProviderDTO>> GetAllAsync(Pager pager)
        {
            IEnumerable<Provider> result;
            result = await _session.Query().For<Provider>().Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<Provider>, IEnumerable<ProviderDTO>>(result);
        }
        public Task<int> GetCountAsync()
        {
            return _session.Query<Provider>().CountAsync();
        }
        public async Task<ProviderDTO> AddAsync(NewProviderDTO newProviderDTO, Action<string, string> addError)
        {
            Provider provider = await AddNewProviderAndCatalogProductsAsync(newProviderDTO);
            var result = _mapper.Map<Provider, ProviderDTO>(provider);
            await _session.CommitAsync();
            await _providerChangesEventHandler.Value.InvokeAsync(x => x.AddedProviderAsync(result, addError), _logger);
            return result;
        }
        public async Task<ProviderDTO> AddFromConsumerAlreadyAddedAsync(ProviderDTO providerDTO, Action<string, string> addError)
        {
            Provider provider = AddNewProviderFromConsumer(providerDTO);
            var result = _mapper.Map<Provider, ProviderDTO>(provider);
            await _session.CommitAsync();
            var providerChangesContext = new ProviderChangesContext(provider.OID, provider.ExtraDataForProviderModule.ConsumerOID);
            await _providerChangesEventHandler.Value.InvokeAsync(x => x.ProviderSavedOIDAsync(providerChangesContext, addError), _logger);

            return result;
        }
        private async Task<Provider> AddNewProviderAndCatalogProductsAsync(NewProviderDTO newProviderDTO)
        {
            var provider = _mapper.Map<NewProviderDTO, Provider>(newProviderDTO);
            provider.ExtraDataForProviderModule.Code = GetNextAlphanumericCode();
            provider.ExtraDataForProviderModule.IsActivated = true;
            _session.Save(provider);
            await _session.CommitAsync();
            try
            {
                provider.ExtraDataForProviderModule.ImageUrl = (await _blobStorageImageService.UploadImageAsync(newProviderDTO.ImageFile, ProviderMediaFolderName(provider.OID))) ?? "";
            }
            catch (Exception)
            {
                _session.Cancel();
                throw;
            }
            _session.Save(provider);
            var providerCatalogProducts = new ProviderCatalogProducts(provider);
            _session.Save(providerCatalogProducts);
            
            return provider;
        }
        private Provider AddNewProviderFromConsumer(ProviderDTO providerDTO)
        {
            var provider = _mapper.Map<ProviderDTO, Provider>(providerDTO);
            provider.ExtraDataForProviderModule.Code = GetNextAlphanumericCode();
            provider.ExtraDataForProviderModule.IsActivated = false;
            _session.Save(provider);
            var providerCatalogProducts = new ProviderCatalogProducts(provider);
            _session.Save(providerCatalogProducts);
            return provider;
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
        public async Task<ProviderDTO> AddAsync(ProviderClaimsPrincipal user, NewProviderDTO newProviderDTO, Action<string, string> addError)
        {
            if (user.ProviderOID != 0)
            {
                addError("", S ["The user already has a provider, a new one cannot be created"]);
                return null;
            }

            var provider = await AddNewProviderAndCatalogProductsAsync(newProviderDTO);
            var providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(i => i.UserName == user.UserName).FirstOrDefaultAsync();
            
            providerUserProfile.ProviderOID = provider.OID;
            providerUserProfile.IsAdmin = true;
            _mapper.Map(provider, providerUserProfile);
            _session.Save(providerUserProfile);
            await _session.CommitAsync();

            var changedUsersOfAProviderContext = new AddedUsersToAProviderContext(
                sourceProviderOID: providerUserProfile.ProviderOID,
                targetProviderOID: providerUserProfile.ProviderOID,
                userNames: new string[] { providerUserProfile.UserName },
                isAdminUser: providerUserProfile.IsAdmin
                );
            try
            {
                await SendWelcomeToProviderCreatorEmailAsync(providerUserProfile, provider, addError);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error sending WelcomeToConsumerCreatorEmail");
            }
            var result = _mapper.Map<Provider, ProviderDTO>(provider);
            await _providerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAProviderAsync(changedUsersOfAProviderContext, addError), _logger);
            await _providerChangesEventHandler.Value.InvokeAsync(x => x.AddedProviderAsync(result, addError), _logger);

            await _providerCatalogProductsAppService.UpdateProviderCatalogProductsAsync(result);
            return result;
        }

        private async Task<bool> SendWelcomeToProviderCreatorEmailAsync(ProviderUserProfile providerUserProfile, Provider provider, Action<string, string> addError)
        {
            var welcomeViewModel = new WelcomeToProviderCreatorEmailViewModel()
            {
                ProviderUserProfile = providerUserProfile,
                Provider = provider
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(welcomeViewModel, "TemplateWelcomeToProviderCreatorEmail");
            return await _emailTemplateService.SendEmailAsync(providerUserProfile.Email, $"{Constants.KeTePonGoAppName} - Bienvenido/a", body);
        }
        public Task<ProviderDTO> UpdateAsync(ProviderClaimsPrincipal user, UpdateProviderDTO updateProviderDTO, Action<string, string> addError)
        {
            return UpdateAsync(user.ProviderOID, updateProviderDTO, addError);
        }
        public Task<ProviderDTO> UpdateAsync(UpdateAnyProviderDTO updateProviderDTO, Action<string, string> addError)
        {
            return UpdateAsync(updateProviderDTO.OID, updateProviderDTO, addError);
        }
        public Task<ProviderDTO> UpdateAsync(long providerOID, UpdateProviderDTO updateProviderDTO, Action<string, string> addError)
        {
            return UpdateAsync(providerOID, updateProviderDTO, addError, true);
        }
        public Task<ProviderDTO> UpdateFromConsumerAlreadyUpdatedAsync(long providerOID, UpdateProviderDTO updateProviderDTO, Action<string, string> addError)
        {
            return UpdateAsync(providerOID, updateProviderDTO, addError, false);
        }

        public async Task<ProviderDTO> UpdateAsync(long providerOID, UpdateProviderDTO updateProviderDTO, Action<string, string> addError, bool haveToRaiseEvents)
        {
            if (providerOID == 0)
            {
                addError("", S["There is no provider assigned to this user"]);
                return null;
            }

            var provider = await _session.Query<Provider, ProviderIndex>(p => p.OID == providerOID).FirstOrDefaultAsync();
            var nextChangeVersion = provider.ChangeVersion + 1;
            _mapper.Map<UpdateProviderDTO, Provider>(updateProviderDTO, provider);
            string previousImage = provider.ExtraDataForProviderModule.ImageUrl;
            if (string.IsNullOrEmpty(updateProviderDTO.ImageUrl) || updateProviderDTO.ImageFile != null)
            {
                provider.ExtraDataForProviderModule.ImageUrl = (await _blobStorageImageService.UploadImageAsync(updateProviderDTO.ImageFile, ProviderMediaFolderName(provider.OID))) ?? "";
            }
            string currentImage = provider.ExtraDataForProviderModule.ImageUrl;
            bool haveToDeletePreviousImage = !string.IsNullOrEmpty(previousImage) && (currentImage != previousImage);
            if (haveToDeletePreviousImage)
            {
                try
                {
                    await _blobStorageImageService.RemoveImageAsync(previousImage);
                }
                catch (Exception e)
                {
                    _logger.LogError(e, "Error removing image from blob storage, imageurl: " + previousImage + "providerOID: " + provider.OID);
                }
            }
            provider.ChangeVersion = nextChangeVersion;
            _session.Save(provider);
            await _session.CommitAsync();
            var result = _mapper.Map<Provider, ProviderDTO>(provider);
            if (haveToRaiseEvents)
            {
                await _providerChangesEventHandler.Value.InvokeAsync(x => x.UpdatedProviderAsync(result.ConsumerOID, result, addError), _logger);
            }
            await _providerCatalogProductsAppService.UpdateProviderCatalogProductsAsync(result);
            return result;
        }
        public Task<bool> RemoveAsync(ProviderClaimsPrincipal user, Action<string, string> addError)
        {
            return RemoveAsync(user.ProviderOID, addError);
        }
        public Task<bool> RemoveAsync(long providerOID, Action<string, string> addError)
        {
            return RemoveAsync(providerOID, addError, true);
        }
        public Task<bool> RemoveFromConsumerAlreadyRemovedAsync(long providerOID, Action<string, string> addError)
        {
            return RemoveAsync(providerOID, addError, false);
        }
        public async Task<bool> RemoveAsync(long providerOID, Action<string, string> addError, bool haveToRaiseEvents)
        {
            if (providerOID == 0)
            {
                addError(nameof(providerOID), S["There is no provider assigned to this user"]);
                return false;
            }
            var provider = await _session.Query<Provider, ProviderIndex>(p => p.OID == providerOID).FirstOrDefaultAsync();
            if (provider == null)
            {
                return false;
            }
            var providerUserProfiles = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(i => i.ProviderOID == providerOID).ListAsync();
            foreach (var providerUserProfile in providerUserProfiles)
            {
                providerUserProfile.IsAdmin = false;
                providerUserProfile.ProviderOID = 0;
                _session.Save(providerUserProfile);
            }
            var consumerOID = provider.ExtraDataForProviderModule.ConsumerOID;
            _session.Delete(provider);
            await _session.CommitAsync();

            var changedUsersOfAConsumerContext = new AddedUsersToAProviderContext(
                sourceProviderOID: providerOID,
                targetProviderOID: 0,
                userNames: providerUserProfiles.Select(i => i.UserName).ToArray(),
                isAdminUser: false
                );
            await _providerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAProviderAsync(changedUsersOfAConsumerContext, addError), _logger);
            if (haveToRaiseEvents)
            {
                await _providerChangesEventHandler.Value.InvokeAsync(x => x.RemovedProviderAsync(consumerOID, providerOID, addError), _logger);
            }

            return true;
        }
        public async Task UpdateConsumerOIDAsync(long providerOID, long consumerOID, Action<string, string> addError)
        {
            var provider = await _session.Query<Provider, ProviderIndex>(i => i.OID == providerOID).FirstOrDefaultAsync();
            provider.ChangeVersion = provider.ChangeVersion + 1;
            provider.ExtraDataForProviderModule.ConsumerOID = consumerOID;
            _session.Save(provider);
            await _session.CommitAsync();
        }
        public async Task<ProviderDTO> ActivateProviderAsync(ProviderClaimsPrincipal user, long consumerOID, Action<string, string> addError)
        {
            var provider = await _session.Query<Provider, ProviderIndex>(p => p.ConsumerOID == consumerOID).FirstOrDefaultAsync();
            if (provider == null)
            {
                return null;
            }
            provider.ExtraDataForProviderModule.IsActivated = true;

            var providerUserProfile = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(ProviderUserProfileIndex.GetExprByUserName(user.UserName)).FirstOrDefaultAsync();
            providerUserProfile.ProviderOID = provider.OID;
            providerUserProfile.IsAdmin = true;
            providerUserProfile.IsActivated = true;
            _session.Save(providerUserProfile);
            _session.Save(provider);
           
            await _session.CommitAsync();
            var result = _mapper.Map<Provider, ProviderDTO>(provider);
          
            var changedUsersOfAProviderContext = new AddedUsersToAProviderContext(
            sourceProviderOID: providerUserProfile.ProviderOID,
            targetProviderOID: providerUserProfile.ProviderOID,
            userNames: new string[] { providerUserProfile.UserName },
            isAdminUser: providerUserProfile.IsAdmin
            );
            try
            {
                await SendWelcomeToProviderCreatorEmailAsync(providerUserProfile, provider, addError);
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error sending WelcomeToConsumerCreatorEmail");
            }
            await _providerUserChangesEventHandlers.Value.InvokeAsync(x => x.AddedUsersToAProviderAsync(changedUsersOfAProviderContext, addError), _logger);
            
            await _providerChangesEventHandler.Value.InvokeAsync(x => x.ActivatedProviderAsync(result, addError), _logger);
            return result;
        }

        public async Task ChangeProviderLinkedToAnERPAsync(long oldProviderOID, long newProviderOID, Action<string, string> addError)
        {
            if (oldProviderOID == newProviderOID)
                return;
            if (oldProviderOID == 0 && newProviderOID == 0)
                return;
            Provider oldLinkedProvider = null; ;
            ProviderCatalogProducts oldLinkedProviderCatalog = null;
            if (oldProviderOID != 0)
            {
                oldLinkedProvider= await _session.Query<Provider, ProviderIndex>(p => p.OID == oldProviderOID).FirstOrDefaultAsync();
                if (oldLinkedProvider != null)
                {
                    oldLinkedProviderCatalog = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(p => p.ProviderOID == oldProviderOID).FirstOrDefaultAsync();
                    if (oldLinkedProviderCatalog != null)
                    {
                        oldLinkedProviderCatalog.Provider.IsLinkedToERP = false;
                        oldLinkedProviderCatalog.Provider.IsProviderCatalogProductsPublic = true;
                    }
                    oldLinkedProvider.IsLinkedToERP = false;
                    oldLinkedProvider.IsProviderCatalogProductsPublic = true;
                }
            }
           
            Provider newLinkedProvider = null; ;
            ProviderCatalogProducts newLinkedProviderCatalog = null;
            if (newProviderOID != 0)
            {
                newLinkedProvider = await _session.Query<Provider, ProviderIndex>(p => p.OID == newProviderOID).FirstOrDefaultAsync();
                if (newLinkedProvider == null)
                {
                    addError("ERP Linked Provider", S["The provided provider OID, {0},  does not exists", newProviderOID]);
                }
                else
                {
                    newLinkedProviderCatalog = await _session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(p => p.ProviderOID == newProviderOID).FirstOrDefaultAsync();
                    if (newLinkedProviderCatalog != null)
                    {
                        newLinkedProviderCatalog.Provider.IsLinkedToERP = true;
                        newLinkedProviderCatalog.Provider.IsProviderCatalogProductsPublic = false;
                    }
                    newLinkedProvider.IsLinkedToERP = true;
                    newLinkedProvider.IsProviderCatalogProductsPublic = false;
                }
            }

            if (oldLinkedProvider != null)
            {
                if (oldLinkedProviderCatalog != null)
                {
                    _session.Save(oldLinkedProviderCatalog);
                }
                _session.Save(oldLinkedProvider);
            }
            if (newLinkedProvider != null)
            {
                if (newLinkedProviderCatalog != null)
                {
                    _session.Save(newLinkedProviderCatalog);
                }
                _session.Save(newLinkedProvider);
            }
            await _session.CommitAsync();
        }

        private bool ValidateDataEmailAndTelephone(string email, string telephone, Action<string, string> addError)
        {
            if (email == null && telephone == null)
            {
                addError("", S["The email and telephone fields cannot be null"]);
                return false;
            }

            if (email != null && !Regex.Match(email, @"^[^@\s]+@[^@\s]+\.[^@\s]+$", RegexOptions.IgnoreCase).Success)
            {
                addError($"{nameof(telephone)}", S["The email field is not a valid e-mail address"]);
                return false;
            }

            if (telephone != null && !Regex.Match(telephone, @"^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$").Success)
            {
                addError($"{nameof(email)}", S["The telephone field is not a valid telephone number"]);
                return false;
            }

            return true;
        }

        public async Task<ProviderLinkRequestDTO> GetProvidersByEmailOrPhoneAsync(string email, string telephone, Action<string, string> addError)
        {
            if(!ValidateDataEmailAndTelephone(email, telephone, addError))
            {
                return null;
            }

            var resultProviders = await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(ProviderUserProfileIndex.GetExprByActivatedAndUserEmailOrPhone(email, telephone)).ListAsync() as List<ProviderUserProfile>;

            if (resultProviders == null || resultProviders.Count == 0)
            {
                addError("", S["Not a single provider was found."]);
                return null;
            }
            if (resultProviders.Count > 1)
            {
                addError("", S["There is more than one provider for the given search criteria."]);
                return null;
            }

            var providerUserProfile = resultProviders.FirstOrDefault();
            var providerIndex = await _session.QueryIndex<ProviderIndex>(ProviderIndex.GetExprByProviderOID(providerUserProfile.ProviderOID)).FirstOrDefaultAsync();
            
            var resultProvider = new ProviderLinkRequestDTO()
            {
                SalesmanEmail = providerUserProfile.Email,
                SalesmanTelephone = providerUserProfile.Telephone,
                IsProviderCatalogProductsPublic = providerIndex.IsProviderCatalogProductsPublic
            };

            return await Task.FromResult(resultProvider);
        }
    }
}
