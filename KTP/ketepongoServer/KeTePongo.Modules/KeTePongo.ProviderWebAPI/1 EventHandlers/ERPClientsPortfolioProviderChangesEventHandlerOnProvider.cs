using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.BackgroundAppServices;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public class ERPClientsPortfolioProviderChangesEventHandlerOnProvider : IERPClientsPortfolioProviderChangesEventHandler
    {
        IERPClientsPortfolioBackgroundAppService _erpClientsPortfolioBackgroundAppService;
        IMapper _mapper;
        ILogger<ERPClientsPortfolioProviderChangesEventHandlerOnProvider> _logger;

        public ERPClientsPortfolioProviderChangesEventHandlerOnProvider(
            IERPClientsPortfolioBackgroundAppService erpClientsPortfolioBackgroundAppService,
            IMapper mapper,
            ILogger<ERPClientsPortfolioProviderChangesEventHandlerOnProvider> logger)
        {
            _erpClientsPortfolioBackgroundAppService = erpClientsPortfolioBackgroundAppService;
            _mapper = mapper;
            _logger = logger;
        }

        public async Task RemovedERPClientAsync(ERPClientsPortfolioProviderChangesContext context, Action<string, string> addError)
        {
            await _erpClientsPortfolioBackgroundAppService.UpdateMostConsumedProductsAsync(context,  addError);
        }
    }
}