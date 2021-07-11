using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ConsumerInfoAtOrderDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }

        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public String TradeName { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public String Address { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string StateOrProvince { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Town { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string PostalCode { get; set; }
        [Phone(ErrorMessage = Resources.PhoneAttribute_Invalid)]
        public String Telephone { get; set; }
    }
}
