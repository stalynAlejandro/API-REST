using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class Provider: IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public string TradeName { get; set; }
        public string Address { get; set; }
        public string StateOrProvince { get; set; }
        public string Town { get; set; }
        public string PostalCode { get; set; }
        public ExtraDataForProviderModule ExtraDataForProviderModule { get; set; }
        public bool IsLinkedToERP { get; set; }
        public bool IsProviderCatalogProductsPublic { get; set; } = true;
    }
    public class ExtraDataForProviderModule
    {
        public bool IsActivated { get; set; }
        public long ConsumerOID { get; set; }

        public string Code { get; set; }
        public List<string> SanitaryMeasures { get; set; } = new List<string>();
        public string ImageUrl { get; set; }
        public string WelcomeMessage { get; set; }
    }
}
