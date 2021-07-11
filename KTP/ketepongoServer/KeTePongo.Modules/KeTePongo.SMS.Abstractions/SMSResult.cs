using System.Collections.Generic;
using Microsoft.Extensions.Localization;

namespace KeTePongo.SMS.Abstractions
{
    /// Represents the result of sending an sms.
    /// </summary>
    public class SMSResult
    /// <summary>
    {
        /// <summary>
        /// Returns an <see cref="SMSResult"/>indicating a successful Sms operation.
        /// </summary>
        public static SMSResult Success { get; } = new SMSResult { IsSucceded = true };

        /// <summary>
        /// An <see cref="IEnumerable{LocalizedString}"/> containing an errors that occurred during the Sms operation.
        /// </summary>
        public IEnumerable<LocalizedString> Errors { get; protected set; }

        /// <summary>
        /// Whether if the operation succeeded or not.
        /// </summary>
        public bool IsSucceded { get; protected set; }

        /// <summary>
        /// Creates an <see cref="SmsResult"/> indicating a failed Sms operation, with a list of errors if applicable.
        /// </summary>
        /// <param name="errors">An optional array of <see cref="LocalizedString"/> which caused the operation to fail.</param>
        public static SMSResult Failed(params LocalizedString[] errors) => new SMSResult { IsSucceded = false, Errors = errors };
    }
}
