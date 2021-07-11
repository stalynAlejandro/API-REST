using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ERPClientsPortfolioDTO
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ChangeVersion { get; set; }
        public int Id { get; set; }

        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(0, long.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OID { get; set; }

        public long ProviderOID { get; set; }
        public List<ERPClientDTO> Clients { get; set; }
    }
    public class ERPClientDTO
    {
        public long ConsumerOID { get; set; }

        [DisplayName(nameof(ERPId))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string ERPId { get; set; }
        [DisplayName(nameof(TradeName))]
        public string TradeName { get; set; }

        [DisplayName(nameof(BussinessName))]
        public string BussinessName { get; set; }

        [DisplayName(nameof(Address))]
        public string Address { get; set; }

        [DisplayName(nameof(StateOrProvince))]
        public string StateOrProvince { get; set; }

        [DisplayName(nameof(Town))]
        public string Town { get; set; }

        [DisplayName(nameof(Country))]
        public string Country { get; set; }

        [DisplayName(nameof(PostalCode))]
        public string PostalCode { get; set; }

        [DisplayName(nameof(Telephone))]
        public string Telephone { get; set; }

        [DisplayName(nameof(Email))]
        public string Email { get; set; }
    }
}