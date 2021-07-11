using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

namespace KeTePongo.SMS.Abstractions
{
    public class SMSSettings : IValidatableObject
    {
        /// <summary>
        /// Gets or sets the default sender SMS.
        /// </summary>
        [Required(AllowEmptyStrings = false)]
        public string Sender { get; set; } = "KeTePongo";

        /// <summary>
        /// Gets or sets the sms delivery method.
        /// </summary>
        [Required]
        public SmsDeliveryMethod DeliveryMethod { get; set; } = SmsDeliveryMethod.SpecifiedPickupDirectory;

        /// <summary>
        /// Gets or sets the sms directory, this used for <see cref="SmsDeliveryMethod.SpecifiedPickupDirectory"/> option.
        /// </summary>
        public string PickupDirectoryLocation { get; set; } = "C:\\temp\\Sms";

        /// <summary>
        /// Gets or sets the API_KEY. This will allow access to the external API.
        /// </summary>
        public string API_KEY { get; set; } = "none";

        /// <summary>
        /// If this is enabled, the external API will check if its a valid number, this used for <see cref="SmsDeliveryMethod.SmsUp"/> option
        /// </summary>
        public bool IsLookupEnabled { get; set; } = false;

        /// <inheritdocs />
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            var S = validationContext.GetService<IStringLocalizer<SMSSettings>>();

            switch (DeliveryMethod)
            {
                case SmsDeliveryMethod.SmsUp:
                    if (String.IsNullOrEmpty(API_KEY))
                    {
                        yield return new ValidationResult(S["The {0} field is required.", "Receiver phone number"], new[] { nameof(API_KEY) });
                    }
                    break;
                case SmsDeliveryMethod.SpecifiedPickupDirectory:
                    if (String.IsNullOrEmpty(PickupDirectoryLocation))
                    {
                        yield return new ValidationResult(S["The {0} field is required.", "Pickup directory location"], new[] { nameof(PickupDirectoryLocation) });
                    }
                    break;
                default:
                    throw new NotSupportedException(S["The '{0}' delivery method is not supported.", DeliveryMethod]);
            }
        }
    }
}
