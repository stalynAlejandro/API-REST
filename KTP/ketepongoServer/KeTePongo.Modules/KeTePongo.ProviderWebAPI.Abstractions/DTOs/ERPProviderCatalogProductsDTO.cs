using KeTePongo.Core.Interfaces;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ERPProviderCatalogProductsDTO
    {
        [DisplayName(nameof(Sections))]
        public List<ERPSectionDTO> Sections { get; set; }

        [DisplayName(nameof(CatalogProducts))]
        public List<ERPCatalogProductDTO> CatalogProducts { get; set; }
    }
    public class ERPCatalogProductDTO: NewCatalogProductDTO
    {
        public IList<string> SectionERPIds { get; set; }
    }
    public class ERPSectionDTO : NewSectionDTO
    {

    }
}
