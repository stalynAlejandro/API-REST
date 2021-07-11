using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.Data;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Modules;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument
{
    public class ProviderAppService : ConsumptionBaseAppService<Models.ConsumptionDocument.Provider, UpdateProviderDTO, NewProviderDTO, ProviderDTO, ProviderDTO, ProviderDomainService>, IProviderAppService
    {
        private readonly IMapper _mapper;
        private readonly IEnumerable<IConsumerProviderChangesEventHandler> _consumerProviderLinkedEventHandlers;
        private readonly ILogger<ProviderAppService> _logger;
        private readonly IConsumerAppService _consumerAppService;
        private readonly ISession _session;
        
        public ProviderAppService(ISession session, 
            IEnumerable<IConsumerProviderChangesEventHandler> consumerProviderEventHandlers, 
            LocalSessionFactory sessionFactory, 
            IMapper mapper, 
            ILogger<ProviderAppService> logger, 
            YesSqlActionExecutor yesSqlActionExecutor, 
            IConsumerAppService consumerAppService, 
            IStringLocalizer<ProviderDomainService> S)
            : base(session, new ProviderDomainService(S), sessionFactory, mapper, logger, yesSqlActionExecutor)
        {
            _consumerProviderLinkedEventHandlers = consumerProviderEventHandlers;
            _mapper = mapper;
            _logger = logger;
            _consumerAppService = consumerAppService;
            _session = session;
            
            
        }

        protected override Task<IList<ProviderDTO>> PreProcessAddAsync(IConsumerClaims user, IList<NewProviderDTO> newDtos, Action<string, string> addError)
        {
            var result = _mapper.Map<IList<NewProviderDTO>, IList<ProviderDTO>>(newDtos);
            //To-Do Replace dependency on users module, per a an invokation to an event handler after storing it on the provider after storing it in db (in a post process method)
            //(result.KeTePongoProviderId, result.Salesman.SalesmanUserId) = await _userManager.GetKeTePongoProviderAndSalesmanIdsAsync(result?.Salesman?.Email);
            return Task.FromResult(result);
        }
        protected override Task<ProviderDTO> PreProcessUpdateAsync(IConsumerClaims user, UpdateProviderDTO dto, Action<string, string> addError)
        {
            //To-Do On server side when a provider signs-up and you find multiple providers in a consumer have salesmans
            // of the same provider, you should link those local providers with the same provider. 
            // But you should mark those local providers as Wrong and notificate it to consumer to fix the scenario
            // selecting which of them will be the only local provider, removing the others and changing provider of those 
            // products to the only one there.
            //To-Do Replace dependency on users module, per a an invokation to an event handler after storing it on the provider after storing it in db (in a post process method)
            //(result.KeTePongoProviderId, result.Salesman.SalesmanUserId) = await _userManager.GetKeTePongoProviderAndSalesmanIdsAsync(result?.Salesman?.Email);
            //(dto.KeTePongoProviderId, dto.Salesman.SalesmanUserId) = await _userManager.GetKeTePongoProviderAndSalesmanIdsAsync(dto?.Salesman?.Email);
            return Task.FromResult(_mapper.Map<UpdateProviderDTO, ProviderDTO>(dto));
        }
        public override async Task OnAddSuccessAsync(
            IConsumerClaims user, Consumption consumption, IList<Models.ConsumptionDocument.Provider> newEntities, Action<string, string> addError)
        {
            if (user == null)
            {
                return;
            }
            foreach (var newEntity in newEntities)
            {
                ConsumerDTO consumerDTO = await _consumerAppService.GetAsync(user.ConsumerOID);
                var context = new AddedConsumerProviderContext(
                  consumerDTO: consumerDTO, 
                  providerIdForConsumer: newEntity.Id,
                  providerSalesmanEmail: newEntity.Salesman.Email
                );
                await _consumerProviderLinkedEventHandlers.InvokeAsync(x => x.AddedConsumerProviderAsync(context, addError), _logger);
            }
            return;
        }

        public override async Task OnDeleteSuccessAsync(Consumption document, Models.ConsumptionDocument.Provider removedEntity, Action<string, string> addError)
        {
            await RaiseOnDeleteSuccessEventsAsync(document.ConsumerOID, removedEntity.Id, removedEntity.KeTePongoProviderOID, removedEntity.Salesman.Email, addError);
        }
        public override async Task OnDeleteSuccessAsync(IConsumerClaims user, Consumption document, Models.ConsumptionDocument.Provider removedEntity, Action<string, string> addError)
        {
            await RaiseOnDeleteSuccessEventsAsync(user.ConsumerOID, removedEntity.Id, removedEntity.KeTePongoProviderOID, removedEntity.Salesman.Email ,addError);
        }
        private async Task RaiseOnDeleteSuccessEventsAsync(long consumerOID, int removedEntityId, long? providerOID, string providerSalesmanEmail, Action<string,string> addError)
        {
            var context = new RemovedConsumerProviderContext(
               consumerOID: consumerOID,
               providerIdForConsumer: removedEntityId,
               providerOID: providerOID ?? 0,
               providerSalesmanEmail: providerSalesmanEmail
           );
            await _consumerProviderLinkedEventHandlers.InvokeAsync(x => x.RemovedConsumerProviderAsync(context, addError), _logger);
        }

        public async Task<bool> RemoveAndRemoveChildrenAsync(long consumptionOID, int providerId, int? changeVersion, Action<string, string> addError)
        {
            var oldValue = _domainService.HaveToDeleteChildrenOnRemove;
            _domainService.HaveToDeleteChildrenOnRemove = true;
            var result = await base.RemoveAsync(consumptionOID, providerId, changeVersion, addError);
            _domainService.HaveToDeleteChildrenOnRemove = oldValue;
            return result;

        }

        public async Task<bool> RemoveAndRemoveChildrenOIDAsync(long consumptionOID, int providerId, int? changeVersion, Action<string, string> addError)
        {
            var oldValue = _domainService.HaveToDeleteChildrenOnRemove;
            _domainService.HaveToDeleteChildrenOnRemove = false;
            var result = await base.RemoveAsync(consumptionOID, providerId, changeVersion, addError);
            _domainService.HaveToDeleteChildrenOnRemove = oldValue;
            return result;
        }
    }
}
