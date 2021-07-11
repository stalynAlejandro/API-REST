using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

namespace KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1
{
    public class ChangePasswordDTO : IValidatableObject
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [DataType(DataType.Password, ErrorMessage = Resources.DataTypeAttribute_Password_Invalid)]
        public string CurrentPassword { get; set; }

        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [DataType(DataType.Password, ErrorMessage = Resources.DataTypeAttribute_Password_Invalid)]
        public string NewPassword { get; set; }

        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [DataType(DataType.Password, ErrorMessage = Resources.DataTypeAttribute_Password_Invalid)]
        public string NewPasswordConfirmation { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<ChangePasswordDTO>>();
            if (NewPassword != NewPasswordConfirmation)
            {
                yield return new ValidationResult(S["The new password and confirmation password do not match."], new[] { nameof(NewPasswordConfirmation) });
            }
        }
    }
}
