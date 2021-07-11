using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

namespace KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1
{
    public class ConfirmUserPhoneDTO : IValidatableObject
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Code { get; set; }

        [DisplayName(nameof(Telephone))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Telephone { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<ConfirmUserPhoneDTO>>();
            if (string.IsNullOrWhiteSpace(Code))
            {
                yield return new ValidationResult(S["The code is required"], new[] { nameof(Code) });
            }

            if (string.IsNullOrWhiteSpace(Telephone))
            {
                yield return new ValidationResult(S["The telephone is required"], new[] { nameof(Code) });
            }
        }
    }

}
