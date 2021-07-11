using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.DomainServices;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ConsumerWebAPI.DomainServices.ConsumptionDocument
{
    public class ProductDomainService : DocumentEntityService<Consumption, Product>
    {
        IStringLocalizer S;
        public ProductDomainService(IStringLocalizer<ProductDomainService> localizer)
        {
            S = localizer;
        }
        override public IList<Product> GetAllEntitiesFromDocument(Consumption document)
        {
            return document.Products;
        }
        override protected int GetAndIncrementEntityCounter(Consumption document)
        {
            return document.ProductsNextId++;
        }
        override protected Product AddEntityToDocument(Consumption document, Product product)
        {
            document.Products.Add(product);
            return product;
        }
        override public bool ValidateEntity(Consumption document, Product entity, Action<string, string> addError)
        {
            if (!base.ValidateEntity(document, entity, addError))
            {
                return false;
            }
            if (AnyRepeatedLocation(entity))
            {
                addError($"{nameof(Product.ExtraDataForConsumer.LocationIds)}", S["A product cannot be assigned to the same location multiple times"]);
                return false;
            }
            if (AnyUnexistingLocation(document, entity))
            {
                addError($"{nameof(Product.ExtraDataForConsumer.LocationIds)}", S["A product can only be assigned to existing locations"]);
                return false;
            }
            var provider = document.Providers.FirstOrDefault(p => p.Id == entity.ExtraDataForConsumer.ProviderId);
            if (provider == null)
            {
                addError($"{nameof(Product.ExtraDataForConsumer.ProviderId)}", S["A product can only be assigned to existing providers"]);
                return false;
            }
            return ValidateKeTePongoProvider(entity, addError, provider);
        }

        private bool ValidateKeTePongoProvider(Product entity, Action<string, string> addError, Provider provider)
        {
            if (!provider.KeTePongoProviderOID.HasValue)
            {
                return true;
            }
            if (!entity.ExtraDataForConsumer.ProviderProductId.HasValue)
            {
                addError($"{nameof(Product.ExtraDataForConsumer.ProviderProductId)}", S["A provider id is needed for new registered provider products"]);
                return false;
            }
            if (string.IsNullOrWhiteSpace(entity.ERPId))
            {
                addError($"{nameof(Product.ERPId)}", S["A erp id is needed for new registered provider products"]);
                return false;
            }
            return true;
        }

        private static bool AnyUnexistingLocation(Consumption document, Product product)
        {
            return product.ExtraDataForConsumer.LocationIds.Any(id => !document.Locations.Any(l => l.Id == id));
        }

        private static bool AnyRepeatedLocation(Product product)
        {
            return product.ExtraDataForConsumer.LocationIds.Count != product.ExtraDataForConsumer.LocationIds.Distinct().Count();
        }

        override protected bool RemoveEntityFromDocument(Consumption document, Product product)
        {
            return document.Products.Remove(product);
        }
    }
}
