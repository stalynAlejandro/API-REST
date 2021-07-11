using KeTePongo.Core.Interfaces;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class LocationDTO : UpdateLocationDTO, INullableChangeVersion
    {
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? ChangeVersion { get; set; }
        
    }
    public class UpdateLocationDTO : NewLocationDTO, ILocalIdEntity
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }
    }

    public class NewLocationDTO
    {
        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(50, MinimumLength = 1, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }
    }
}
