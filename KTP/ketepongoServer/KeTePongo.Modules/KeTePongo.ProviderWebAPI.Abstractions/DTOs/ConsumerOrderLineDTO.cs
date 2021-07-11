using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ConsumerOrderLineDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ConsumerProductDTO Product { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Quantity { get; set; }
        public string Observation { get; set; }
    }
}
