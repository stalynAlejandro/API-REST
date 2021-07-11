using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IERPClientsPortfolioAppService
    {
        Task UpdateERPClientsAsync(ProviderClaimsPrincipal user, IList<ERPClientDTO> erpClientDTOList, Action<string, string> addError);
    }
}
