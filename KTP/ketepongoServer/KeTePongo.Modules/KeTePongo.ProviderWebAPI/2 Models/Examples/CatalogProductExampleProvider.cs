using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using Swashbuckle.AspNetCore.Filters;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models.Examples
{
    public class CatalogProductExampleProvider : IExamplesProvider<Abstractions.DTOs.ProviderCatalogProductDTOs.NewCatalogProductDTO>
    {
        public Abstractions.DTOs.ProviderCatalogProductDTOs.NewCatalogProductDTO GetExamples()
        {
            return new Abstractions.DTOs.ProviderCatalogProductDTOs.NewCatalogProductDTO()
            {
                Name = "Pollo campero frito",
                Description = "Pollo del campo sazonado",
                SectionIds = new List<int>() { 1, 2 },
                DisplayOrder = 1,
                IsHiddenInCarte = false,
                PVP = 7m
            };
        }
    }
}
