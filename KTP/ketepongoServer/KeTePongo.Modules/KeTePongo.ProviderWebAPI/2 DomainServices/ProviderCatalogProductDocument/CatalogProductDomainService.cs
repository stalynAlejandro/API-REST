using KeTePongo.Core.DomainServices;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ProviderWebAPI.DomainServices.ProviderCatalogProductDocument
{
    public class CatalogProductDomainService : DocumentEntityService<ProviderCatalogProducts, CatalogProduct>
    {
        IStringLocalizer S;
        public CatalogProductDomainService(IStringLocalizer<CatalogProductDomainService> localizer)
        {
            S = localizer;
        }
        override public IList<CatalogProduct> GetAllEntitiesFromDocument(ProviderCatalogProducts document)
        {
            return document.CatalogProducts;
        }
        override protected int GetAndIncrementEntityCounter(ProviderCatalogProducts document)
        {
            return document.ProductsNextId++;
        }
        override protected CatalogProduct AddEntityToDocument(ProviderCatalogProducts document, CatalogProduct product)
        {
            document.CatalogProducts.Add(product);
            return product;
        }
        override public bool ValidateEntity(ProviderCatalogProducts document, CatalogProduct entity, Action<string, string> addError)
        {
            if (!base.ValidateEntity(document, entity, addError))
            {
                return false;
            }
            if (AnyRepeatedSection(entity))
            {
                addError($"{nameof(CatalogProduct.ExtraDataForConsumer.SectionIds)}", S["A product cannot be assigned to the same section multiple times"]);
                return false;
            }
            if (AnyUnexistingSection(document, entity))
            {
                addError($"{nameof(CatalogProduct.ExtraDataForConsumer.SectionIds)}", "A product can only be assigned to existing sections");
                return false;
            }
            if (AnyRepeatedAllergen(entity))
            {
                addError($"{nameof(CatalogProduct.AllergenIds)}", "An allergen cannot be assigned multiple times to a product");
                return false;
            }
            if (AnyUnexistingAllergen(document, entity))
            {
                addError($"{nameof(CatalogProduct.Name)}", "A product can only be assigned to existing allergens");
                return false;
            }
            return true;
        }
        private static bool AnyUnexistingSection(ProviderCatalogProducts document, CatalogProduct product)
        {
            return product.ExtraDataForConsumer.SectionIds.Any(id => !document.Sections.Any(l => l.Id == id));
        }
        private static bool AnyRepeatedSection(CatalogProduct product)
        {
            return product.ExtraDataForConsumer.SectionIds.Count != product.ExtraDataForConsumer.SectionIds.Distinct().Count();
        }
        private static bool AnyUnexistingAllergen(ProviderCatalogProducts document, CatalogProduct product)
        {
            return product.AllergenIds.Any(id => !document.Allergens.Any(l => l.Id == id));
        }
        private static bool AnyRepeatedAllergen(CatalogProduct product)
        {
            return product.AllergenIds.Count != product.AllergenIds.Distinct().Count();
        }

        override protected bool RemoveEntityFromDocument(ProviderCatalogProducts document, CatalogProduct product)
        {
            return document.CatalogProducts.Remove(product);
        }
    }
}
