using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IProviderAppService
    {
        Task<IEnumerable<ProviderDTO>> GetAllAsync(Pager pager);
        Task<ProviderDTO> GetAsync(ProviderClaimsPrincipal user);
        Task<ProviderDTO> GetAsync(long OID);
        Task<int> GetCountAsync();
        Task<ProviderDTO> AddAsync(NewProviderDTO provider, Action<string, string> addError);
        Task<ProviderDTO> AddAsync(ProviderClaimsPrincipal user, NewProviderDTO providerDTO, Action<string, string> addError);
        Task<ProviderDTO> AddFromConsumerAlreadyAddedAsync(ProviderDTO providerDTO, Action<string, string> addError);
        Task<ProviderDTO> UpdateAsync(ProviderClaimsPrincipal user, UpdateProviderDTO providerDTO, Action<string, string> addError);
        Task<ProviderDTO> UpdateAsync(long providerOID, UpdateProviderDTO providerDTO, Action<string, string> addError);
        Task<ProviderDTO> UpdateAsync(UpdateAnyProviderDTO updateConsumerDTO, Action<string, string> addError);
        Task<ProviderDTO> UpdateFromConsumerAlreadyUpdatedAsync(long providerOID, UpdateProviderDTO providerDTO, Action<string, string> addError);
        
        Task<bool> RemoveAsync(ProviderClaimsPrincipal user, Action<string, string> addError);
        Task<bool> RemoveAsync(long providerOID, Action<string, string> addError);
        Task<bool> RemoveFromConsumerAlreadyRemovedAsync(long providerOID, Action<string, string> addError);
        Task UpdateConsumerOIDAsync(long providerOID, long consumerOID, Action<string, string> addError);
        Task<ProviderDTO> ActivateProviderAsync(ProviderClaimsPrincipal user, long consumerOID, Action<string, string> addError);
        Task<ProviderLinkRequestDTO> GetProvidersByEmailOrPhoneAsync(string email, string phone, Action<string, string> addError);
        Task ChangeProviderLinkedToAnERPAsync(long oldproviderOID, long newProviderOID, Action<string, string> addError);
    }
}
