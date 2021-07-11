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
    public class ConsumersOfAProviderSalesmanAppService : IConsumersOfAProviderSalesmanAppService
    {
        private readonly IMapper _mapper;
        private readonly ILogger<ConsumersOfAProviderSalesmanAppService> _logger;
        private readonly ISession _session;
        private readonly Lazy<IEnumerable<INotificationPushedEventHandler>> _notificationPushedEventHandler;
        private readonly Lazy<IEnumerable<IConsumerValidationByProviderEventHandler>> _consumerValidationByProviderEventHandler;
        private readonly IStringLocalizer S;

        public ConsumersOfAProviderSalesmanAppService(
            IServiceProvider serviceProvider,
            ISession session,
            IMapper mapper,
            ILogger<ConsumersOfAProviderSalesmanAppService> logger,
            IStringLocalizer<ConsumersOfAProviderSalesmanAppService> stringLocalizer)
        {
            _notificationPushedEventHandler = new Lazy<IEnumerable<INotificationPushedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INotificationPushedEventHandler>>());
            _consumerValidationByProviderEventHandler = new Lazy<IEnumerable<IConsumerValidationByProviderEventHandler>>(() => serviceProvider.GetService<IEnumerable<IConsumerValidationByProviderEventHandler>>());
            _session = session;
            _mapper = mapper;
            _logger = logger;
            S = stringLocalizer;
        }
        public async Task<List<ConsumerOfAProviderSalesmanDTO>> GetConsumersOfAProviderSalesmanAsync(ProviderClaimsPrincipal user, int? changeVersion, Action<string, string> addError)
        {
            var providerOID = user.ProviderOID;
            var userName = user.UserName;
            ConsumersOfAProviderSalesman result;
            if (changeVersion.HasValue)
            {
                result = await _session.Query<ConsumersOfAProviderSalesman, ConsumersOfAProviderSalesmanIndex>(ConsumersOfAProviderSalesmanIndex.GetExprByProviderOIDAndSalesmanUserNameAndChangeVersion(providerOID, userName, changeVersion.Value)).FirstOrDefaultAsync();
            }
            else
            {
                result = await _session.Query<ConsumersOfAProviderSalesman, ConsumersOfAProviderSalesmanIndex>(ConsumersOfAProviderSalesmanIndex.GetExprByProviderOIDAndSalesmanUserName(providerOID, userName)).FirstOrDefaultAsync();
            }

            if (result == null)
            {
                return null;
            }
            
            return _mapper.Map<List<ConsumerOfAProviderSalesman>, List<ConsumerOfAProviderSalesmanDTO>>(result.Consumers);
        }

        public async Task<bool> ValidateConsumerOfAProviderSalesmanAsync(ProviderClaimsPrincipal user, ConsumerOfAProviderSalesmanValidationDTO consumerOfAProviderSalesmanValidationDTO, Action<string, string> addError)
        {
            var providerOID = user.ProviderOID;
            var userName = user.UserName;
            var erpClientPortfolio = await _session.Query<ERPClientsPortfolio, ERPClientsPortfolioIndex>(ERPClientsPortfolioIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
            var erpClient = erpClientPortfolio?.Clients.FirstOrDefault(c => c.ERPId == consumerOfAProviderSalesmanValidationDTO.ERPId);
            if(erpClient == null)
            {
                addError("", S["No ERP Client matches the request, make sure you've send the proper ERP Id"]);
                return false;
            }
            var erpClientForThatOIDConsumer = erpClientPortfolio?.Clients.FirstOrDefault(c => c.ConsumerOID == consumerOfAProviderSalesmanValidationDTO.ConsumerOID);
            if (erpClientForThatOIDConsumer != null)
            {
                addError("", S["ERP Client already points to a Consumer"]);
                return false;
            }
            var consumersOfAProviderSalesman = await _session.Query<ConsumersOfAProviderSalesman, ConsumersOfAProviderSalesmanIndex>(ConsumersOfAProviderSalesmanIndex.GetExprByProviderOIDAndSalesmanUserName(providerOID, userName)).FirstOrDefaultAsync();
            var providerProfile = (await _session.Query<ProviderUserProfile, ProviderUserProfileIndex>(ProviderUserProfileIndex.GetExprByUserName(userName)).FirstOrDefaultAsync());
            var providerEmail = providerProfile?.Email;
            var consumerToUpdate = consumersOfAProviderSalesman.Consumers.FirstOrDefault(c => c.ConsumerOID == consumerOfAProviderSalesmanValidationDTO.ConsumerOID);
            if(!string.IsNullOrEmpty(consumerToUpdate.ERPId))
            {
                addError("", S["Consumer of a provider already points to a ERP Client"]);
                return false;
            }
            erpClient.ConsumerOID = consumerOfAProviderSalesmanValidationDTO.ConsumerOID;
            _session.Save(erpClientPortfolio);

            consumerToUpdate.ERPId = consumerOfAProviderSalesmanValidationDTO.ERPId;
            _session.Save(consumersOfAProviderSalesman);
            await _session.CommitAsync();

            var context = new ConsumerValidatedContext(
                consumerOID: consumerOfAProviderSalesmanValidationDTO.ConsumerOID,
                providerOID: providerOID,
                erpId: consumerOfAProviderSalesmanValidationDTO.ERPId,
                salesmanEmail: providerEmail);
            await _consumerValidationByProviderEventHandler.Value.InvokeAsync(x => x.ConsumerValidatedAsync(context, addError), _logger);
            if(providerProfile != null)
            {
                await _notificationPushedEventHandler.Value.InvokeAsync(x => x.PushNotificationToAllConsumerUsersAsync(context.ConsumerOID, new NotificationItemDTO(S["{0} has accepted you.", providerProfile.Name],
                    S["The provider has accepted your request, you can now easily make orders with Ketepongo."],
                    NotificationCategory.AccessToCatalogConsumerAccepted), addError), _logger);
            }
            return true;
        }
    }
}
