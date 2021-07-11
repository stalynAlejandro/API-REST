using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IConsumersOfAProviderSalesmanAppService
    {
        Task<List<ConsumerOfAProviderSalesmanDTO>> GetConsumersOfAProviderSalesmanAsync(ProviderClaimsPrincipal user, int? changeVersion, Action<string, string> addError);
        Task<bool> ValidateConsumerOfAProviderSalesmanAsync(ProviderClaimsPrincipal user, ConsumerOfAProviderSalesmanValidationDTO consumerOfAProviderSalesmanValidationDTO, Action<string, string> addError);
    }
}