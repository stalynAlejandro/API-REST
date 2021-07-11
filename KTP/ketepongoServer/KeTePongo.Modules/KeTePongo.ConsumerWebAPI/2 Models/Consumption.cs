using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.ConsumerWebAPI.Models
{
    public class Consumption : IOIDEntity, IChangeVersion
    { 
        [Obsolete("Obsolete", false)]
        public Consumption()
        { }
        public Consumption(long consumerOID)
        {
            if (consumerOID == 0)
            {
                throw new ArgumentException("Invalid Consumer Id"); 
            }
            ConsumerOID = consumerOID;
            LocationsNextId = 1;
            ProductsNextId = 1;
            ProvidersNextId = 1;
            Locations = new List<Location>();
            Providers = new List<Provider>();
            Products = new List<Product>();
        }
        public int ChangeVersion { get; set; }
        [Obsolete("Obsolete", false)]
        public int Id { get; set; }
        public long OID { get; set; }
        public long ConsumerOID { get; set; }
        public int LocationsNextId { get; set; }
        public int ProvidersNextId { get; set; }
        public int ProductsNextId { get; set; }
        public IList<Location> Locations { get; set; }
        public IList<Product> Products { get; set; }
        public IList<Provider> Providers { get; set; }
    }
}
