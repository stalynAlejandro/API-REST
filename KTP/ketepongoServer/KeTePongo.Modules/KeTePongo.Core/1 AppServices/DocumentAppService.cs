using AutoMapper;
using KeTePongo.Core.Data;
using KeTePongo.Core.DomainServices;
using KeTePongo.Core.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.Core.AppServices
{
    public abstract class DocumentAppService<TUserClaims,TDocument, TEntity, TDtoInput, TDtoNewInput, TDtoProcessedInput, TDtoOutput, TDomainService> 
        : IDocumentAppService<TUserClaims, TDtoInput, TDtoNewInput, TDtoOutput>, 
          IDocumentInternalAppService<TUserClaims, TDtoInput, TDtoNewInput, TDocument, TEntity>

        where TUserClaims : class
        where TDocument : class, IOIDEntity, IChangeVersion
        where TEntity : class, ILocalIdEntity, IChangeVersion
        where TDtoInput : class
        where TDtoProcessedInput : class, ILocalIdEntity, INullableChangeVersion
        where TDtoOutput : class, ILocalIdEntity, INullableChangeVersion
        where TDtoNewInput : class
        where TDomainService : class, IDocumentEntityService<TDocument, TEntity>
    {
        protected readonly TDomainService _domainService;
        private readonly LocalSessionFactory _sessionFactory;
        private readonly IMapper _mapper;
        private readonly ILogger _logger;
        private readonly ISession _session;
        private readonly YesSqlActionExecutor _yesSqlActionExecutor;

        public DocumentAppService(ISession session, 
            TDomainService domainService, 
            LocalSessionFactory sessionFactory, 
            IMapper mapper, 
            ILogger logger,
            YesSqlActionExecutor yesSqlActionExecutor)
        {
            _domainService = domainService;
            _sessionFactory = sessionFactory;
            _mapper = mapper;
            _logger = logger;
            _session = session;
            _yesSqlActionExecutor = yesSqlActionExecutor;
        }
        abstract protected Task<TDocument> GetDocumentFromUserAsync(TUserClaims user, ISession session);
        abstract protected Task<TDocument> GetDocumentAsync(long documentOID, ISession session, Action<string, string> addError);
        virtual protected Task<IList<TDtoProcessedInput>> PreProcessAddAsync(TUserClaims user, IList<TDtoNewInput> newDtos, Action<string, string> addError)
        {
            return Task.FromResult(_mapper.Map<IList<TDtoNewInput>, IList<TDtoProcessedInput>>(newDtos));
        }

        virtual protected Task<TDtoProcessedInput> PreProcessUpdateAsync(TUserClaims user, TDtoInput dto, Action<string, string> addError)
        {
            return Task.FromResult(_mapper.Map<TDtoInput, TDtoProcessedInput>(dto));
        }
        private Task<TDocument> GetDocumentFromUserAsync(TUserClaims user)
        {
            return GetDocumentFromUserAsync(user, _session);
        }
        virtual public Task OnAddSuccessAsync(TUserClaims user,TDocument document, IList<TEntity> newEntities, Action<string, string> addError)
        {
            return Task.FromResult(newEntities);
        }
        virtual public Task<TEntity> OnUpdateSuccessAsync(TUserClaims user, TDtoInput dto, TDocument document, TEntity updatedEntity, Action<string, string> addError)
        {
            return Task.FromResult(updatedEntity);
        }
        virtual public Task OnDeleteSuccessAsync(TUserClaims user, TDocument document, TEntity removedEntity, Action<string, string> addError)
        {
            return Task.FromResult(removedEntity);
        }
        virtual public Task OnDeleteSuccessAsync(TDocument document, TEntity removedEntity, Action<string, string> addError)
        {
            return Task.FromResult(removedEntity);
        }
        public async Task<TDtoOutput> GetAsync(TUserClaims user, int entityId, Action<string, string> addError)
        {
            var document = await GetDocumentFromUserAsync(user);
            return Get(document, entityId, addError);
        }
        public async Task<TDtoOutput> GetAsync(TUserClaims user, long documentOID, int entityId, Action<string, string> addError)
        {
            var document = await GetDocumentAsync(documentOID, _session, addError);
            return Get(document, entityId, addError);
        }
        private TDtoOutput Get(TDocument document, int entityId, Action<string, string> addError)
        {
            var result = _domainService.GetEntity(document, entityId, addError);
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<TEntity, TDtoOutput>(result);
        }
        public async Task<IList<TDtoOutput>> GetRangeAsync(TUserClaims user, int[] entityIds, Action<string, string> addError)
        {
            var document = await GetDocumentFromUserAsync(user);
            return GetRange(user, entityIds, addError, document);
        }
        public async Task<IList<TDtoOutput>> GetRangeAsync(TUserClaims user, long documentOID, int[] entityIds, Action<string, string> addError)
        {
            var document = await GetDocumentAsync(documentOID, _session, addError);
            return GetRange(user, entityIds, addError, document);
        }
        private IList<TDtoOutput> GetRange(TUserClaims user, int[] entityIds, Action<string, string> addError, TDocument document)
        {
            if (document == null)
                return null;
            var result = _domainService.GetRange(document, entityIds, addError);
            return _mapper.Map<IList<TEntity>, IList<TDtoOutput>>(result);
        }
        public async Task<IList<TDtoOutput>> GetAllAsync(TUserClaims user, Action<string, string> addError)
        {
            var document = await GetDocumentFromUserAsync(user);
            return GetAll(document, addError);
        }
        public async Task<IList<TDtoOutput>> GetAllAsync(TUserClaims user, long documentOID, Action<string, string> addError)
        {
            var document = await GetDocumentAsync(documentOID, _session, addError);
            return GetAll(document, addError);
        }
        private IList<TDtoOutput> GetAll(TDocument document, Action<string, string> addError)
        {
            if (document == null)
            {
                return null;
            }
            var result = _domainService.GetAllEntitiesFromDocument(document, addError);
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<IList<TEntity>, IList<TDtoOutput>>(result);
        }

        public async Task<TDtoOutput> AddAsync(TUserClaims user, TDtoNewInput newDto, Action<string, string> addError)
        {
            var result = await AddRangeAsync(user, null, new TDtoNewInput[] { newDto }, addError);
            return result!=null ? result.FirstOrDefault() : null;
        }
        public async Task<TDtoOutput> AddAsync(TUserClaims user, long documentOID, TDtoNewInput newDto, Action<string, string> addError)
        {
            var result = await AddRangeAsync(user, documentOID, new List<TDtoNewInput> { newDto }, addError);
            return result != null ? result.FirstOrDefault() : null;
        }
        public Task<IList<TDtoOutput>> AddRangeAsync(TUserClaims user, long documentOID, IList<TDtoNewInput> newDtos, Action<string, string> addError)
        {
            return AddRangeAsync(user, documentOID, newDtos, addError);
        }
        public Task<IList<TDtoOutput>> AddRangeAsync(TUserClaims user, IList<TDtoNewInput> newDtos, Action<string, string> addError)
        {
            return AddRangeAsync(user, null, newDtos, addError);
        }
        public Task<IList<TDtoOutput>> AddRangeAsync(TUserClaims user, long? documentOID, IList<TDtoNewInput> newDtos, Action<string, string> addError)
        {
            Func<Task<IList<TDtoOutput>>> asyncAction = () => AddRangeInternalAsync(user, documentOID, newDtos, addError);
            return _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(asyncAction);
        }
        private async Task<IList<TDtoOutput>> AddRangeInternalAsync(TUserClaims user, long? documentOID, IList<TDtoNewInput> newDtos, Action<string, string> addError)
        {
            var newEntities = await GetNewEntitiesAsync(user, newDtos, addError);
            var processedEntities = new List<TEntity>();
            TDocument document;
            using (var session = _sessionFactory.CreateSession())
            {
                try
                {
                    if (documentOID.HasValue)
                    {
                        document = await GetDocumentAsync(documentOID.Value, session, addError);
                    }
                    else
                    {
                        document = await GetDocumentFromUserAsync(user, session);
                    }
                    processedEntities = AddToDocument(document, newEntities, addError).ToList();
                    if (!processedEntities.Any())
                    {
                        return null;
                    }
                    document.ChangeVersion++;
                    session.Save(document, checkConcurrency: true);
                    await session.CommitAsync();
                }
                catch (Exception)
                {
                    session.Cancel();
                    throw;
                }
            }
            
            await OnAddSuccessAsync(user, document, processedEntities, addError);
            return _mapper.Map<IEnumerable<TEntity>, IList<TDtoOutput>>(processedEntities);
        }
        public async Task<IEnumerable<TEntity>> GetNewEntitiesAsync(TUserClaims user, IList<TDtoNewInput> newDtos, Action<string,string> addError)
        {
            var processedDtos = await PreProcessAddAsync(user, newDtos, addError);
            if (processedDtos == null)
                return null;

            return _mapper.Map<IEnumerable<TDtoProcessedInput>, IEnumerable<TEntity>>(processedDtos);
        }
        public IEnumerable<TEntity> AddToDocument(TDocument document, IEnumerable<TEntity> newEntities, Action<string, string> addError)
        {
            foreach (var newEntity in newEntities)
            {
                TEntity processedEntity;
                processedEntity = _domainService.Add(document, newEntity, addError);
                if (processedEntity == null)
                {
                    continue;
                }
                yield return processedEntity;
            }
        }
        public async Task AddEntityToDocumentAsync(TUserClaims user, TDtoNewInput dto, TDocument document, Action<string, string> addError)
        {
            var entities = await GetNewEntitiesAsync(user, new[] { dto }, addError);
            var processedEntitites = AddToDocument(document, entities, addError).ToList();
            await OnAddSuccessAsync(user, document, processedEntitites, addError);
        }
        public Task<TDtoOutput> UpdateAsync(TUserClaims user, TDtoInput dto, Action<string, string> addError)
        {
            return UpdateAsync(user, null, dto, addError);
        }
        public Task<TDtoOutput> UpdateAsync(TUserClaims user, long documentOID, TDtoInput dto, Action<string, string> addError)
        {
            return UpdateAsync(user, documentOID, dto, addError);
        }
        public Task<TDtoOutput> UpdateAsync(TUserClaims user, long? documentOID, TDtoInput dto, Action<string, string> addError)
        {
            Func<Task<TDtoOutput>> asyncAction = () => UpdateInternalAsync(user, documentOID, dto, addError);
            return _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(asyncAction);
        }

        private async Task<TDtoOutput> UpdateInternalAsync(TUserClaims user, long? documentOID, TDtoInput dto, Action<string, string> addError)
        {
            var dtoProcessed = await GetProcessedUpdateDtoAsync(user, dto, addError);
            if (dtoProcessed == null)
            {
                return null;
            }

            TEntity result;
            TDocument document;
            using (var session = _sessionFactory.CreateSession(System.Data.IsolationLevel.ReadCommitted))
            {
                if (documentOID.HasValue)
                {
                    document = await GetDocumentAsync(documentOID.Value, session, addError);
                }
                else
                {
                    document = await GetDocumentFromUserAsync(user, session);
                }
                if (document == null)
                {
                    addError("Id", "Data was not found");
                    return null;
                }
                result = UpdateAtDocument(document, dtoProcessed, addError);
                if (result == null)
                {
                    return null;
                }
                document.ChangeVersion++;
                session.Save(document, checkConcurrency: true);
            }
            result = await OnUpdateSuccessAsync(user, dto, document, result, addError);
            return _mapper.Map<TEntity, TDtoOutput>(result);
        }
        private TEntity UpdateAtDocument(TDocument document, TDtoProcessedInput dtoProcessed, Action<string, string> addError)
        {
            var entity = _domainService.GetEntity(document, dtoProcessed.Id, addError);
            if (entity == null)
            {
                addError("Id", "Data was not found");
                return null;
            }
            var updatedEntity = _mapper.Map<TDtoProcessedInput, TEntity>(dtoProcessed, entity);
            return _domainService.Update(document, updatedEntity, dtoProcessed.ChangeVersion, addError);
        }
        private async Task<TDtoProcessedInput> GetProcessedUpdateDtoAsync(TUserClaims user, TDtoInput dto, Action<string, string> addError)
        {
            var dtoProcessed = await PreProcessUpdateAsync(user, dto, addError);
            if (dtoProcessed == null)
                return null;

            if (dtoProcessed.Id == 0)
            {
                addError("Id", "Update operation doesn't accept an entity with Id equal to 0");
                return null;
            }
            return dtoProcessed;
        }
        public async Task UpdateEntityAtDocumentAsync(TUserClaims user, TDtoInput dto, TDocument document, Action<string, string> addError)
        {
            var dtoProcessed = await GetProcessedUpdateDtoAsync(user, dto, addError);
            var result = UpdateAtDocument(document, dtoProcessed, addError);
            await OnUpdateSuccessAsync(user, dto, document, result, addError);
        }
        
        public Task<bool> RemoveAsync(TUserClaims user, int entityId, int? changeVersion, Action<string, string> addError)
        {
            Func<Task<bool>> asyncAction = () => RemoveInternalAsync(user, entityId, changeVersion, addError);
            return _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(asyncAction);
        }
        public Task<bool> RemoveAsync(long documentOID, int entityId, int? changeVersion, Action<string, string> addError)
        {
            Func<Task<bool>> asyncAction = () => RemoveInternalAsync(documentOID, entityId, changeVersion, addError);
            return _yesSqlActionExecutor.RetryActionIfConcurrencyExceptionAsync(asyncAction);
        }
        private async Task<bool> RemoveInternalAsync(TUserClaims user, int entityId, int? changeVersion, Action<string, string> addError)
        {
            TEntity entity;
            TDocument document;
            using (var session = _sessionFactory.CreateSession())
            {
                document = await GetDocumentFromUserAsync(user, session);
                entity = RemoveAtDocument(document, entityId, changeVersion, addError);
                if (entity == null)
                {
                    return false;
                }
                document.ChangeVersion++;
                session.Save(document, checkConcurrency: true);
            }
            await OnDeleteSuccessAsync(user, document, entity, addError);
            return true;
        }
        private async Task<bool> RemoveInternalAsync(long documentOID, int entityId, int? changeVersion, Action<string, string> addError)
        {
            TEntity entity;
            TDocument document;
            using (var session = _sessionFactory.CreateSession())
            {
                document = await GetDocumentAsync(documentOID, session, addError);
                entity = RemoveAtDocument(document, entityId, changeVersion, addError);
                if (entity == null)
                {
                    return false;
                }
                document.ChangeVersion++;
                session.Save(document, checkConcurrency: true);
            }
            await OnDeleteSuccessAsync(document, entity, addError);
            return true;
        }

        private TEntity RemoveAtDocument(TDocument document, int entityId, int? changeVersion, Action<string, string> addError)
        {
            var entity = _domainService.GetEntity(document, entityId, addError);
            if (entity==null)
            {
                return null;
            }
            if (!_domainService.Remove(document, entityId, changeVersion, addError))
            {
                return null;
            }
            return entity;
        }
        public async Task<TEntity> RemoveEntityAtDocumentAsync(TUserClaims user, TDocument document, int entityId, int? changeVersion, Action<string, string> addError)
        {
            var entity = RemoveAtDocument(document, entityId, changeVersion, addError);
            if (entity == null)
            {
                return null;
            }
            await OnDeleteSuccessAsync(user, document, entity, addError);
            return entity;
        }
    }
}
