using KeTePongo.Core.Interfaces;
using KeTePongo.Core.Services;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System;
using System.Collections.Generic;
using System.Linq;
using YesSql.Sql.Schema;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ERPMostConsumedCatalogProducts : IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public List<MostConsumedCatalogProduct> MostConsumedCatalogProducts { get; set; }
    }
    public class MostConsumedCatalogProduct
    {
        public string ERPIdConsumer { get; set; }
        public string ERPIdProduct { get; set; }
    }
}
