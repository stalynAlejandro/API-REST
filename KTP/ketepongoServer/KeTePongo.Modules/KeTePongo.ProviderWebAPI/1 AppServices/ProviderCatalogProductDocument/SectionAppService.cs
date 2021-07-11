using AutoMapper;
using KeTePongo.ProviderWebAPI.DomainServices.ProviderCatalogProductDocument;
using KeTePongo.Core.Data;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using Microsoft.Extensions.Logging;
using YesSql;

namespace KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument
{
    public class SectionAppService : ProviderCatalogProductBaseAppService<Section, UpdateSectionDTO, NewSectionDTO, SectionDTO, SectionDTO, SectionDomainService>, 
        ISectionAppService, ISectionInternalAppService
    {
        public SectionAppService(ISession session, 
            LocalSessionFactory sessionFactory, 
            IMapper mapper,
            ILogger<SectionAppService> logger,
            YesSqlActionExecutor yesSqlActionExecutor)
            : base(session, new SectionDomainService(), sessionFactory, mapper, logger, yesSqlActionExecutor) {}
    }
}
