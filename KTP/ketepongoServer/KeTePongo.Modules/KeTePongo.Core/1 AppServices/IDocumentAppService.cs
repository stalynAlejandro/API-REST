using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Security.Principal;
using System.Threading.Tasks;

namespace KeTePongo.Core.AppServices
{    
    public interface IDocumentAppService<TUserClaims, TDtoInput, TDtoNewInput, TDtoOutput>
        where TUserClaims: class
        where TDtoInput : class
        where TDtoNewInput : class
        where TDtoOutput : class, ILocalIdEntity, INullableChangeVersion
    {
        Task<TDtoOutput> GetAsync(TUserClaims user, int entityId, Action<string, string> addError);
        Task<TDtoOutput> GetAsync(TUserClaims user, long documentOID, int entityId, Action<string, string> addError);
        Task<IList<TDtoOutput>> GetRangeAsync(TUserClaims user, int[] entityIds, Action<string, string> addError);
        Task<IList<TDtoOutput>> GetRangeAsync(TUserClaims user, long documentOID, int[] entityIds, Action<string, string> addError);
        Task<IList<TDtoOutput>> GetAllAsync(TUserClaims user, Action<string, string> addError);
        Task<IList<TDtoOutput>> GetAllAsync(TUserClaims user, long documentOID, Action<string, string> addError);
        Task<TDtoOutput> AddAsync(TUserClaims user, TDtoNewInput dto, Action<string, string> addError);
        Task<TDtoOutput> AddAsync(TUserClaims user, long documentOID, TDtoNewInput dto, Action<string, string> addError);
        Task<IList<TDtoOutput>> AddRangeAsync(TUserClaims user, long documentOID, IList<TDtoNewInput> dto, Action<string, string> addError);
        Task<IList<TDtoOutput>> AddRangeAsync(TUserClaims user, IList<TDtoNewInput> newDtos, Action<string, string> addError);
        Task<TDtoOutput> UpdateAsync(TUserClaims user, TDtoInput dto, Action<string, string> addError);
        Task<TDtoOutput> UpdateAsync(TUserClaims user, long documentOID, TDtoInput dto, Action<string, string> addError);
        Task<bool> RemoveAsync(TUserClaims user, int entityId, int? changeVersion, Action<string, string> addError);
        Task<bool> RemoveAsync(long documentOID, int entityId, int? changeVersion, Action<string, string> addError);
    }
}