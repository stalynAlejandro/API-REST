using KeTePongo.Core.DomainServices;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ProviderWebAPI.DomainServices.ProviderCatalogProductDocument
{
    public class SectionDomainService : DocumentEntityService<ProviderCatalogProducts, Section>
    {
        public override IList<Section> GetAllEntitiesFromDocument(ProviderCatalogProducts document)
        {
            return document.Sections;
        }
        protected override int GetAndIncrementEntityCounter(ProviderCatalogProducts document)
        {
            return document.SectionsNextId++;
        }
        protected override Section AddEntityToDocument(ProviderCatalogProducts document, Section entity)
        {
            document.Sections.Add(entity);
            return entity;
        }
        protected override bool RemoveEntityFromDocument(ProviderCatalogProducts document, Section entity)
        {
            foreach (var product in document.CatalogProducts)
            {
                product.ExtraDataForConsumer.SectionIds.Remove(entity.Id);
            }
            return document.Sections.Remove(entity);
        }
    }
}
