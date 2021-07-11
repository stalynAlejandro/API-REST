using ConsumerEvents = KeTePongo.ConsumerWebAPI.Abstractions.Events;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using KeTePongo.Core.Extensions;
using AutoMapper;
using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using OrchardCore.Modules;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using Microsoft.Extensions.DependencyInjection;

namespace KeTePongo.ProviderWebAPI.EventHandlers
{
    public class NewConsumerOrderCreatedEventHandlerOnProvider : ConsumerEvents.INewConsumerOrderCreatedEventHandler
    {
        private readonly IServiceProvider _serviceProvider;
        private readonly IMapper _mapper;
        private readonly IProviderOrderAppService _providerOrderAppService;
        private readonly ILogger<NewConsumerOrderCreatedEventHandlerOnProvider> _logger;
        private readonly Lazy<IEnumerable<IProviderOrderChangesEventHandler>> _newProviderOrdersCreatedFromAConsumerOrderEventHandler;
        public NewConsumerOrderCreatedEventHandlerOnProvider(
            IServiceProvider serviceProvider,
            IMapper mapper,
            IProviderOrderAppService orderAppService,
            ILogger<NewConsumerOrderCreatedEventHandlerOnProvider> logger)
        {
            _newProviderOrdersCreatedFromAConsumerOrderEventHandler = new Lazy<IEnumerable<IProviderOrderChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IProviderOrderChangesEventHandler>>());
            _serviceProvider = serviceProvider;
            _mapper = mapper;
            _providerOrderAppService = orderAppService;
            _logger = logger;
        }
        public async Task NewConsumerOrderCreatedAsync(ConsumerEvents.NewConsumerOrderCreatedEventDTO newConsumerOrderCreatedEventDTO, Action<string, string> addError)
        {
            try
            {
                if (!_serviceProvider.ValidateDataAnnotations(
                    newConsumerOrderCreatedEventDTO, false,
                    (key, msg) => _logger.LogError($"Validation Error at {nameof(NewConsumerOrderCreatedEventHandlerOnProvider)}: {key} - {msg} {JsonConvert.SerializeObject(newConsumerOrderCreatedEventDTO)}")))
                {
                    var subOrdersProcessingStatuses = new List<SubOrderProcessingStatus>();
                    newConsumerOrderCreatedEventDTO.SubOrders.ForEach(s =>
                    {
                        subOrdersProcessingStatuses.Add(new SubOrderProcessingStatus(
                            subOrderId: s.SubOrderId,
                            providerOrderOID: 0,
                            wasProcessed: false,
                            wasEmailSentToProvider: false,
                            processingError: "Invalid Consumer Order"
                        ));
                    });
                    var context = new AddedProviderOrdersContext(
                        orderOID: newConsumerOrderCreatedEventDTO.OID,
                        hasErrors: true,
                        subOrdersProcessingStatus: subOrdersProcessingStatuses
                        );
                    await _newProviderOrdersCreatedFromAConsumerOrderEventHandler.Value.InvokeAsync(x => x.AddedProviderOrdersAsync(context, addError), _logger);
                    return;
                }
                var newConsumerOrderCreatedDTO = _mapper.Map<ConsumerEvents.NewConsumerOrderCreatedEventDTO, NewConsumerOrderCreatedDTO>(newConsumerOrderCreatedEventDTO);
                await _providerOrderAppService.AddOrdersFromAConsumerOrderAsync(newConsumerOrderCreatedDTO, (key, msg) => _logger.LogError($"{key} - {msg} {JsonConvert.SerializeObject(newConsumerOrderCreatedEventDTO)}"));
            }
            catch (Exception e)
            {
                var errorMsg = "Error creando nuevo pedido en provider desde consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}
