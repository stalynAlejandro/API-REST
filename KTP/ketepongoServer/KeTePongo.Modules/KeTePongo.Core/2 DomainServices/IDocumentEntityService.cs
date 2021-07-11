using System;
using System.Collections.Generic;
using KeTePongo.Core.Interfaces;

namespace KeTePongo.Core.DomainServices
{
    public interface IDocumentEntityService<TDocument,TEntity> 
        where TDocument : class, IOIDEntity, IChangeVersion
        where TEntity : class, ILocalIdEntity, IChangeVersion
    {
        TEntity Add(TDocument document, TEntity newEntity, Action<string, string> addError);
        IList<TEntity> GetAllEntitiesFromDocument(TDocument document);
        IList<TEntity> GetAllEntitiesFromDocument(TDocument document, Action<string, string> addError);
        TEntity GetEntity(TDocument document, int entityId, Action<string, string> addError);
        IList<TEntity> GetRange(TDocument document, int[] entityIds, Action<string, string> addError);
        bool Remove(TDocument document, int entityId, int? changeVersion, Action<string, string> addError);
        TEntity Update(TDocument document, TEntity updatedEntity, int? changeVersion, Action<string, string> addError);
        bool ValidateEntity(TDocument document, TEntity entity, Action<string, string> addError);
    }
}