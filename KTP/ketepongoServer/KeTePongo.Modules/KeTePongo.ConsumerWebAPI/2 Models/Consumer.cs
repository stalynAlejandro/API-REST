using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.ConsumerWebAPI.Models
{
    public class Consumer : IOIDEntity, IChangeVersion
    {
        public ConsumerType ConsumerType { get; set; }
        public int ChangeVersion { get; set; }

        public int Id { get; set; }
        public long OID { get; set; }
        public string TradeName { get; set; }
        public string Address { get; set; }
        public string StateOrProvince { get; set; }
        public string Town { get; set; }
        public string PostalCode { get; set; }
        public ExtraDataForConsumerModule ExtraDataForConsumerModule { get; set; }
    }
    public class ExtraDataForConsumerModule
    {
        public string Code { get; set; }
        public List<string> SanitaryMeasures { get; set; } = new List<string>();
        public string ImageUrl { get; set; }
        public string WelcomeMessage { get; set; }
        public bool IsActivated { get; set; }
        public long ProviderOID { get; set; }
    }
}
