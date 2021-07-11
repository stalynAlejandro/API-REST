using KeTePongo.Core.DomainServices;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ProviderWebAPI.DomainServices.ProviderCatalogProductDocument
{
    public class AllergenDomainService : DocumentEntityService<ProviderCatalogProducts, Allergen>
    {
        public override IList<Allergen> GetAllEntitiesFromDocument(ProviderCatalogProducts document)
        {
            return document.Allergens;
        }
        protected override int GetAndIncrementEntityCounter(ProviderCatalogProducts document)
        {
            return document.AllergensNextId++;
        }
        protected override Allergen AddEntityToDocument(ProviderCatalogProducts document, Allergen entity)
        {
            document.Allergens.Add(entity);
            return entity;
        }
        protected override bool RemoveEntityFromDocument(ProviderCatalogProducts document, Allergen entity)
        {
            foreach (var product in document.CatalogProducts)
            {
                product.AllergenIds.Remove(entity.Id);
            }
            return document.Allergens.Remove(entity);
        }
    }
}
