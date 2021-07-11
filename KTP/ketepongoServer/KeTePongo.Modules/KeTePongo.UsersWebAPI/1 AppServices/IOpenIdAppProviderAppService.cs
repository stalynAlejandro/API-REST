using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public interface IOpenIdAppProviderAppService
    {
        Task<long> GetCountAsync();
        Task<IEnumerable<OpenIdAppProviderDTO>> GetAllAsync(Pager pager = null);
        Task<OpenIdAppProviderDTO> GetAsync(string clientId);
        Task<bool> UpdateAsync(string clientId, UpdatedOpenIdAppProviderDTO openIdAppDTO, Action<string, string> addError);
    }
}