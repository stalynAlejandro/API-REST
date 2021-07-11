using KeTePongo.Core.DTOs;
using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class UpdateProductsDTO
    {
        Guid OperationId { get; set; }
        public IList<ProductDTO> Products { get; set; }
    }
    public class ProductsDTO : IChangeVersion
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ChangeVersion { get; set; }
        public IList<ProductDTO> Products { get; set; }
    }

    public class ProductDTO : NewProductDTO, INullableChangeVersion, ILocalIdEntity
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? ChangeVersion { get; set; }
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }
    }
    public class UpdateProductDTO : ILocalIdEntity
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }
        [DisplayName(nameof(Name))]
        [StringLength(150, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(Description))]
        public string Description { get; set; }

        [DisplayName(nameof(IsVegan))]
        public bool? IsVegan { get; set; }

        [DisplayName(nameof(SectionIds))]
        public IList<int> SectionIds { get; set; }

        [DisplayName(nameof(AllergenIds))]
        public IList<int> AllergenIds { get; set; }

        [DisplayName(nameof(PVP))]
        public decimal? PVP { get; set; }
        [DisplayName(nameof(DisplayOrder))]
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? DisplayOrder { get; set; }
        [DisplayName(nameof(IsHiddenInCarte))]
        public bool? IsHiddenInCarte { get; set; }
    }
    public class NewProductDTO
    {
        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(150, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(Description))]
        public string Description { get; set; }

        [DisplayName(nameof(IsVegan))]
        public bool IsVegan { get; set; }

        [DisplayName(nameof(SectionIds))]
        public IList<int> SectionIds { get; set; }

        [DisplayName(nameof(AllergenIds))]
        public IList<int> AllergenIds { get; set; }

        [DisplayName(nameof(PVP))]
        public decimal PVP { get; set; }
        [DisplayName(nameof(DisplayOrder))]
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int DisplayOrder { get; set; }
        [DisplayName(nameof(IsHiddenInCarte))]
        public bool IsHiddenInCarte { get; set; }
        [Required, StringLength(150)]
        public string ForeignReference { get; set; }
    }

    public class DeleteProductDTO : DeleteEntityDTO { }
}
