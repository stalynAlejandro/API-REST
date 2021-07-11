using AutoMapper;
using ConsumerDTOS = KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using ConsumerEvents = KeTePongo.ConsumerWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;

namespace KeTePongo.ProviderWebAPI.EventHandlers
{
    public class ConsumerChangesEventHandlerOnProvider : ConsumerEvents.IConsumerChangesEventHandler
    {
        IProviderAppService _providerAppService;
        IServiceProvider _serviceProvider;
        IMapper _mapper;
        ILogger<ConsumerChangesEventHandlerOnProvider> _logger;

        public ConsumerChangesEventHandlerOnProvider(
            IProviderAppService providerAppService,
            IServiceProvider serviceProvider,
            IMapper mapper,
            ILogger<ConsumerChangesEventHandlerOnProvider> logger)
        {
            _providerAppService = providerAppService;
            _serviceProvider = serviceProvider;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task AddedConsumerAsync(ConsumerDTOS.ConsumerDTO consumerDTO, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.AddFromConsumerAlreadyAddedAsync(_mapper.Map<ConsumerDTOS.ConsumerDTO, ProviderDTO>(consumerDTO), addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo provider tras añadir consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
        public async Task UpdatedConsumerAsync(long providerOID, ConsumerDTOS.ConsumerDTO consumerDTO, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.UpdateFromConsumerAlreadyUpdatedAsync(providerOID, _mapper.Map<ConsumerDTOS.ConsumerDTO, UpdateProviderDTO>(consumerDTO), addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error actualizando provider tras actualizar consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
        public async Task RemovedConsumerAsync(long providerOID, long consumerOID, Action<string, string> addError)
        {
            try
            {
                await _providerAppService.RemoveFromConsumerAlreadyRemovedAsync(providerOID, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error eliminando provider tras eliminar consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }

        public async Task ConsumerSavedOIDAsync(ConsumerChangesContext context, Action<string, string> addError)
        {
            try
            {
                await  _providerAppService.UpdateConsumerOIDAsync(context.ProviderOID, context.ConsumerOID, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error actualizando OID consumer en provider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}
