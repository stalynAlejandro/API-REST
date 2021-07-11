using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public interface IConsumptionAppService
    {
        Task<IList<ConsumptionDTO>> GetConsumptionsAsync();
        Task<ConsumptionDTO> GetAsync(ConsumerClaimsPrincipal user);
    }
}
