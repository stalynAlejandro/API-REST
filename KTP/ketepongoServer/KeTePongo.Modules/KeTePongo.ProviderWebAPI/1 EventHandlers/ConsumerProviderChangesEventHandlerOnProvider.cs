using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ProviderWebAPI.BackgroundAppServices;

namespace KeTePongo.ProviderWebAPI.EventHandlers
{
    public class ConsumerProviderChangesEventHandlerOnProvider : IConsumerProviderChangesEventHandler
    {
        ILogger<ConsumerProviderChangesEventHandlerOnProvider> _logger;
        private readonly IConsumerProviderLinkingBackgroundAppService _consumerProviderLinkingBackgroundAppService;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer S;
        public ConsumerProviderChangesEventHandlerOnProvider(ILogger<ConsumerProviderChangesEventHandlerOnProvider> logger
            , IStringLocalizer<ConsumerProviderChangesEventHandlerOnProvider> stringLocalizer,
            IConsumerProviderLinkingBackgroundAppService consumerProviderLinkingBackgroundAppService,
            IMapper mapper)
        {
            _logger = logger;
            _consumerProviderLinkingBackgroundAppService = consumerProviderLinkingBackgroundAppService;
            S = stringLocalizer;
            _mapper = mapper;
        }
        public async Task AddedConsumerProviderAsync(AddedConsumerProviderContext context, Action<string, string> addError)
        {
            try
            {
                var consumerOfAProviderDTO = _mapper.Map<ConsumerDTO, ConsumerOfAProviderSalesmanDTO>(context.Consumer);
                await _consumerProviderLinkingBackgroundAppService.AddedConsumerProviderAsync(consumerOfAProviderDTO, context.ProviderSalesmanEmail, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo consumerProvider en provider";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
        public async Task RemovedConsumerProviderAsync(RemovedConsumerProviderContext context, Action<string, string> addError)
        {
            try
            {
                await _consumerProviderLinkingBackgroundAppService.RemoveConsumerProviderLinkAsync(context.ProviderSalesmanEmail, context.ConsumerOID, context.ProviderOID, addError);
            }
            catch (Exception e)
            {
                var errorMsg = "Error eliminando provider en consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}