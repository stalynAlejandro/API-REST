using AutoMapper;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.BackgroundAppServices;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public class ERPProviderCatalogProductsChangesEventHandlerOnProvider : IERPProviderCatalogProductsChangesEventHandler
    {
        IERPProviderCatalogProductsChangesBackgroundAppService _erpProviderCatalogProductsChangesBackgroundAppService;
        IMapper _mapper;
        ILogger<ERPProviderCatalogProductsChangesEventHandlerOnProvider> _logger;

        public ERPProviderCatalogProductsChangesEventHandlerOnProvider(
            IERPProviderCatalogProductsChangesBackgroundAppService erpProviderCatalogProductsChangesBackgroundAppService,
            IMapper mapper,
            ILogger<ERPProviderCatalogProductsChangesEventHandlerOnProvider> logger)
        {
            _erpProviderCatalogProductsChangesBackgroundAppService = erpProviderCatalogProductsChangesBackgroundAppService;
            _mapper = mapper;
            _logger = logger;
        }

        public Task UpdatedERPProviderCatalogProductsAsync(ERPProviderCatalogProductsChangesContext context, Action<string, string> addError)
        {
            return _erpProviderCatalogProductsChangesBackgroundAppService.UpdateMostConsumedProductAsync(context, addError);
        }
    }
}