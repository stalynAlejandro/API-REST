using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class NewConsumerOrderCreatedDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OID { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public string UserName { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ConsumerInfoAtOrderDTO ConsumerInfoWhenOrderWasSubmitted;
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public DateTime UtcDateTime { get; set; }
        public List<ConsumerSubOrderDTO> SubOrders { get; set; }
    }
}
