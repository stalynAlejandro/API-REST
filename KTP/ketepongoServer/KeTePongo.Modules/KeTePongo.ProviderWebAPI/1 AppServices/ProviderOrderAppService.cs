using AutoMapper;
using KeTePongo.Core.Data;
using KeTePongo.Core.Services;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YesSql;
using OrchardCore.Navigation;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Indexes;
using System.Linq.Expressions;
using KeTePongo.Core.Extensions;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using OrchardCore.Modules;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Microsoft.Extensions.Localization;
using KeTePongo.ProviderWebAPI.Abstractions;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public class ProviderOrderAppService : IProviderOrderAppService
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly ILogger<ProviderOrderAppService> _logger;
        private readonly Lazy<IEnumerable<IProviderOrderChangesEventHandler>> _newProviderOrdersCreatedFromAConsumerOrderEventHandlers;
        public IStringLocalizer T { get; set; }

        public ProviderOrderAppService(
            ISession session,
            IMapper mapper,
            IEmailTemplateService emailTemplateService,
            ILogger<ProviderOrderAppService> logger,
            IServiceProvider serviceProvider,
            IStringLocalizer<ProviderOrderAppService> localizer)
        {
            _newProviderOrdersCreatedFromAConsumerOrderEventHandlers = new Lazy<IEnumerable<IProviderOrderChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IProviderOrderChangesEventHandler>>());
            _session = session;
            _mapper = mapper;
            _emailTemplateService = emailTemplateService;
            _logger = logger;
            T = localizer;
        }
        public async Task<IList<ProviderOrderDTO>> GetOrdersAsync(ProviderClaimsPrincipal user, Expression<Func<ProviderOrderIndex, bool>> filter, Pager pager, Action<string, string> addError)
        {
            Expression<Func<ProviderOrderIndex, bool>> compositeFilter = o => o.ProviderOID == user.ProviderOID
                                                                                && o.SalesmanUserName == user.UserName;
            if (filter != null)
            {
                compositeFilter = compositeFilter.Compose(filter, Expression.And);
            }
            var result = (await _session.Query<ProviderOrder, ProviderOrderIndex>().Where(compositeFilter).OrderByDescending(i => i.UtcDateTime).Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync()).ToList();
            return _mapper.Map<IList<ProviderOrder>, IList<ProviderOrderDTO>>(result);
        }
        public async Task<ProviderOrderDTO> GetAsync(ProviderClaimsPrincipal user, int orderId)
        {
            var result = await _session.Query<ProviderOrder, ProviderOrderIndex>().Where(o => o.Id == orderId && o.ProviderOID == user.ProviderOID).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<ProviderOrder, ProviderOrderDTO>(result);
        }
        public async Task<List<ProviderOrderDTO>> AddOrdersFromAConsumerOrderAsync(NewConsumerOrderCreatedDTO newConsumerOrderCreatedDTO, Action<string, string> addError)
        {
            var newProviderOrderDTOs = _mapper.Map<NewConsumerOrderCreatedDTO, List<NewProviderOrderDTO>>(newConsumerOrderCreatedDTO);
            var addedOrders = new List<ProviderOrder>();
            string lastProcessingError = "";
            Action<string, string> addErrorCapturingLastProcessingError = (key, msg) => { lastProcessingError = $"{key} - {msg}"; addError(key, msg); };
            var hasErrors = false;
            var subOrdersProcessingStatuses = new List<SubOrderProcessingStatus>();
            foreach (var newProviderOrderDTO in newProviderOrderDTOs)
            {
                var order = _mapper.Map<NewProviderOrderDTO, ProviderOrder>(newProviderOrderDTO);
                    
                var processingError = "";
                if (!order.ValidateEntity(addErrorCapturingLastProcessingError))
                {
                    hasErrors = true;
                    subOrdersProcessingStatuses.Add(new SubOrderProcessingStatus(
                                                        subOrderId: order.ConsumerSubOrderId,
                                                        providerOrderOID: 0,
                                                        wasProcessed: false,
                                                        wasEmailSentToProvider: false,
                                                        processingError: lastProcessingError
                                                    ));
                    _logger.LogError($"There was a problem processing newProviderOrderDTO: {lastProcessingError} NewProviderOrderDTO: {JsonConvert.SerializeObject(newProviderOrderDTO)}");
                    continue;
                }
                order.WasEmailSent = await SendEmailAsync(order, addErrorCapturingLastProcessingError);
                _session.Save(order);
                await _session.CommitAsync();

                if (!order.WasEmailSent)
                {
                    processingError = lastProcessingError;
                }
                subOrdersProcessingStatuses.Add(new SubOrderProcessingStatus(
                    subOrderId: order.ConsumerSubOrderId,
                    providerOrderOID: order.OID,
                    wasProcessed: true,
                    wasEmailSentToProvider: order.WasEmailSent,
                    processingError: processingError
                    ));
            }
            var context = new AddedProviderOrdersContext(
                orderOID: newConsumerOrderCreatedDTO.OID,
                hasErrors: hasErrors,
                subOrdersProcessingStatus: subOrdersProcessingStatuses
                );
            await _newProviderOrdersCreatedFromAConsumerOrderEventHandlers.Value.InvokeAsync(x => x.AddedProviderOrdersAsync(context, addError), _logger);
            return _mapper.Map<List<ProviderOrder>, List<ProviderOrderDTO>>(addedOrders);
        }

        private Task<bool> SendEmailAsync(ProviderOrder order, Action<string, string> addErrorCapturingLastProcessingError)
        {
            return TrySendOrderEmailAsync(order.ProviderInfoWhenOrderWasSubmitted.SalesmanEmail, order, addErrorCapturingLastProcessingError);
        }
        private async Task<bool> TrySendOrderEmailAsync(string emailAddress, ProviderOrder order, Action<string, string> addError)
        {
            try
            {
                var body = await _emailTemplateService.GetEmailBodyAsync(order, "TemplateOrderEmailForProvider");
                if (!(await _emailTemplateService.SendEmailAsync(emailAddress, $"Nuevo pedido! Cliente: {order.ConsumerInfoWhenOrderWasSubmitted.TradeName}", body)))
                {
                    addError("", $"Internal error processing order");
                    _logger.LogError($"There was a problem sending Order Summary Proof Email for order {order.OID} to email {emailAddress}");
                    return false;
                }
            }
            catch(Exception e)
            {
                addError("", $"Internal Error Processing Order: {e.GetType().Name} {e.Message}");
                return false;
            }
            return true;
        }
    }
}
