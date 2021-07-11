using KeTePongo.Core.Interfaces;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderCatalogProductsDTO :  IChangeVersion
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ChangeVersion { get; set; }
        
        [DisplayName(nameof(Sections))]
        public IList<SectionDTO> Sections { get; set; }

        [DisplayName(nameof(CatalogProducts))]
        public IList<CatalogProductDTO> CatalogProducts { get; set; }

        [DisplayName(nameof(Allergens))]
        public IList<AllergenDTO> Allergens { get; set; }
        [DisplayName(nameof(Provider))]
        public ProviderDTO Provider { get; set; }
    }
}
