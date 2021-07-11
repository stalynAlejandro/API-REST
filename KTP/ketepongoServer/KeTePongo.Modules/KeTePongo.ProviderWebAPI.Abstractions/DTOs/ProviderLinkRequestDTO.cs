using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderLinkRequestDTO
    {
        public string SalesmanEmail { get; set; }
        public string SalesmanTelephone { get; set; }
        public string SalesmanName { get; set; }
        public string TradeName { get; set; }
        public bool IsProviderCatalogProductsPublic { get; set; }
    }
}
