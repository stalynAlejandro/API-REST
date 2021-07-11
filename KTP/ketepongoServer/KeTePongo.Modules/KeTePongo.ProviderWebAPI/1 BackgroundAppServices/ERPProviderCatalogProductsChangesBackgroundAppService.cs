using AutoMapper;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using OrchardCore.Modules;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Indexes;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Abstractions.Events;
using Microsoft.Extensions.Localization;
using KeTePongo.Core.Extensions;

namespace KeTePongo.ProviderWebAPI.BackgroundAppServices
{
    public class ERPProviderCatalogProductsChangesBackgroundAppService : IERPProviderCatalogProductsChangesBackgroundAppService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ERPProviderCatalogProductsChangesBackgroundAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;
        private readonly IStringLocalizer S;

        public ERPProviderCatalogProductsChangesBackgroundAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            ILogger<ERPProviderCatalogProductsChangesBackgroundAppService> logger,
            IStringLocalizer<ERPProviderCatalogProductsChangesBackgroundAppService> stringLocalizer)
        {
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _session = session;
            _mapper = mapper;
            _logger = logger;
            S = stringLocalizer;
        }

        public async Task UpdateMostConsumedProductAsync(ERPProviderCatalogProductsChangesContext context, Action<string, string> addError)
        {
            if (!context.ERPProviderCatalogProductsChangesDTO.RemovedCatalogProducts.Any())
                return;
            var erpMostConsumedCatalogProducts = await _session.Query<ERPMostConsumedCatalogProducts, ERPMostConsumedCatalogProductsIndex>(ERPMostConsumedCatalogProductsIndex.GetExprByProviderOID(context.ProviderOID)).FirstOrDefaultAsync();
            if (erpMostConsumedCatalogProducts == null)
                return;
            erpMostConsumedCatalogProducts.MostConsumedCatalogProducts = erpMostConsumedCatalogProducts.MostConsumedCatalogProducts.Where(mcp=> !context.ERPProviderCatalogProductsChangesDTO.RemovedCatalogProducts.Any(p=>p.ERPId == mcp.ERPIdProduct)).ToList();
            _session.Save(erpMostConsumedCatalogProducts);
            await _session.CommitAsync();
        }
    }
}
