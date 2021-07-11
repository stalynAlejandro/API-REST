using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;

namespace KeTePongo.Core.AppServices
{
    public interface IDocumentInternalAppService<TUserClaims, TDtoInput, TDtoNewInput, TDocument, TEntity>
        where TDocument : class, IOIDEntity, IChangeVersion
        where TEntity : class, ILocalIdEntity, IChangeVersion
        where TUserClaims: class
        where TDtoInput : class
        where TDtoNewInput : class
    {
        Task AddEntityToDocumentAsync(TUserClaims user, TDtoNewInput dto, TDocument document, Action<string, string> addError);
        Task UpdateEntityAtDocumentAsync(TUserClaims user, TDtoInput dto, TDocument document, Action<string, string> addError);
        Task<TEntity> RemoveEntityAtDocumentAsync(TUserClaims user, TDocument document, int entityId, int? changeVersion, Action<string, string> addError);
    }
}