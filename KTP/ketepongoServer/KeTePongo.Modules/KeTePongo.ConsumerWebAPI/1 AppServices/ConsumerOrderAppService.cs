using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Extensions;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.ViewModels;
using KeTePongo.Core.Data;
using KeTePongo.Core.Services;
using Microsoft.Extensions.Logging;
using OrchardCore.Modules;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YesSql;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public class ConsumerOrderAppService : IConsumerOrderAppService
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly ILogger<ConsumerOrderAppService> _logger;
        private readonly Lazy<IEnumerable<INewConsumerOrderCreatedEventHandler>> _newConsumerOrderCreatedEventHandlers;
        private readonly IStringLocalizer<ConsumerOrderAppService> S;
        private readonly IStringLocalizer<ProductDomainService> _productDomainServiceLocalizer;
        private readonly IStringLocalizer<ConsumerOrder> _consumerOrderLocalizer;
        private readonly IStringLocalizer<ProviderDomainService> _providerDomainServiceLocalizer;

        public ConsumerOrderAppService(
            ISession session,
            LocalSessionFactory sessionFactory,
            IMapper mapper,
            IEmailTemplateService emailTemplateService,
            IServiceProvider serviceProvider,
            ILogger<ConsumerOrderAppService> logger,
            IStringLocalizer<ConsumerOrderAppService> localizer,
            IStringLocalizer<ProductDomainService> productDomainServiceLocalizer,
            IStringLocalizer<ConsumerOrder> consumerOrderLocalizer,
            IStringLocalizer<ProviderDomainService> providerDomainServiceLocalizer)
        {
            _session = session;
            _mapper = mapper;
            _emailTemplateService = emailTemplateService;
            _logger = logger;
            _newConsumerOrderCreatedEventHandlers = new Lazy<IEnumerable<INewConsumerOrderCreatedEventHandler>>(() => serviceProvider.GetService<IEnumerable<INewConsumerOrderCreatedEventHandler>>());
            S = localizer;
            _productDomainServiceLocalizer = productDomainServiceLocalizer;
            _consumerOrderLocalizer = consumerOrderLocalizer;
            _providerDomainServiceLocalizer = providerDomainServiceLocalizer;
        }
        public async Task<IList<ConsumerOrderDTO>> GetOrdersAsync(ConsumerClaimsPrincipal user, Pager pager, Action<string, string> addError)
        {
            IList<ConsumerOrder> result;
            result = (await _session.Query<ConsumerOrder, ConsumerOrderIndex>()
                .Where(o => o.ConsumerOID == user.ConsumerOID)
                .OrderByDescending(i=>i.UtcDateTime)
                .Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync()
                ).ToList();
            return _mapper.Map<IList<ConsumerOrder>, IList<ConsumerOrderDTO>>(result);
        }
        public async Task<ConsumerOrderDTO> GetAsync(ConsumerClaimsPrincipal user, long orderOID)
        {
            var result = await _session.Query<ConsumerOrder,ConsumerOrderIndex>(o => o.OID == orderOID).FirstOrDefaultAsync();
            if ((result == null || result.ConsumerOID != user.ConsumerOID))
            {
                return null;
            }
            return _mapper.Map<ConsumerOrder, ConsumerOrderDTO>(result);
        }

        public async  Task<ConsumerOrderDTO> AddAsync(ConsumerClaimsPrincipal user, NewConsumerOrderDTO newOrderDTO, Action<string, string> addError)
        {
            var consumption = await _session.Query<Consumption, ConsumptionIndex>(i=> i.ConsumerOID == user.ConsumerOID).FirstOrDefaultAsync();
            var consumerDTO = _mapper.Map<Consumer,ConsumerDTO>(await _session.Query<Consumer, ConsumerIndex>(i => i.OID == user.ConsumerOID).FirstOrDefaultAsync());
            ConsumerOrderDTO orderDTO = _mapper.Map<NewConsumerOrderDTO, ConsumerOrderDTO>(newOrderDTO);
            orderDTO.UserName = user.UserName;
            orderDTO.ConsumerOID = user.ConsumerOID;
            orderDTO.UtcDateTime = DateTime.UtcNow;
            
            //To-Do: Move all the code to the mapper
            var order = _mapper.Map<ConsumerOrderDTO, ConsumerOrder>(orderDTO);
            order.ChangeVersion = 0;
            if (!order.SetSubOrders(subOrderDTOs: newOrderDTO.SubOrders,
                                    orderProvidersGetRange: (orderProviderIds) => (List<Provider>)(new ProviderDomainService(_providerDomainServiceLocalizer)).GetRange(consumption, orderProviderIds, addError),
                                    orderProductsGetRange: (orderProductIds) => (List<Product>)(new ProductDomainService(_productDomainServiceLocalizer)).GetRange(consumption, orderProductIds, addError),
                                    S,
                                    addError: addError))
            {
                return null;
            }   
            if (!order.ValidateEntity(_consumerOrderLocalizer, addError))
            {
                return null;
            }
            _session.Save(order);
            await _session.CommitAsync();
            var result = _mapper.Map<ConsumerOrder, ConsumerOrderDTO>(order);

            var newConsumerOrderCreatedEventDTO = new NewConsumerOrderCreatedEventDTO(
                oid: order.OID,
                userName: order.UserName,
                consumer: consumerDTO,
                utcDateTime: order.UtcDateTime,
                hasErrors: order.HasErrors,
                subOrders: _mapper.Map<List<SubOrder>, List<SubOrderDTO>>(order.SubOrders)
                );
            ////TO-DO EFO-151: replace await per _ for make a non awaitable async call
            await _newConsumerOrderCreatedEventHandlers.Value.InvokeAsync(x => x.NewConsumerOrderCreatedAsync(newConsumerOrderCreatedEventDTO, addError), _logger);

            return result;
        }
        public async Task UpdateProcessedOrdersByProviderBackendAsync(NewConsumerOrderProcessedByProviderDTO newConsumerOrderProcessedByProviderDTO, Action<string, string> addError)
        {
            var consumerOrder = await _session.Query<ConsumerOrder, ConsumerOrderIndex>(i => i.OID == newConsumerOrderProcessedByProviderDTO.OrderOID).FirstOrDefaultAsync();
            foreach (var subOrder in consumerOrder.SubOrders)
            {
                var dtoSubOrderStatus = newConsumerOrderProcessedByProviderDTO.SubOrdersProcessingStatus.First(s=>s.SubOrderId == subOrder.SubOrderId);
                subOrder.WasProcessed = dtoSubOrderStatus.WasProcessed ?? false;
                subOrder.WasEmailSentToProvider = dtoSubOrderStatus.WasEmailSentToProvider ?? false;
                var error = !subOrder.WasProcessed.Value || !subOrder.WasEmailSentToProvider.Value;
                consumerOrder.HasErrors = consumerOrder.HasErrors || error;
                if (error)
                {
                    subOrder.ProcessingError = dtoSubOrderStatus.ProcessingError;
                    // To-Do: Create notifications module that will notify problems to client with toast msgs or signalR
                    // https://pccom.atlassian.net/browse/EFO-129
                    //await _consumerNotificaticationEventHandler.InvokeAsync(x => x.NewConsumerNotification(consumerOrderDTO), _logger);
                }
            }
            var userProfile = await _session.QueryIndex<ConsumerUserProfileIndex>(i=> i.UserName == consumerOrder.UserName).FirstOrDefaultAsync();
            var consumer = await _session.Query<Consumer, ConsumerIndex>(i => i.OID == consumerOrder.ConsumerOID).FirstOrDefaultAsync();
            consumerOrder.WasEmailSent = await TrySendOrderEmailAsync(consumerOrder, userProfile.Email, consumer, addError);
                
            _session.Save(consumerOrder);
        }

        private async Task<bool> TrySendOrderEmailAsync(ConsumerOrder consumerOrder, string destinationEmail, Consumer consumer, Action<string, string> addError)
        {
            var emailViewModel = new OrderSummaryProofEmailForConsumerViewModel()
            {
                Order = consumerOrder,
                Consumer = consumer
            };
            try
            {
                var body = await _emailTemplateService.GetEmailBodyAsync(emailViewModel, "TemplateOrderSummaryProofEmail"); 
                await _emailTemplateService.SendEmailAsync(destinationEmail, S[LocalizableStrings.MailSubjectForConsumerOrder + " #" + consumerOrder.OID], body);
            }
            catch (Exception e)
            {
                addError("", S["Internal error processing order"]);
                _logger.LogError($"Internal Error Processing Order {e.GetType().Name} {e.Message}");
                return false;
            }
            return true;
        }
    }
}
