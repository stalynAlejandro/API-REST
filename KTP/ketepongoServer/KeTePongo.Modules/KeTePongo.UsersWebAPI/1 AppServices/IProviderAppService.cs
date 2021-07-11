using KeTePongo.Core.AppServices;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Navigation;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public interface IProviderAppService
    {
        Task AddProviderFromAddedProviderAsync(ProviderDTO providerDTO, Action<string, string> addError);
        Task UpdateProviderFromUpdatedProviderAsync(ProviderDTO providerDTO, Action<string, string> addError);
        Task RemoveProviderFromRemovedProviderAsync(long providerOID, Action<string, string> addError);
    }
}
