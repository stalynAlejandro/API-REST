using KeTePongo.Core.AppServices;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;

namespace KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument
{
    public interface ICatalogProductAppService : IDocumentAppService<IProviderClaims, UpdateCatalogProductDTO, NewCatalogProductDTO, CatalogProductDTO> { }
    public interface ICatalogProductInternalAppService : IDocumentInternalAppService<IProviderClaims, UpdateCatalogProductDTO, NewCatalogProductDTO, ProviderCatalogProducts, CatalogProduct> { }

}
