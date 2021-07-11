using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ERPProviderCatalogProductsChangesDTO
    {
        public List<ERPCatalogProductUpdatedDTO> UpdatedCatalogProducts { get; set; }
        public List<ERPCatalogProductUpdatedDTO> RemovedCatalogProducts { get; set; }
    }
    public class ERPCatalogProductUpdatedDTO: ERPCatalogProductDTO
    {
        public int ConsumerProductId { get; set; }
    }
}
