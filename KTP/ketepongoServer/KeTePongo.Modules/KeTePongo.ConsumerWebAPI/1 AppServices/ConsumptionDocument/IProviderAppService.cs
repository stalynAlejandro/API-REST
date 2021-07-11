using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.AppServices;
using System;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument
{
    public interface IProviderAppService : IDocumentAppService<IConsumerClaims, UpdateProviderDTO, NewProviderDTO, ProviderDTO> 
    {
        Task<bool> RemoveAndRemoveChildrenAsync(long consumptionOID, int providerId, int? changeVersion, Action<string, string> addError);
        Task<bool> RemoveAndRemoveChildrenOIDAsync(long consumptionOID, int providerId, int? changeVersion, Action<string, string> addError);
    }
}
