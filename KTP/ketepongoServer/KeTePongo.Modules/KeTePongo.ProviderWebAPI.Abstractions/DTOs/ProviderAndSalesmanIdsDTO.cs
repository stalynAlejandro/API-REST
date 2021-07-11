using KeTePongo.Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderAndSalesmanIdsDTO
    {
        public int ProviderId { get; set; }
        public int SalesmanId { get; set; }
    }
}
