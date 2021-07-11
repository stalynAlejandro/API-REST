using KeTePongo.Core.AppServices;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;

namespace KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument
{
    public interface ISectionAppService : IDocumentAppService<IProviderClaims, UpdateSectionDTO, NewSectionDTO, SectionDTO> { }
    public interface ISectionInternalAppService : IDocumentInternalAppService<IProviderClaims, UpdateSectionDTO, NewSectionDTO, ProviderCatalogProducts, Section> { }
}
