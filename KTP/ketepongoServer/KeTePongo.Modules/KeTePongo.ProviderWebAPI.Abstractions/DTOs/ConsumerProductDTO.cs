using KeTePongo.Core.Interfaces;
using KeTePongo.Core.ModelBinding;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public enum ProductSourceType { AddedManuallyByUser, AddedAsConsumptionByProvider }
    public class ConsumerProductDTO
    {
        [Required, Range(1, int.MaxValue)]
        public int Id { get; set; }
        [Required, StringLength(150)]
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int ProviderId { get; set; }
        public bool IsMappedToProviderProduct { get; set; }
        public int? ProviderProductId { get; set; }

        public string ProviderERPId { get; set; }
        public ProductSourceType SourceType { get; set; }
    }
}
