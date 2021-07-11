using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Data;
using KeTePongo.Core.DomainServices;
using KeTePongo.Core.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument
{
    public class ConsumptionBaseAppService<TEntity, TDtoInput, TDtoNewInput, TDtoProcessedInput, TDtoOutput, TDomainService> : DocumentAppService<IConsumerClaims, Consumption, TEntity, TDtoInput, TDtoNewInput, TDtoProcessedInput, TDtoOutput, TDomainService>
        where TEntity : class, ILocalIdEntity, IChangeVersion
        where TDtoInput : class
        where TDtoProcessedInput : class, ILocalIdEntity, INullableChangeVersion
        where TDtoOutput : class, ILocalIdEntity, INullableChangeVersion
        where TDtoNewInput : class
        where TDomainService : class, IDocumentEntityService<Consumption, TEntity>
    {
        public ConsumptionBaseAppService(ISession session, TDomainService domainService, LocalSessionFactory sessionFactory, IMapper mapper, ILogger logger, YesSqlActionExecutor yesSqlActionExecutor)
            : base(session, domainService, sessionFactory, mapper, logger, yesSqlActionExecutor) { }

        protected override async Task<Consumption> GetDocumentAsync(long documentOID, ISession session, Action<string, string> addError)
        {
            var document = await session.Query<Consumption, ConsumptionIndex>(i => i.OID == documentOID).FirstOrDefaultAsync();
            if (document == null)
            {
                addError("", $"documentOID {documentOID} doesn't exist");
                return null;
            }
            return document;
        }
        protected override Task<Consumption> GetDocumentFromUserAsync(IConsumerClaims user, ISession session)
        {
            return session.Query<Consumption, ConsumptionIndex>(i => i.ConsumerOID == user.ConsumerOID).FirstOrDefaultAsync();
        }
    }
}
