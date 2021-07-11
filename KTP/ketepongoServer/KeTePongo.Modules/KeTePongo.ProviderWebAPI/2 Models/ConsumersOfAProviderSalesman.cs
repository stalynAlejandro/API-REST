using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ConsumersOfAProviderSalesman : IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public string SalesManUserName { get; set; }
        public List<ConsumerOfAProviderSalesman> Consumers { get; set; }
    }
    public class ConsumerOfAProviderSalesman
    {
        public long ConsumerOID { get; set; }
        public string ERPId { get; set; }
        public string TradeName { get; set; }
        public string BussinessName { get; set; }
        public string Address { get; set; }
        public string StateOrProvince { get; set; }
        public string Town { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
    }
}
