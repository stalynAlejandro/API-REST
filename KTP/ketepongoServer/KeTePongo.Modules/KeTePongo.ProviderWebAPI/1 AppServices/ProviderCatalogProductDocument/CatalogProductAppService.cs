using AutoMapper;
using KeTePongo.Core.Data;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.DomainServices.ProviderCatalogProductDocument;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using YesSql;

namespace KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument
{
    public class CatalogProductAppService : ProviderCatalogProductBaseAppService<CatalogProduct, UpdateCatalogProductDTO, NewCatalogProductDTO, CatalogProductDTO, CatalogProductDTO, CatalogProductDomainService>
        , ICatalogProductAppService, ICatalogProductInternalAppService
    {
        public CatalogProductAppService(ISession session,
                                LocalSessionFactory sessionFactory, 
                                IMapper mapper, 
                                ILogger<CatalogProductAppService> logger,
                                IStringLocalizer<CatalogProductDomainService> localizer, 
                                YesSqlActionExecutor yesSqlActionExecutor) 
            : base(session, new CatalogProductDomainService(localizer), sessionFactory, mapper, logger, yesSqlActionExecutor) {
        }
    }
}
