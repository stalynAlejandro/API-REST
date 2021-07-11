using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public interface IOpenIdAppMinVersionAppService
    {
        Task<long> GetCountAsync();
        Task<IEnumerable<OpenIdAppMinVersionDTO>> GetAllAsync(Pager pager = null);
        Task<OpenIdAppMinVersionDTO> GetAsync(string clientId);
        Task<bool> HasToUpdateAsync(string clientId, Version clientVersion, Action<string,string> addError);
        Task<bool> UpdateAsync(string clientId, UpdatedOpenIdAppMinVersionDTO openIdAppDTO, Action<string, string> addError);
    }
}