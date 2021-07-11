using KeTePongo.Core.ModelBinding;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderOrderDTO : NewProviderOrderDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Id { get; set; }
        [Range(0, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int? ChangeVersion { get; set; }
        public bool WasEmailSent { get; set; }
        public bool IsRemoved { get; set; }
    }
    public class NewProviderOrderDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long ConsumerOrderOID { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ConsumerSubOrderId { get; set; }

        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public string SalesmanUserName { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public string ConsumerUserName { get; set; }
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public DateTime UtcDateTime { get; set; }
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        public DateTime? UtcMinimumDeliveryDateTime { get; set; }
        public string Observation { get; set; }
        public bool HasAllProductsMappedToProvider { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ProviderInfoAtOrderDTO ProviderInfoWhenOrderWasSubmitted { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ConsumerInfoAtOrderDTO ConsumerInfoWhenOrderWasSubmitted { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public List<ProviderOrderLineDTO> OrderLines { get; set; }
    }
    public class ProviderOrderLineDTO
    {
        public CatalogProductDTO ProviderProduct { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ConsumerProductDTO ConsumerProduct { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int Quantity { get; set; }
        public string Observation { get; set; }
    }
}
