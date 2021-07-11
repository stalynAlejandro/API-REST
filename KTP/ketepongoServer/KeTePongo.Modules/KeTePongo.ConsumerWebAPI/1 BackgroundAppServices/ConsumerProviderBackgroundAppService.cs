using AutoMapper;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.BackgroundAppServices
{
    public class ConsumerProviderBackgroundAppService : IConsumerProviderBackgroundAppService
    {
        private readonly ISession _session;
        private readonly IMapper _mapper;
        public ConsumerProviderBackgroundAppService(
            ISession session,
            IMapper mapper) 
        {
            _session = session;
            _mapper = mapper;
        }

        public async Task RemoveProviderAsync(long consumerOID, int providerId)
        {
            var consumerOrdersCount = await _session.Query<ConsumerOrder, ConsumerOrderIndex>(ConsumerOrderIndex.GetExprByConsumerOID(consumerOID)).CountAsync();
            int pageSize = 20;
            var pagesCount = (consumerOrdersCount + pageSize - 1) / pageSize;
            for (var page = 0; page < pagesCount; page++)
            {
                var consumerOrdersPaged = await _session.Query<ConsumerOrder, ConsumerOrderIndex>(ConsumerOrderIndex.GetExprByConsumerOID(consumerOID)).Skip(page * pageSize).Take(pageSize).ListAsync();
                foreach (var consumerOrder in consumerOrdersPaged)
                {
                    if(consumerOrder.SubOrders.Any(so => so.Provider.Id == providerId))
                    {
                        consumerOrder.SetSubOrdersAsRemoved(providerId);
                        _session.Save(consumerOrder);
                    }
                }
                await _session.CommitAsync();
            }
        }
    }
}
