using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class CatalogProductInConsumerConsumption : IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public long ConsumerOID { get; private set; }
        public long ConsumptionOID { get; set; }
        public int ConsumerProductId { get; private set; }
        public string ProductERPId { get; set; }
        public long ProviderOID { get; set; }
    }
}
