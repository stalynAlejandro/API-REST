using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.BackgroundAppServices
{
    public interface IConsumerProviderBackgroundAppService
    {
        Task RemoveProviderAsync(long consumerOID, int providerId);
    }
}
