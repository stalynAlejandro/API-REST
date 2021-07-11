using KeTePongo.Core.Interfaces;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class ConsumptionDTO :  IChangeVersion
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ChangeVersion { get; set; }

        [DisplayName(nameof(Locations))]
        public IList<LocationDTO> Locations { get; set; }

        [DisplayName(nameof(Products))]
        public IList<ProductDTO> Products { get; set; }

        [DisplayName(nameof(Providers))]
        public IList<ProviderDTO> Providers { get; set; }
    }
}
