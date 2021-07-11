using KeTePongo.Core.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument
{
    public class CatalogProduct : ILocalIdEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int IsVegan { get; set; }
        public ExtraDataForConsumer ExtraDataForConsumer { get; set; }

        public IList<int> AllergenIds { get; set; }
        public decimal PVP { get; set; }
        public string ERPId { get; set; }
    }
    public class ExtraDataForConsumer
    {
        public IList<int> SectionIds { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsHiddenInCarte { get; set; }
    }
}
