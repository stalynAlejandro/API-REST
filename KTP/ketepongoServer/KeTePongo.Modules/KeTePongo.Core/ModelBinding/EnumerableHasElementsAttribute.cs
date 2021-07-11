using System;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.Collections;

namespace KeTePongo.Core.ModelBinding
{
    public class EnumerableHasElementsAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(object enumerable, ValidationContext validationContext)
        {
            var myEnumerable = enumerable as IEnumerable;

            if (myEnumerable == null)
            {
                return new ValidationResult(Resources.EnumerableHasElements_Invalid);
            }
            var enumerator = myEnumerable.GetEnumerator();
            if(!enumerator.MoveNext())
            {
                return new ValidationResult(Resources.EnumerableHasElements_Invalid);
            }
            return ValidationResult.Success;
        }
    }
}
