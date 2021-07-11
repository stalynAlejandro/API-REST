using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class NewConsumerOrderDTO
    {
        [DisplayName(nameof(SubOrders))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public List<NewSubOrderDTO> SubOrders { get; set; }
    }
    public class NewSubOrderDTO
    {
        [DisplayName(nameof(SubOrderId))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int SubOrderId { get; set; }

        [DisplayName(nameof(ProviderId))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ProviderId { get; set; }

        [DisplayName(nameof(UtcMinimumDeliveryDateTime))]
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        public DateTime? UtcMinimumDeliveryDateTime { get; set; }

        [DisplayName(nameof(Observation))]
        public string Observation { get; set; }

        [DisplayName(nameof(OrderLines))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public List<NewConsumerOrderLineDTO> OrderLines { get; set; }
    }
    public class NewConsumerOrderLineDTO
    {
        [DisplayName(nameof(ProductId))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ProductId { get; set; }

        [DisplayName(nameof(Quantity))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Quantity { get; set; }

        [DisplayName(nameof(Observation))]
        public string Observation { get; set; }
    }
    public class ConsumerOrderDTO 
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, long.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OID { get; set; }

        [DisplayName(nameof(UserName))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public string UserName { get; set; }

        [DisplayName(nameof(ConsumerOID))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, long.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long ConsumerOID { get; set; }

        [DisplayName(nameof(UtcDateTime))]
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public DateTime UtcDateTime { get; set; }

        [DisplayName(nameof(HasErrors))]
        public bool HasErrors { get; set; }

        [DisplayName(nameof(SubOrders))]
        public List<SubOrderDTO> SubOrders { get; set; }
    }

}
