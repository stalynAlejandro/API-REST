using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.EventHandlers
{
    public class ConsumerUserChangesEventHandlerOnProvider : IConsumerUserChangesEventHandler
    {
        ILogger<ConsumerUserChangesEventHandlerOnProvider> _logger;
        public ConsumerUserChangesEventHandlerOnProvider(IServiceProvider serviceProvider, ILogger<ConsumerUserChangesEventHandlerOnProvider> logger)
        {
            _logger = logger;
        }
        public async Task AddedUsersToAConsumerAsync(AddedUsersToAConsumerContext context, Action<string, string> addError)
        {
            try
            {
                await Task.CompletedTask;
            }
            catch (Exception e)
            {
                var errorMsg = "Error añadiendo usuarios en consumer";
                addError("", errorMsg);
                _logger.LogError(e, errorMsg);
            }
        }
    }
}
