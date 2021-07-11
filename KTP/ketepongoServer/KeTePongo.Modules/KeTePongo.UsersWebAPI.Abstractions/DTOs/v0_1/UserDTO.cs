using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

namespace KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1
{
    public enum UserType { ConsumerUser, ProviderUser }
    public class NewUserBackOfficeDTO : NewUserDTO
    {
        public long ConsumerOID { get; set; }
        public long ProviderOID { get; set; }
    }
    public class NewUserDTO : UserDTO 
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(20, MinimumLength = 6, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Password { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public UserType UserType { get; set; }
    }
    public class UserDTO 
    {
        public int Id { get; set; }
        [DisplayName(nameof(Name))]
        public string Name { get; set; }
        [DisplayName(nameof(UserName))]
        public string UserName { get; set; }
        [DisplayName(nameof(Email))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(255, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public string Email { get; set; }
        [DisplayName(nameof(EmailConfirmed))]
        public bool EmailConfirmed { get; set; }
        public UserPhoneDTO UserPhone { get; set; }
    }

    public class UserPhoneDTO
    {
        public bool IsPhoneConfirmed { get; set; }
        public string PhoneNumber { get; set; }
        public string NewPhoneNumberRequested { get; set; }
        public string TwoFactorPhoneConfirmationCode { get; set; }
    }

    public class UpdatedUserDTO 
    {
        [DisplayName(nameof(Name))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(70, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        public string Name { get; set; }
    }

    public class UpdatedEmailDTO
    {
        [DisplayName(nameof(NewEmail))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [StringLength(255, ErrorMessage = Resources.StringLengthAttribute_ValidationError)]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public string NewEmail { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<UpdatedEmailDTO>>();
            if (string.IsNullOrWhiteSpace(NewEmail))
            {
                yield return new ValidationResult(S["Code is required."], new[] { nameof(NewEmail) });
            }
        }
    }
    public class UpdatedPhoneDTO { 
       public string NewPhone { get; set; }
    }
    public class ConfirmEmailChangeDTO : IValidatableObject
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Code { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<ConfirmEmailChangeDTO>>();
            if (string.IsNullOrWhiteSpace(Code))
            {
                yield return new ValidationResult(S["Code is required."], new[] { nameof(Code) });
            }
        }
    }

    public class ConfirmPhoneChangeDTO : IValidatableObject 
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Code { get; set; }
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<ConfirmPhoneChangeDTO>>();
            if (string.IsNullOrWhiteSpace(Code))
            {
                yield return new ValidationResult(S["Code is required."], new[] { nameof(Code) });
            }
        }
    }
}
