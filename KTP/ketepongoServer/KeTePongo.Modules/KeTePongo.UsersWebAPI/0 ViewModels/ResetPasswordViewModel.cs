using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;
using OrchardCore.Users.ViewModels;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class ResetPasswordViewModel : IValidatableObject
    {
        [DisplayName(nameof(Email))]
        [Required( ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public string Email { get; set; }

        [DisplayName("NewPassword")]
        [Required( ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [DataType(DataType.Password, ErrorMessage = Resources.DataTypeAttribute_Password_Invalid)]
        public string Password { get; set; }

        [DisplayName(nameof(PasswordConfirmation))]
        [DataType(DataType.Password, ErrorMessage = Resources.DataTypeAttribute_Password_Invalid)]
        public string PasswordConfirmation { get; set; }

        [DisplayName(nameof(ResetToken))]
        public string ResetToken { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<ChangePasswordViewModel>>();
            if (Password != PasswordConfirmation)
            {
                yield return new ValidationResult(S["The new password and confirmation password do not match."], new[] { nameof(PasswordConfirmation) });
            }
        }
    }
}
