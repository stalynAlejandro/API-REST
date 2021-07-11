using KeTePongo.Core.Interfaces;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ERPMostConsumedCatalogProductsDTO
    {
        public long ProviderOID { get; set; }

        [DisplayName(nameof(MostConsumedCatalogProducts))]
        public List<MostConsumedCatalogProductDTO> MostConsumedCatalogProducts { get; set; }
    }
    public class MostConsumedCatalogProductDTO 
    {
        public string ERPIdConsumer { get; set; }
        public string ERPIdProduct { get; set; }
    }
}
