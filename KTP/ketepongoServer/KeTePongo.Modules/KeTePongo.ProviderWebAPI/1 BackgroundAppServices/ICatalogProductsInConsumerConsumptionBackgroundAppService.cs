using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using OrchardCore.Navigation;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.BackgroundAppServices
{
    public interface ICatalogProductsInConsumerConsumptionBackgroundAppService
    {
        Task AddedAsync(CatalogProductInConsumerConsumptionDTO catalogProductInConsumerConsumptionDTO, Action<string, string> addError);
        Task RemovedAsync(CatalogProductInConsumerConsumptionDTO catalogProductInConsumerConsumptionDTO, Action<string, string> addError);
    }
}
