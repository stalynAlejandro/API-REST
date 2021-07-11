using System;
using System.ComponentModel;


namespace System.ComponentModel.DataAnnotations
{
  public partial class Resources
  {
     public const String CustomValidationAttribute_ValidationError = "{0} is not valid.";
     public const String RangeAttribute_ValidationError = "The field {0} must be between {1} and {2}.";
     public const String RegexAttribute_ValidationError = "The field {0} must match the regular expression '{1}'.";
     public const String RequiredAttribute_ValidationError = "The {0} field is required.";
     public const String StringLengthAttribute_ValidationError = "The field {0} must be a string with a maximum length of {1}.";
     public const String ValidationAttribute_ValidationError = "The field {0} is invalid.";
     public const String CreditCardAttribute_Invalid = "The {0} field is not a valid credit card number.";
     public const String EmailAddressAttribute_Invalid = "The {0} field is not a valid e-mail address.";
     public const String FileExtensionsAttribute_Invalid = "The {0} field only accepts files with the following extensions: {1}";
     public const String UrlAttribute_Invalid = "The {0} field is not a valid fully-qualified http, https, or ftp URL.";
     public const String PhoneAttribute_Invalid = "The {0} field is not a valid phone number.";
     public const String MaxLengthAttribute_ValidationError = "The field {0} must be a string or array type with a maximum length of '{1}'.";
     public const String MinLengthAttribute_ValidationError = "The field {0} must be a string or array type with a minimum length of '{1}'.";
    }
}