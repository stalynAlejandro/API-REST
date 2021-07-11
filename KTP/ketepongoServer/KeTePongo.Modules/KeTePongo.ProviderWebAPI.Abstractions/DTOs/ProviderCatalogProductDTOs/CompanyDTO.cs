//using System;
//using System.Collections.Generic;
//using System.ComponentModel;
//using System.ComponentModel.DataAnnotations;
//using System.Runtime.InteropServices;
//using System.Text;

//namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs
//{
//    public class CompanyDTO 
//    {
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        [Range(0, long.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
//        public long OID { get; set; }

//        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
//        public int ChangeVersion { get; set; }

//        [DisplayName(nameof(Code))]
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        public string Code { get; set; }

//        [DisplayName(nameof(TradeName))]
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        public string TradeName { get; set; }

//        [DisplayName(nameof(Address))]
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        public string Address { get; set; }

//        [DisplayName(nameof(StateOrProvince))]
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        public string StateOrProvince { get; set; }

//        [DisplayName(nameof(Town))]
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        public string Town { get; set; }

//        [DisplayName(nameof(PostalCode))]
//        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
//        public string PostalCode { get; set; }

//        [DisplayName(nameof(Telephone))]
//        [Phone(ErrorMessage = Resources.PhoneAttribute_Invalid)]
//        public string Telephone { get; set; }

//        [DisplayName(nameof(ImageUrl))]
//        public string ImageUrl { get; set; }

//        [DisplayName(nameof(SanitaryMeasures))]
//        public List<string> SanitaryMeasures { get; set; } = new List<string>();

//        [DisplayName(nameof(WelcomeMessage))]
//        public string WelcomeMessage { get; set; }
//    }

//}
