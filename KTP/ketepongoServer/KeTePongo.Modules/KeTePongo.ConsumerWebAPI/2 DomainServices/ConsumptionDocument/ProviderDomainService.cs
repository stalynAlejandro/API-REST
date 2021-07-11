using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.DomainServices;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument
{
    public class ProviderDomainService : DocumentEntityService<Consumption, Provider>
    {
        IStringLocalizer S;
        public bool HaveToDeleteChildrenOnRemove { get; set; } = true;
        public ProviderDomainService(IStringLocalizer<ProviderDomainService> localizer)
        {
            S = localizer;
        }

        override public IList<Provider> GetAllEntitiesFromDocument(Consumption document)
        {
            return document.Providers;
        }
        protected override int GetAndIncrementEntityCounter(Consumption document)
        {
            return document.ProvidersNextId++;
        }
        protected override Provider AddEntityToDocument(Consumption document, Provider entity)
        {
            document.Providers.Add(entity);
            return entity;
        }
        protected override bool RemoveEntityFromDocument(Consumption document, Provider entity)
        {
            if (HaveToDeleteChildrenOnRemove)
            {
                document.Products = document.Products.Where(p => p.ExtraDataForConsumer.ProviderId != entity.Id).ToList();
            }
            else
            {
                document.Products.Where(p => p.ExtraDataForConsumer.ProviderId == entity.Id).ToList().ForEach(p=>p.ExtraDataForConsumer.ProviderId = 0);
            }
            return document.Providers.Remove(entity);

        }
        public override bool ValidateEntity(Consumption document, Provider entity, Action<string, string> addError)
        {
            if (!base.ValidateEntity(document, entity, addError))
            {
                return false;
            }
            if(!AnyRepeatedProvider(document))
            {
                addError($"{nameof(entity.Salesman.Email)}", S["A provider cannot be added twice"]);
                return false;
            }

            return true;
        }
        private bool AnyRepeatedProvider(Consumption document)
        {
            return GetAllEntitiesFromDocument(document).Count == GetAllEntitiesFromDocument(document).Select(a => a.Salesman.Email).Distinct().Count();
        }
    }
}
