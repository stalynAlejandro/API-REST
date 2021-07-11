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
    public class CatalogProductsInConsumerConsumptionBackgroundAppService : ICatalogProductsInConsumerConsumptionBackgroundAppService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ConsumerProviderLinkingBackgroundAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;
        private readonly IStringLocalizer S;

        public CatalogProductsInConsumerConsumptionBackgroundAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            ILogger<ConsumerProviderLinkingBackgroundAppService> logger,
            IStringLocalizer<ConsumerProviderLinkingBackgroundAppService> stringLocalizer)
        {
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _session = session;
            _mapper = mapper;
            _logger = logger;
            S = stringLocalizer;
        }

        public async Task AddedConsumerProviderAsync(ConsumerOfAProviderSalesmanDTO consumerOfAProviderSalesmanDTO, string salesmanEmail,Action<string, string> addError)
        {
            var providerUserProfileIndex = await _session.QueryIndex<ProviderUserProfileIndex>(ProviderUserProfileIndex.GetExprByUserEmail(salesmanEmail)).FirstOrDefaultAsync();
            if (providerUserProfileIndex != null)
            {
                await _notificationPushedEventHandler.Value.InvokeAsync(x => x.PushNotificationToAProviderUserAsync(providerUserProfileIndex.UserName
                    , new NotificationItemDTO(S["Client pending to approve."], S["The consumer {0} has requested access to your catalog.", consumerOfAProviderSalesmanDTO.TradeName]
                    , NotificationCategory.AccessToCatalogConsumerRequest)
                    , addError), _logger);
            }
            else
            {
                _logger.LogError("Was not possible to notify a provider with salesman email " + salesmanEmail + " that consumer " + consumerOfAProviderSalesmanDTO.TradeName + " requested access to its catalog cause " + salesmanEmail + " is not an email of any provider user");
            }
            var consumersOfAProviderSalesman = await _session.Query<ConsumersOfAProviderSalesman, ConsumersOfAProviderSalesmanIndex>(i => i.ProviderOID == providerUserProfileIndex.ProviderOID).FirstOrDefaultAsync();
            if(consumersOfAProviderSalesman == null)
            {
                consumersOfAProviderSalesman = new ConsumersOfAProviderSalesman();
                consumersOfAProviderSalesman.ProviderOID = providerUserProfileIndex.ProviderOID;
                consumersOfAProviderSalesman.SalesManUserName = providerUserProfileIndex.UserName;
                consumersOfAProviderSalesman.Consumers = new List<ConsumerOfAProviderSalesman>();
            }
            if(consumersOfAProviderSalesman.Consumers.Any(c=>c.ConsumerOID == consumerOfAProviderSalesmanDTO.ConsumerOID))
            {
                addError("duplicated", "consumer already exists");
                return;
            }
            var consumerOfAProviderSalesman = _mapper.Map<ConsumerOfAProviderSalesmanDTO, ConsumerOfAProviderSalesman>(consumerOfAProviderSalesmanDTO);
            consumersOfAProviderSalesman.Consumers.Add(consumerOfAProviderSalesman);
            consumersOfAProviderSalesman.ChangeVersion ++;
            _session.Save(consumersOfAProviderSalesman);
            await _session.CommitAsync();
        }
        public async Task RemovedConsumerProviderAsync(string salesmanEmail, Action<string, string> addError)
        {
            var providerOID = (await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(ProviderUserProfileIndex.GetExprByUserEmail(salesmanEmail)).FirstOrDefaultAsync())?.ProviderOID;
            var consumersOfAProviderSalesmanId = (await _session.QueryIndex<ConsumersOfAProviderSalesmanIndex>(ConsumersOfAProviderSalesmanIndex.GetExprByProviderOID(providerOID.Value)).FirstOrDefaultAsync())?.DocumentId;
            if (consumersOfAProviderSalesmanId == null)
                return;
            _session.Delete<ConsumersOfAProviderSalesman>(consumersOfAProviderSalesmanId.Value);
            await _session.CommitAsync();
        }
        public async Task RemoveConsumerProviderLinkAsync(string salesmanEmail, long consumerOID, long providerOID, Action<string, string> addError)
        {
            var userName = (await _session.QueryIndex<ProviderUserProfileIndex>(ProviderUserProfileIndex.GetExprByUserEmail(salesmanEmail)).FirstOrDefaultAsync())?.UserName;
            var consumersOfAProviderSalesman = await _session.Query<ConsumersOfAProviderSalesman, ConsumersOfAProviderSalesmanIndex>(ConsumersOfAProviderSalesmanIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
            var consumerOfAProviderSalesmanIndex = consumersOfAProviderSalesman.Consumers.FindIndex(0, c => c.ConsumerOID == consumerOID);
            var consumerOfAProviderSalesman = consumersOfAProviderSalesman.Consumers[consumerOfAProviderSalesmanIndex];
            var erpClientsPortfolio = await _session.Query<ERPClientsPortfolio, ERPClientsPortfolioIndex>(ERPClientsPortfolioIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
            if (userName != null)
            {
                await _notificationPushedEventHandler.Value.InvokeAsync(x => x.PushNotificationToAProviderUserAsync(userName
                    , new NotificationItemDTO(S["Client removed"], S["The consumer {0} has been removed as your client", consumerOfAProviderSalesman.TradeName]
                    , NotificationCategory.UnsubscribedFromCatalog)
                    , addError), _logger);
            }
            else
            {
                _logger.LogError("Was not possible to notify a provider with salesman email " + salesmanEmail + " that consumer " + consumerOfAProviderSalesman.TradeName + " has been removed as your client cause " + salesmanEmail + " is not an email of any provider user");
            }
            
            consumersOfAProviderSalesman.Consumers.RemoveAt(consumerOfAProviderSalesmanIndex);
            _session.Save(consumersOfAProviderSalesman);
            
            erpClientsPortfolio.Clients[erpClientsPortfolio.Clients.FindIndex(0,c => c.ConsumerOID == consumerOID)].ConsumerOID = 0;
            _session.Save(erpClientsPortfolio);

            await _session.CommitAsync();

            await SetOrdersAsRemovedForRemovedConsumerProvider(providerOID, consumerOID);
        }
        private async Task SetOrdersAsRemovedForRemovedConsumerProvider(long providerOID, long consumerOID)
        {
            var providerOrdersCount = await _session.Query<ProviderOrder, ProviderOrderIndex>(ProviderOrderIndex.GetExprByProviderOIDConsumerOIDAndIsRemoved(providerOID, consumerOID, false)).CountAsync();
            int pageSize = 20;
            var pagesCount = (providerOrdersCount + pageSize - 1) / pageSize;
            for (var page = 0; page < pagesCount; page++)
            {
                var providerOrdersPaged = await _session.Query<ProviderOrder, ProviderOrderIndex>(ProviderOrderIndex.GetExprByProviderOIDConsumerOIDAndIsRemoved(providerOID, consumerOID, false)).Skip(page * pageSize).Take(pageSize).ListAsync();
                foreach (var providerOrder in providerOrdersPaged)
                {
                    providerOrder.IsRemoved = true;
                    _session.Save(providerOrder);
                }
                await _session.CommitAsync();
            }
        }


        public async Task RemovedAsync(CatalogProductInConsumerConsumptionDTO itemDTO, Action<string, string> addError)
        {
            var catalogProductInConsumerConsumptionId = (await _session.QueryIndex<CatalogProductInConsumerConsumptionIndex>(
                CatalogProductInConsumerConsumptionIndex.GetExprByProviderOIDConsumerOIDConsumptionOIDProductERPId(itemDTO.ProviderOID, itemDTO.ConsumerOID, itemDTO.ConsumptionOID, itemDTO.ProductERPId)).FirstOrDefaultAsync())?.DocumentId;
            if (catalogProductInConsumerConsumptionId != null)
            {
                _session.Delete<CatalogProductInConsumerConsumption>(catalogProductInConsumerConsumptionId.Value);
            }
            await _session.CommitAsync();
        }

        public async Task AddedAsync(CatalogProductInConsumerConsumptionDTO catalogProductInConsumerConsumptionDTO, Action<string, string> addError)
        {
            var catalogProductInConsumerConsumption=  _mapper.Map<CatalogProductInConsumerConsumptionDTO, CatalogProductInConsumerConsumption>(catalogProductInConsumerConsumptionDTO);
            _session.Save(catalogProductInConsumerConsumption);
            await _session.CommitAsync();
        }
    }
}
