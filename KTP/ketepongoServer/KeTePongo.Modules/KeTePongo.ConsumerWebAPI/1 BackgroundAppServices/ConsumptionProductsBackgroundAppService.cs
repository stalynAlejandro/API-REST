using AutoMapper;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.YesSqlCollections;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Abstractions.Events;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YesSql;
using YesSql.Commands;
using Microsoft.Extensions.DependencyInjection;

namespace KeTePongo.ConsumerWebAPI.BackgroundAppServices
{
    public class ConsumptionProductsBackgroundAppService : IConsumptionProductsBackgroundAppService
    {
        private readonly ILogger<ProviderBackgroundAppService> _logger;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;

        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly IStringLocalizer S;
        public ConsumptionProductsBackgroundAppService(ISession session,
            IServiceProvider serviceProvider,
            ILogger<ProviderBackgroundAppService> logger,
            IMapper mapper,
            IStringLocalizer<ConsumptionProductsBackgroundAppService> stringLocalizer)
        {
            _logger = logger;
            _session = session;
            _mapper = mapper;
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            S = stringLocalizer;
        }

        public async Task UpdateProviderCatalogProductsAsync(long keTePongoProviderOID,long consumptionOID, ERPProviderCatalogProductsChangesDTO erpProviderCatalogProductsChangesDTO, Action<string, string> addError)
        {
            var consumption = await _session.Query<Consumption, ConsumptionIndex>(ConsumptionIndex.GetExprByOID(consumptionOID)).FirstOrDefaultAsync();
            var consumer = await _session.QueryIndex<ConsumerUserProfileIndex>(ConsumerUserProfileIndex.GetExprByConsumerOID(consumption.ConsumerOID)).FirstOrDefaultAsync();
            
            foreach (var item in erpProviderCatalogProductsChangesDTO.UpdatedCatalogProducts)
            {
                var product = consumption.Products.FirstOrDefault(p => p.ERPId == item.ERPId);
                _mapper.Map<ERPCatalogProductUpdatedDTO, Product>(item,product);
            }
            foreach (var item in erpProviderCatalogProductsChangesDTO.RemovedCatalogProducts)
            {
                var product = consumption.Products.FirstOrDefault(p => p.ERPId == item.ERPId);
                product.ERPId = "";
                product.KeTePongoProviderOID = null;

                await _notificationPushedEventHandler.Value.InvokeAsync(x => x.PushNotificationToAConsumerUserAsync(consumer.UserName
                    , new NotificationItemDTO(S["The product '{0}' has been deleted.", product.Name], S["The provider has deleted this product, you can find it on Without Provider list."]
                    , NotificationCategory.RemovedProduct)
                    , addError), _logger);
            }
            _session.Save(consumption);
            await _session.CommitAsync();
        }
    }
}
