using AutoMapper;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Data;
using KeTePongo.Core.DomainServices;
using KeTePongo.Core.Interfaces;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Indexes;
using KeTePongo.ProviderWebAPI.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument
{
    public class ProviderCatalogProductBaseAppService<TEntity, TDtoInput, TDtoNewInput, TDtoProcessedInput, TDtoOutput, TDomainService> : DocumentAppService<IProviderClaims, ProviderCatalogProducts, TEntity, TDtoInput, TDtoNewInput, TDtoProcessedInput, TDtoOutput, TDomainService>
        where TEntity : class, ILocalIdEntity, IChangeVersion
        where TDtoInput : class
        where TDtoProcessedInput : class, ILocalIdEntity, INullableChangeVersion
        where TDtoOutput : class, ILocalIdEntity, INullableChangeVersion
        where TDtoNewInput : class
        where TDomainService : class, IDocumentEntityService<ProviderCatalogProducts, TEntity>
    {
        public ProviderCatalogProductBaseAppService(ISession session, TDomainService domainService, LocalSessionFactory sessionFactory, IMapper mapper, ILogger logger, YesSqlActionExecutor yesSqlActionExecutor)
            : base(session, domainService, sessionFactory, mapper, logger, yesSqlActionExecutor) { }

        protected override async Task<ProviderCatalogProducts> GetDocumentAsync(long documentOID, ISession session, Action<string, string> addError)
        {
            var document = await session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.OID == documentOID).FirstOrDefaultAsync();
            if (document == null)
            {
                addError("", $"documentOID {documentOID} doesn't exist");
                return null;
            }
            return document;
        }
        protected override Task<ProviderCatalogProducts> GetDocumentFromUserAsync(IProviderClaims user, ISession session)
        {
            return session.Query<ProviderCatalogProducts, ProviderCatalogProductsIndex>(i => i.ProviderOID == user.ProviderOID).FirstOrDefaultAsync();
        }
    }
}
