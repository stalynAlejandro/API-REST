using KeTePongo.Core.Interfaces;
using KeTePongo.Core.Services;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System;
using System.Collections.Generic;
using System.Linq;
using YesSql.Sql.Schema;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ProviderCatalogProducts : IOIDEntity, IChangeVersion
    {
        [Obsolete("Obsolete", false)]
        public ProviderCatalogProducts()
        { }
        public ProviderCatalogProducts(Provider provider)
        {
            if (provider == null)
            {
                throw new NullReferenceException("Company cannot be null");
            }
            if (string.IsNullOrWhiteSpace(provider.ExtraDataForProviderModule.Code))
            {
                throw new ArgumentException("Invalid Company Code");
            }
            SectionsNextId = 1;
            ProductsNextId = 1;
            Sections = new List<Section>();
            CatalogProducts = new List<CatalogProduct>();
            Provider = provider;
            Allergens = Allergen.KnownAllergens.ToList();
        }
        public int ChangeVersion { get; set; }
        [Obsolete("Obsolete", false)]
        public int Id { get; set; }
        public long OID { get; set; }
        public int AllergensNextId { get; set; } = Allergen.KnownAllergens.Length + 1;
        public int SectionsNextId { get; set; }
        public int ProductsNextId { get; set; }
        public Provider Provider { get; set; }
        public IList<Section> Sections { get; set; }
        public IList<CatalogProduct> CatalogProducts { get; set; }
        public IList<Allergen> Allergens { get; set; }
}
}
