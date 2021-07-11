using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class SubOrderProcessingProviderStatusDTO
    {
        [DisplayName(nameof(SubOrderId))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int SubOrderId { get; set; }

        [DisplayName(nameof(ProviderOrderOID))]
        public long? ProviderOrderOID { get; set; }

        [DisplayName(nameof(WasProcessed))]
        public bool? WasProcessed { get; set; }

        [DisplayName(nameof(WasEmailSentToProvider))]
        public bool? WasEmailSentToProvider { get; set; }

        [DisplayName(nameof(ProcessingError))]
        public string ProcessingError { get; set; }
    }
}
