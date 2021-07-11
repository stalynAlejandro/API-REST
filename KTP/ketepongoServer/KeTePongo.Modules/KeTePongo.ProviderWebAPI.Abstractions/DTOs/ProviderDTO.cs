using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderDTOWithoutImage
    {
        [DisplayName(nameof(TradeName))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string TradeName { get; set; }

        [DisplayName(nameof(Address))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Address { get; set; }

        [DisplayName(nameof(StateOrProvince))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string StateOrProvince { get; set; }

        [DisplayName(nameof(Town))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Town { get; set; }

        [DisplayName(nameof(PostalCode))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string PostalCode { get; set; }

        [DisplayName(nameof(SanitaryMeasures))]
        [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
        public List<string> SanitaryMeasures { get; set; } = new List<string>();
        [DisplayName(nameof(WelcomeMessage))]
        public string WelcomeMessage { get; set; }

        [DisplayName(nameof(IsLinkedToERP))]
        public bool IsLinkedToERP { get; set; }

        [DisplayName(nameof(IsProviderCatalogProductsPublic))]
        public bool IsProviderCatalogProductsPublic { get; set; } = true;

    }
    public class NewProviderDTO : ProviderDTOWithoutImage
    {
        [DisplayName(nameof(ImageFile))]
        public IFormFile ImageFile { get; set; }
    }
    public class UpdateProviderDTO : NewProviderDTO
    {
        [DisplayName(nameof(ImageUrl))]
        public string ImageUrl { get; set; }
    }
    public class UpdateAnyProviderDTO : UpdateProviderDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OID { get; set; }
    }
    public class ProviderDTO : ProviderDTOWithoutImage
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(0, long.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OID { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ChangeVersion { get; set; }

        [DisplayName(nameof(Code))]
        public string Code { get; set; }

        [DisplayName(nameof(ImageUrl))]
        public string ImageUrl { get; set; }
        public bool IsActivated { get; set; }
        public long ConsumerOID { get; set; }
    }
}
