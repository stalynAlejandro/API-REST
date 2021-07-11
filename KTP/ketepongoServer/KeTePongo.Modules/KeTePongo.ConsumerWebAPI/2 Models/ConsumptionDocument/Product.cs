using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.Core.Interfaces;
using System;
using System.Collections;
using System.Collections.Generic;

namespace KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument
{
    public class Product : ILocalIdEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        public ExtraDataForConsumer ExtraDataForConsumer { get;set;}
        
        public string ERPId { get; set; }
        public long? KeTePongoProviderOID { get; set; }

        public string Description { get; set; }
        public int IsVegan { get; set; }

        public IList<int> AllergenIds { get; set; }
        public decimal PVP { get; set; }
    }
    public class ExtraDataForConsumer
    {
        public IList<int> LocationIds { get; set; }
        public int ProviderId { get; set; }
        public int? ProviderProductId { get; set; }
    }
}
