using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Security.Principal;
using System.Threading.Tasks;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Indexes;
using OrchardCore.Navigation;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IProviderOrderAppService
    {
        Task<IList<ProviderOrderDTO>> GetOrdersAsync(ProviderClaimsPrincipal user, Expression<Func<ProviderOrderIndex, bool>> filter, Pager pager, Action<string, string> addError);
        Task<ProviderOrderDTO> GetAsync(ProviderClaimsPrincipal user, int orderId);
        Task<List<ProviderOrderDTO>> AddOrdersFromAConsumerOrderAsync(NewConsumerOrderCreatedDTO newConsumerOrderCreatedDTO, Action<string, string> addError);
    }
}