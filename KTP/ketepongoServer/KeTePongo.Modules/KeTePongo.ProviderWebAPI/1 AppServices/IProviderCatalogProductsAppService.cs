using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IProviderCatalogProductsAppService
    {
        Task<IList<ProviderCatalogProductsDTO>> GetProviderCatalogProductsAsync();
        Task<ProviderCatalogProductsDTO> GetAsync(ProviderClaimsPrincipal user, int? changeVersion);
        Task<ProviderCatalogProductsDTO> GetProviderCatalogProductsByCompanyCodeAsync(string consumerCode, int? changeVersion, Action<string, string> addError);
        Task<ProviderCatalogProductsDTO> GetProviderCatalogProductsByProviderOIDAsync(long consumerOID, long providerOID, int? changeVersion, Action<string, string> addError);
        Task AddProviderCatalogProductsAsync(ProviderDTO providerDTO);
        Task UpdateProviderCatalogProductsAsync(ProviderDTO providerDTO);
        Task RemoveProviderCatalogProductsAsync(long companyOID);
        Task ApplyBulkChangesProviderCatalogProductsAsync(ProviderClaimsPrincipal user, CarteBulkChangesDTO carteBulkChanges, Action<string, string> addError);
        Task UpdateConsumerOIDAsync(long providerOID, long consumerOID, Action<string, string> addError);
    }
}
