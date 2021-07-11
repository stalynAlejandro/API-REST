using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace KeTePongo.Core.Extensions
{
    public static class IServiceProviderExtensions
    {
        public static bool ValidateDataAnnotations(this IServiceProvider serviceProvider, Object objectToValidate, bool skipNullValuesValidation, Action<string, string> addError)
        {
            var validationCtx = new ValidationContext(objectToValidate, serviceProvider, null);
            var validationResults = new List<ValidationResult>();
            var isValid = Validator.TryValidateObject(objectToValidate, validationCtx, validationResults);
            if (!isValid)
            {
                foreach (var validationResult in validationResults)
                {
                    foreach (var memberName in validationResult.MemberNames)
                    {
                        addError(memberName, validationResult.ErrorMessage);
                    }
                }
            }
            return isValid;
        }
    }
}
