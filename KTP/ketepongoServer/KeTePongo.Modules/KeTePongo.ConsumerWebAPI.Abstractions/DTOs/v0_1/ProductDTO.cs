using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Xml;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class ProductDTO : ILocalIdEntity, INullableChangeVersion
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? ChangeVersion { get; set; }

        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }

        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(ImageUrl))]
        public string ImageUrl { get; set; }

        [DisplayName(nameof(LocationIds))]
        public IList<int> LocationIds { get; set; }
        [DisplayName(nameof(ProviderId))]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ProviderId { get; set; }

        [DisplayName(nameof(IsMappedToProviderProduct))]
        public bool IsMappedToProviderProduct { get; set; }
        [DisplayName(nameof(ProviderProductId))]
        public int? ProviderProductId { get; set; }

        [DisplayName(nameof(ERPId))]
        public string ERPId { get; set; }
        [DisplayName(nameof(KeTePongoProviderOID))]
        public long? KeTePongoProviderOID { get; set; }

        [DisplayName(nameof(IsVegan))]
        public bool? IsVegan { get; set; }

        [DisplayName(nameof(AllergenIds))]
        public IList<int> AllergenIds { get; set; }

        [DisplayName(nameof(PVP))]
        public decimal? PVP { get; set; }
        [DisplayName(nameof(Description))]
        public string Description { get; set; }
    }
    public class NewProductDTO 
    {
        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(LocationIds))]
        public IList<int> LocationIds { get; set; }
        [DisplayName(nameof(ProviderId))]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ProviderId { get; set; }
        [DisplayName(nameof(ProviderProductId))]
        public int? ProviderProductId { get; set; }

        [DisplayName(nameof(ERPId))]
        public string ERPId { get; set; }
        [DisplayName(nameof(KeTePongoProviderOID))]
        public long? KeTePongoProviderOID { get; set; }

        [DisplayName(nameof(IsVegan))]
        public bool? IsVegan { get; set; }

        [DisplayName(nameof(AllergenIds))]
        public IList<int> AllergenIds { get; set; }

        [DisplayName(nameof(PVP))]
        public decimal? PVP { get; set; }
        [DisplayName(nameof(Description))]
        public string Description { get; set; }
    }
    public class ProcessedUpdateProductDTO : UpdateProductDTO, INullableChangeVersion
    {
        public int? ChangeVersion { get; set; }
        public int ProviderId { get; set; }
        public string ImageUrl { get; set; }
        public int? ProviderProductId { get; set; }
        public string ERPId { get; set; }
        public long? KeTePongoProviderOID { get; set; }
        [DisplayName(nameof(IsVegan))]
        public bool? IsVegan { get; set; }

        [DisplayName(nameof(AllergenIds))]
        public IList<int> AllergenIds { get; set; }

        [DisplayName(nameof(PVP))]
        public decimal? PVP { get; set; }
    }
    public class UpdateProductDTO : ILocalIdEntity
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }

        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(LocationIds))]
        public IList<int> LocationIds { get; set; }
    }
    public class ProductDTOWithImage
    {
        [DisplayName(nameof(Product))]
        [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ProductDTO Product { get; set; }

        [DisplayName(nameof(ImageFile))]
        public IFormFile ImageFile { get; set; }
    }
    public class NewProductDTOWithImage
    {
        [DisplayName(nameof(Product))]
        [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public NewProductDTO Product { get; set; }

        [DisplayName(nameof(ImageFile))]
        public IFormFile ImageFile { get; set; }
    }
    public class UpdateProductDTOWithImage
    {
        [DisplayName(nameof(Product))]
        [ModelBinder(BinderType = typeof(FormDataJsonBinder))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public UpdateProductDTO Product { get; set; }

        [DisplayName(nameof(ImageFile))]
        public IFormFile ImageFile { get; set; }
    }
}
