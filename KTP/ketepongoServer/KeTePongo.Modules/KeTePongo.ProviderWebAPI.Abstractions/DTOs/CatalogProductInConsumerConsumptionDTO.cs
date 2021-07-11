using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class CatalogProductInConsumerConsumptionDTO
    {
        public long ConsumerOID { get; private set; }
        public long ConsumptionOID { get; set; }
        public int ConsumerProductId { get; private set; }
        public string ProductERPId { get; set; }
        public long ProviderOID { get; set; }

    }
}
