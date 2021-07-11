using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ConsumerSubOrderDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int SubOrderId { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public ProviderInfoAtOrderDTO ProviderInfoWhenOrderWasSubmitted { get; set; }
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        public DateTime? UtcMinimumDeliveryDateTime { get; set; }
        public string Observation { get; set; }
        public bool? WasProcessed { get; set; }
        public int? ProviderOrderId { get; set; }
        public bool? WasEmailSentToProvider { get; set; }
        public string ProcessingError { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public List<ConsumerOrderLineDTO> OrderLines { get; set; }
    }
}
