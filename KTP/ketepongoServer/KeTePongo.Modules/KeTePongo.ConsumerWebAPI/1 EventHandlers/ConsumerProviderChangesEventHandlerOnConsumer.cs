using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;
using AutoMapper;
using KeTePongo.ConsumerWebAPI.BackgroundAppServices;

namespace KeTePongo.ProviderWebAPI.EventHandlers
{
    public class ConsumerProviderChangesEventHandlerOnConsumer : IConsumerProviderChangesEventHandler
    {
        ILogger<ConsumerProviderChangesEventHandlerOnConsumer> _logger;
        private readonly IConsumerProviderBackgroundAppService _consumerProviderBackgroundAppService;
        private readonly IStringLocalizer S;
        public ConsumerProviderChangesEventHandlerOnConsumer(ILogger<ConsumerProviderChangesEventHandlerOnConsumer> logger
            , IConsumerProviderBackgroundAppService consumerProviderBackgroundAppService
            , IStringLocalizer<ConsumerProviderChangesEventHandlerOnConsumer> stringLocalizer)
        {
            _logger = logger;
            _consumerProviderBackgroundAppService = consumerProviderBackgroundAppService;
            S = stringLocalizer;
        }
        public async Task AddedConsumerProviderAsync(AddedConsumerProviderContext context, Action<string, string> addError)
        {
            try
            {
                await Task.CompletedTask;
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
                await _consumerProviderBackgroundAppService.RemoveProviderAsync(context.ConsumerOID, context.ProviderIdForConsumer);
            }
            catch (Exception e)
            {
                var errorMsg = "Error eliminando consumer provider en consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}