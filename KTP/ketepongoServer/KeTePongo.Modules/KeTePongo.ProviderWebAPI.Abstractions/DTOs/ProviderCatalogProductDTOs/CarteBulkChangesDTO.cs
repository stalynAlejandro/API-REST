using Fluid.Ast;
using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs
{
    public class CarteBulkChangesDTO
    {
        [Required]
        [EnumerableHasElements]
        public IList<CarteBulkOperationDTO> Operations { get; set; } = new List<CarteBulkOperationDTO>();
    }


    public class CarteBulkOperationDTO
    {
        public CarteBulkOperationDTO() { }
        public CarteBulkOperationDTO(Object obj)
        {
            DTOTypeName = obj.GetType().Name;
            DTO = JsonSerializer.Serialize(obj, new JsonSerializerOptions() { IgnoreNullValues = true});
        }

        [Required]
        public string DTOTypeName { get; set; }
        public string DTO { get; set; }
    }
}
