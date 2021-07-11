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

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public class ERPClientsPortfolioAppService : IERPClientsPortfolioAppService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ERPClientsPortfolioAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;
        private readonly Lazy<IEnumerable<IERPClientsPortfolioProviderChangesEventHandler>> _erpClientsPortfolioProviderChangesEventHandler;
        private readonly IStringLocalizer S;

        public ERPClientsPortfolioAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            ILogger<ERPClientsPortfolioAppService> logger,
            IStringLocalizer<ERPClientsPortfolioAppService> stringLocalizer)
        {
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _erpClientsPortfolioProviderChangesEventHandler = new Lazy<IEnumerable<IERPClientsPortfolioProviderChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IERPClientsPortfolioProviderChangesEventHandler>>());
            _session = session;
            _mapper = mapper;
            _logger = logger;
            S = stringLocalizer;
        }

        public async Task UpdateERPClientsAsync(ProviderClaimsPrincipal user, IList<ERPClientDTO> erpClientDTOList, Action<string, string> addError)
        {
            var providerOID = user.ProviderOID;
            if (providerOID == 0)
            {
                addError("", S["There is no provider assigned to this user"]);
                return;
            }

            var erpClientsPortfolio = await _session.Query<ERPClientsPortfolio, ERPClientsPortfolioIndex>(ERPClientsPortfolioIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
            Dictionary<string, long> erpIdToOIDDictionaryOfPendingToUpdateCustomers;
            if (erpClientsPortfolio == null)
            {
                erpIdToOIDDictionaryOfPendingToUpdateCustomers = new Dictionary<string, long>();
                erpClientsPortfolio = new ERPClientsPortfolio();
                erpClientsPortfolio.ProviderOID = providerOID;
            }
            else
            {
                erpIdToOIDDictionaryOfPendingToUpdateCustomers = erpClientsPortfolio.Clients.ToDictionary(c => c.ERPId, c => c.ConsumerOID);
            }
            erpClientsPortfolio.Clients = _mapper.Map<IList<ERPClientDTO>, List<ERPClient>>(erpClientDTOList,
                    opts =>
                    {
                        opts.Items[ProviderConstants.ERPIdToConsumerOIDDictionary] = erpIdToOIDDictionaryOfPendingToUpdateCustomers;
                    }
                );

            foreach (var deleteERPId in erpIdToOIDDictionaryOfPendingToUpdateCustomers.Keys)
            {
                var context = new ERPClientsPortfolioProviderChangesContext(erpIdToOIDDictionaryOfPendingToUpdateCustomers[deleteERPId], deleteERPId, providerOID);
                await _erpClientsPortfolioProviderChangesEventHandler.Value.InvokeAsync(x => x.RemovedERPClientAsync(context, addError), _logger);
            }
            var nextChangeVersion = erpClientsPortfolio.ChangeVersion + 1;
            erpClientsPortfolio.ChangeVersion = nextChangeVersion;
            _session.Save(erpClientsPortfolio);
            await _session.CommitAsync();
        }
    }
}