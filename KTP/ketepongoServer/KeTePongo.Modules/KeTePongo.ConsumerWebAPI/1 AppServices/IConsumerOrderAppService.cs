using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public interface IConsumerOrderAppService
    {
        Task<ConsumerOrderDTO> GetAsync(ConsumerClaimsPrincipal user, long orderOID);
        Task<IList<ConsumerOrderDTO>> GetOrdersAsync(ConsumerClaimsPrincipal user, Pager pager, Action<string, string> addError);
        Task<ConsumerOrderDTO> AddAsync(ConsumerClaimsPrincipal user, NewConsumerOrderDTO newOrder, Action<string, string> addError);
        Task UpdateProcessedOrdersByProviderBackendAsync(NewConsumerOrderProcessedByProviderDTO newConsumerOrderProcessedByProviderDTO, Action<string, string> addError);
    }
}
