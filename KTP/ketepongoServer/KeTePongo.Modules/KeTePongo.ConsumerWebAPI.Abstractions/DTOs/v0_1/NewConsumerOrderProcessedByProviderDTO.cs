using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class NewConsumerOrderProcessedByProviderDTO
    {

        [DisplayName(nameof(OrderOID))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, long.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OrderOID { get; set; }

        [DisplayName(nameof(HasErrors))]
        public bool HasErrors { get; set; }

        [DisplayName(nameof(SubOrdersProcessingStatus))]
        public List<SubOrderProcessingProviderStatusDTO> SubOrdersProcessingStatus { get; set; }
    }
}
