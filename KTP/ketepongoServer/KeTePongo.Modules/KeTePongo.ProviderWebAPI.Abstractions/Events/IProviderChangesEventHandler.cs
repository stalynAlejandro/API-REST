using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IProviderChangesEventHandler
    {
        Task ProviderSavedOIDAsync(ProviderChangesContext context, Action<string, string> addError);
        Task AddedProviderAsync(ProviderDTO providerDTO, Action<string, string> addError);
        Task UpdatedProviderAsync(long consumerOID, ProviderDTO providerDTO, Action<string, string> addError);
        Task RemovedProviderAsync(long consumerOID, long providerOID, Action<string, string> addError);

        Task ActivatedProviderAsync(ProviderDTO providerDTO, Action<string, string> addError);
    }
    public class ProviderChangesContext
    {
        public ProviderChangesContext(long providerOID, long consumerOID)
        {
            ProviderOID = providerOID;
            ConsumerOID = consumerOID;
        }
        public long ProviderOID { get; private set; }
        public long ConsumerOID { get; private set; }
    }
}