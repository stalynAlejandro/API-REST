using KeTePongo.Core.Data;
using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using YesSql.Indexes;

namespace KeTePongo.Core.DomainServices
{
    public abstract class DocumentEntityService<TDocument, TEntity> : IDocumentEntityService<TDocument, TEntity> 
        where TDocument : class, IOIDEntity, IChangeVersion
        where TEntity : class, ILocalIdEntity, IChangeVersion
    {
        abstract public IList<TEntity> GetAllEntitiesFromDocument(TDocument document);
        abstract protected int GetAndIncrementEntityCounter(TDocument document);
        abstract protected TEntity AddEntityToDocument(TDocument document, TEntity entity);
        abstract protected bool RemoveEntityFromDocument(TDocument document, TEntity entity);
        virtual public bool ValidateEntity(TDocument document, TEntity entity, Action<string, string> addError)
        {
            if (AnyRepeatedEntity(document))
            {
                addError($"{nameof(ILocalIdEntity.Id)}", "An entity cannot be created with same id twice");
                return false;
            }
            return true;
        }
        private bool AnyRepeatedEntity(TDocument document)
        {
            return GetAllEntitiesFromDocument(document).Count != GetAllEntitiesFromDocument(document).Select(a => a.Id).Distinct().Count();
        }
        public TEntity GetEntity(TDocument document, int entityId, Action<string, string> addError)
        {
            var entities = GetAllEntitiesFromDocument(document);
            if (entities == null)
            {
                addError("", $"{typeof(TEntity).Name} doesn't exist with Id {entityId}");
                return null;
            }
            return GetEntity(entities, entityId, addError);
        }
        internal TEntity GetEntity(IList<TEntity> entities, int entityId, Action<string, string> addError)
        {
            if (entities == null)
            {
                return null;
            }
            var result = entities.FirstOrDefault(e => e.Id == entityId);
            return result;
        }

        public IList<TEntity> GetRange(TDocument document, int[] entityIds, Action<string, string> addError)
        {
            var entities = GetAllEntitiesFromDocument(document);
            if (entities == null)
            {
                return null;
            }
            var result = entities.Where(e => entityIds.Contains(e.Id)).ToList();
            if (entityIds.Length != result.Count)
            {
                var notFoundEntities = string.Join(",", entityIds.Except(result.Select(r => r.Id)));
                addError("", $"These {typeof(TEntity).Name} ids were not found: {notFoundEntities}");
                return null;
            }
            return entityIds.Join(result, id=>id, e => e.Id, (id,e)=>e).ToList() as IList<TEntity>;
        }

        public IList<TEntity> GetAllEntitiesFromDocument(TDocument document, Action<string, string> addError)
        {
            if (document == null)
                return null;
            return GetAllEntitiesFromDocument(document);
        }
        public TEntity Add(TDocument document, TEntity newEntity, Action<string, string> addError)
        {
            newEntity.Id = GetAndIncrementEntityCounter(document);
            newEntity.ChangeVersion = 0;
            AddEntityToDocument(document, newEntity);

            if (!ValidateEntity(document, newEntity, addError))
            {
                return null;
            }

            return newEntity;
        }

        public TEntity Update(TDocument document, TEntity updatedEntity, int? changeVersion, Action<string, string> addError)
        {
            if (document == null)
            {
                addError("", $"A {nameof(TDocument)} was not found for this operation");
                return null;
            }
            var entities = GetAllEntitiesFromDocument(document);
            var oldEntity = entities.First(e => e.Id == updatedEntity.Id);
            var indexToUpdate = entities.IndexOf(oldEntity);
            if (indexToUpdate == -1)
            {
                addError("Id", $"There is not exist an entity with Id {updatedEntity.Id}");
                return null;
            }
            if ((changeVersion.HasValue && oldEntity.ChangeVersion != changeVersion))
            {
                var andVersionText = changeVersion.HasValue ? $"and version {changeVersion.Value}" : "";
                addError("Id", $"An entity with Id {updatedEntity.Id} {andVersionText} doesn't exist");
                return null;
            }
            updatedEntity.ChangeVersion = oldEntity.ChangeVersion + 1;
            entities[indexToUpdate] = updatedEntity;
            if (!ValidateEntity(document, updatedEntity, addError))
            {
                return null;
            }
            return updatedEntity;
        }
        public bool Remove(TDocument document, int entityId, int? changeVersion, Action<string, string> addError)
        {
            if (document == null)
            {
                addError("", $"A {nameof(TDocument)} was not found for this operation");
                return false;
            }
            var entityToRemove = GetAllEntitiesFromDocument(document).FirstOrDefault(e => e.Id == entityId);
            if (entityToRemove == null
                || (changeVersion.HasValue && entityToRemove.ChangeVersion != changeVersion.Value)
                || !RemoveEntityFromDocument(document, entityToRemove)
                )
            {
                var andVersionText = changeVersion.HasValue ? " and version" : "";
                addError("Id", $"An entity with Id {entityId} {andVersionText} doesn't exist");
                return false;
            }
            return true;
        }
    }
}
