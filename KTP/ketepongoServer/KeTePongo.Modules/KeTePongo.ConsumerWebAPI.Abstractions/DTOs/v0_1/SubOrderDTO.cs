using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class SubOrderDTO
    {
        [DisplayName(nameof(SubOrderId))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int SubOrderId { get; set; }

        [DisplayName(nameof(Provider))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public ProviderDTO Provider { get; set; }

        [DisplayName(nameof(UtcMinimumDeliveryDateTime))]
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        public DateTime? UtcMinimumDeliveryDateTime { get; set; }

        [DisplayName(nameof(Observation))]
        public string Observation { get; set; }

        [DisplayName(nameof(WasProcessed))]
        public bool? WasProcessed { get; set; }

        [DisplayName(nameof(ProviderOrderId))]
        public int? ProviderOrderId { get; set; }

        [DisplayName(nameof(WasEmailSentToProvider))]
        public bool? WasEmailSentToProvider { get; set; }

        [DisplayName(nameof(ProcessingError))]
        public string ProcessingError { get; set; }

        [DisplayName(nameof(OrderLines))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public List<OrderLineDTO> OrderLines { get; set; }
        [DisplayName(nameof(IsRemoved))]
        public bool IsRemoved { get; set; }
    }
}
