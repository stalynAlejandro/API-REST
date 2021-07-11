using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class UpdateSalesmanDTO
    {

        [DisplayName(nameof(Email))]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(255, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Email { get; set; }

        [DisplayName(nameof(Telephone))]
        [Phone(ErrorMessage = Resources.PhoneAttribute_Invalid)]
        [StringLength(50, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Telephone { get; set; }
    }
    public class SalesmanDTO : UpdateSalesmanDTO
    {
        [DisplayName(nameof(SalesmanUserName))]
        public string SalesmanUserName { get; set; }
    }
}
