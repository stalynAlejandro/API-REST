using KeTePongo.ConsumerWebAPI.AppServices;
using ProviderEvents = KeTePongo.ProviderWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using KeTePongo.Core.Extensions;
using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;

namespace KeTePongo.ConsumerWebAPI.EventHandlers
{
    public class ProviderOrderChangesEventHandlerOnConsumer : ProviderEvents.IProviderOrderChangesEventHandler
    {
        IConsumerOrderAppService _consumerOrderAppService;
        IServiceProvider _serviceProvider;
        IMapper _mapper;
        ILogger<ProviderOrderChangesEventHandlerOnConsumer> _logger;

        public ProviderOrderChangesEventHandlerOnConsumer(
            IConsumerOrderAppService consumerOrderAppService,
            IServiceProvider serviceProvider,
            IMapper mapper,
            ILogger<ProviderOrderChangesEventHandlerOnConsumer> logger)
        {
            _consumerOrderAppService = consumerOrderAppService;
            _serviceProvider = serviceProvider;
            _mapper = mapper;
            _logger = logger;
        }
        public async Task AddedProviderOrdersAsync(ProviderEvents.AddedProviderOrdersContext addedProviderOrdersEventDTO, Action<string, string> addError)
        {
            try
            {
                if (!_serviceProvider.ValidateDataAnnotations(addedProviderOrdersEventDTO, false, (key, msg) => _logger.LogError($"Validation Error at {nameof(ProviderOrderChangesEventHandlerOnConsumer)}: {key} - {msg} {JsonConvert.SerializeObject(addedProviderOrdersEventDTO)}")))
                {
                    await Task.CompletedTask;
                }
                var newConsumerOrderProcessedByProviderDTO = _mapper.Map<ProviderEvents.AddedProviderOrdersContext, NewConsumerOrderProcessedByProviderDTO>(addedProviderOrdersEventDTO);

                await _consumerOrderAppService.UpdateProcessedOrdersByProviderBackendAsync(newConsumerOrderProcessedByProviderDTO, (key, msg) => _logger.LogError($"{key} - {msg} {JsonConvert.SerializeObject(newConsumerOrderProcessedByProviderDTO)}"));
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo pedido de provider en consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}
