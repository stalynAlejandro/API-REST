using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderInfoAtOrderDTO
    {
        public int? Id { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public int IdForConsumer { get; set; }
        public string TradeName { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string SalesmanName { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(50, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public string SalesmanEmail { get; set; }
        public int? SalesmanUserId { get; set; }
        
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(50, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        [Phone(ErrorMessage = Resources.PhoneAttribute_Invalid)]
        public string SalesmanTelephone { get; set; }

    }
}
