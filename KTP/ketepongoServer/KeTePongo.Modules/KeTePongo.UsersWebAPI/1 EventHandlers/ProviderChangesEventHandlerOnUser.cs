using AutoMapper;
using ProviderDTOS = KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using ProviderEvents = KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.UsersWebAPI.AppServices;

namespace KeTePongo.UsersWebAPI.EventHandlers
{
    public class ProviderChangesEventHandlerOnUser : ProviderEvents.IProviderChangesEventHandler
    {
        IProviderAppService _providerAppService;
        IMapper _mapper;
        ILogger<ProviderChangesEventHandlerOnUser> _logger;

        public ProviderChangesEventHandlerOnUser(
            IProviderAppService providerAppService,
            IMapper mapper,
            ILogger<ProviderChangesEventHandlerOnUser> logger)
        {
            _providerAppService = providerAppService;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task ProviderSavedOIDAsync(ProviderEvents.ProviderChangesContext context, Action<string, string> addError)
        {
            await Task.CompletedTask;
        }

        public async Task AddedProviderAsync(ProviderDTOS.ProviderDTO providerDTO, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.AddProviderFromAddedProviderAsync(_mapper.Map<ProviderDTOS.ProviderDTO, ProviderDTO>(providerDTO), addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo provider en users";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task UpdatedProviderAsync(long consumerOID, ProviderDTOS.ProviderDTO providerDTO, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.UpdateProviderFromUpdatedProviderAsync(_mapper.Map<ProviderDTOS.ProviderDTO, ProviderDTO>(providerDTO), addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error actualizando provider en users";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task RemovedProviderAsync(long consumerOID, long providerOID, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.RemoveProviderFromRemovedProviderAsync(providerOID, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error eliminando provider en users";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public Task ActivatedProviderAsync(ProviderDTOS.ProviderDTO providerDTO, Action<string, string> addError)
        {
            return AddedProviderAsync(providerDTO, addError);
        }
    }
}