using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.BackgroundAppServices
{
    public interface IConsumerProviderLinkingBackgroundAppService
    {
        Task AddedConsumerProviderAsync(ConsumerOfAProviderSalesmanDTO consumerOfAProviderSalesmanDTO, string salesmanEmail, Action<string, string> addError);
        Task RemovedConsumerProviderAsync(string salesmanEmail, Action<string, string> addError);
        Task RemoveConsumerProviderLinkAsync(string salesmanEmail, long consumerOID, long providerOID, Action<string, string> addError);
    }
}
