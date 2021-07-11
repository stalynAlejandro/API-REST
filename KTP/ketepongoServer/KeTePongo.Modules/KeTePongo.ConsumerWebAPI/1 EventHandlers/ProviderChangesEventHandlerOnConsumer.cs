using AutoMapper;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using ProviderDTOS = KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using ProviderEvents = KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;

using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public class ProviderChangesEventHandlerOnConsumer : ProviderEvents.IProviderChangesEventHandler
    {
        IConsumerAppService _consumerAppService;
        IMapper _mapper;
        ILogger<ProviderChangesEventHandlerOnConsumer> _logger;

        public ProviderChangesEventHandlerOnConsumer(
            IConsumerAppService consumerAppService,
            IMapper mapper,
            ILogger<ProviderChangesEventHandlerOnConsumer> logger)
        {
            _consumerAppService = consumerAppService;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task ProviderSavedOIDAsync(ProviderEvents.ProviderChangesContext context, Action<string, string> addError)
        {
            try
            {
                await _consumerAppService.UpdateProviderOIDAsync(context.ConsumerOID, context.ProviderOID, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error actualizando OID provider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task AddedProviderAsync(ProviderDTOS.ProviderDTO providerDTO, Action<string, string> addError)
        {
            try
            {
                await _consumerAppService.AddFromProviderAlreadyAddedAsync(_mapper.Map<ProviderDTOS.ProviderDTO, ConsumerDTO>(providerDTO), addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo consumer tras añadir en provider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task UpdatedProviderAsync(long consumerOID, ProviderDTOS.ProviderDTO providerDTO, Action<string, string> addError)
        {
            try
            {
                await _consumerAppService.UpdateFromProviderAlreadyUpdatedAsync(consumerOID, _mapper.Map<ProviderDTOS.ProviderDTO, UpdateConsumerDTO>(providerDTO), addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error actualizando consumer tras cambio en provider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task RemovedProviderAsync(long consumerOID, long providerOID, Action<string, string> addError)
        {
            try
            {
                await _consumerAppService.RemoveAsync(consumerOID, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error eliminando consumer tras eliminar provider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public Task ActivatedProviderAsync(ProviderDTOS.ProviderDTO providerDTO, Action<string, string> addError)
        {
            return Task.CompletedTask;
        }
    }
}