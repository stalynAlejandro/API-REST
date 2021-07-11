using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.Core.ModelBinding
{
    public class IsUtcDateTimeAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var date = value as DateTime?;
            if (date != null)
            {
                if (date.Value.Kind != DateTimeKind.Utc)
                {
                    return new ValidationResult(Resources.IsUtcDateTime_Invalid);
                }
            }
            return ValidationResult.Success;
        }
    }
}
