using KeTePongo.Core.DTOs;
using KeTePongo.Core.Interfaces;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs
{
    public class SectionDTO : UpdateSectionDTO, INullableChangeVersion
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? ChangeVersion { get; set; }
        [DisplayName(nameof(ERPId))]
        public string ERPId { get; set; }
    }
    public class UpdateSectionDTO : ILocalIdEntity
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }

        [DisplayName(nameof(Name))]
        [StringLength(50, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(DisplayOrder))]
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int DisplayOrder { get; set; }
    }
    public class NewSectionDTO
    {
        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(50, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }

        [DisplayName(nameof(DisplayOrder))]
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int DisplayOrder { get; set; }
        [DisplayName(nameof(ERPId))]
        public string ERPId { get; set; }
    }
    public class DeleteSectionDTO : DeleteEntityDTO { }
}
