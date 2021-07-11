using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IERPProviderCatalogProductsAppService
    {
        Task UpdateERPProviderCatalogProductsAsync(ProviderClaimsPrincipal user, ERPProviderCatalogProductsDTO erpProviderCatalogProductsDTO, Action<string, string> addError);
        Task<IList<MostConsumedCatalogProductDTO>> UpdateERPMostConsumedCatalogProductsAsync(ProviderClaimsPrincipal user, IList<MostConsumedCatalogProductDTO> erpMostConsumedCatalogProductsDTO, Action<string, string> addError);
    }
}
