using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.BackgroundAppServices
{
    public interface IConsumptionProductsBackgroundAppService
    {
        Task UpdateProviderCatalogProductsAsync(long keTePongoProviderOID, long consumptionOID, ERPProviderCatalogProductsChangesDTO erpProviderCatalogProductsChangesDTO, Action<string, string> addError);
    }
}
