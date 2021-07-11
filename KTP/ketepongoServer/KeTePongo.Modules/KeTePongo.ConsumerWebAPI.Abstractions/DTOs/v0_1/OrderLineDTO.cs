using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class OrderLineDTO
    {
        [DisplayName(nameof(Product))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ProductDTO Product { get; set; }

        [DisplayName(nameof(Quantity))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Quantity { get; set; }

        [DisplayName(nameof(Observation))]
        public string Observation { get; set; }
    }
}
