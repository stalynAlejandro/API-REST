using System;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ConsumerInfoAtOrder
    {
        public long OID { get; set; }
        public string TradeName { get; set; }
        public string Address { get; set; }
        public string StateOrProvince { get; set; }
        public string Town { get; set; }
        public string PostalCode { get; set; }
        public String Telephone { get; set; }
    }
}
