using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public class ConsumptionAppService : IConsumptionAppService
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        public ConsumptionAppService(
            ISession session,
            IMapper mapper) 
        {
            _session = session;
            _mapper = mapper;
        }

        public async Task<ConsumptionDTO> GetAsync(ConsumerClaimsPrincipal user)
        {
            var result = await _session.Query<Consumption,ConsumptionIndex>(i=>i.ConsumerOID == user.ConsumerOID).FirstOrDefaultAsync();
            if (result == null)
            {
                return null;
            }
            return _mapper.Map<Consumption, ConsumptionDTO>(result);
        }

        public async Task<IList<ConsumptionDTO>> GetConsumptionsAsync()
        {
            List<Consumption> result = new List<Consumption>();
            var consumptionCount = await _session.Query<Consumption>().CountAsync();
            int pageSize = 20;
            var pagesCount = (consumptionCount + pageSize - 1) / pageSize;
            for (var page = 0; page < pagesCount; page++)
            {
                result.AddRange(await _session.Query<Consumption>().Skip(page * pageSize).Take(pageSize).ListAsync());
            }
            if (result == null)
            {
                return null;
            }
            return _mapper.Map< List<Consumption>, List<ConsumptionDTO>>(result);
        }
    }
}
