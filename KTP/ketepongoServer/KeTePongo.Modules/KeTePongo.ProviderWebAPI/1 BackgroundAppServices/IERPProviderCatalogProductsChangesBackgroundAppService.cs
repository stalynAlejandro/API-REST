using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions.Events;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.BackgroundAppServices
{
    public interface IERPProviderCatalogProductsChangesBackgroundAppService
    {
        Task UpdateMostConsumedProductAsync(ERPProviderCatalogProductsChangesContext erpProviderCatalogProductsChangesContext, Action<string, string> addError);
    }
}
