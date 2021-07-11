using AutoMapper;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Models;
using System;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.UsersWebAPI.Indexes;
using KeTePongo.Core.Extensions;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public class ProviderAppService : IProviderAppService
    {
        private readonly IMapper _mapper;
        private readonly ISession _session;

        public ProviderAppService(
            ISession session,
            IMapper mapper
            )
        {
            _mapper = mapper;
            _session = session;
        }
        public async Task AddProviderFromAddedProviderAsync(ProviderDTO providerDTO, Action<string, string> addError)
        {
            var provider = _mapper.Map<ProviderDTO, Provider>(providerDTO);
            _session.Save(provider);
            await _session.CommitAsync();
        }
        public async Task UpdateProviderFromUpdatedProviderAsync(ProviderDTO providerDTO, Action<string, string> addError)
        {
            var provider = await _session.Query<Provider, ProviderOnUserIndex>(i => i.ProviderOID == providerDTO.ProviderOID).FirstOrDefaultAsync();
            provider.TradeName = providerDTO.TradeName;
            provider.ChangeVersion = provider.ChangeVersion + 1;
            _session.Save(provider);
            await _session.CommitAsync();
        }

        public async Task RemoveProviderFromRemovedProviderAsync(long providerOID, Action<string, string> addError)
        {
            var providerIndex = await _session.QueryIndex<ProviderOnUserIndex>(ProviderOnUserIndex.GetExprByProviderOID(providerOID)).FirstOrDefaultAsync();
          
            _session.Delete<Provider>(providerIndex.DocumentId);
            await _session.CommitAsync();
        }
    }
}