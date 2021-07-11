using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;
using YesSql;

namespace KeTePongo.ConsumerWebAPI.BackgroundAppServices
{
    public class ProviderBackgroundAppService : IProviderBackgroundAppService
    {
        private readonly ILogger<ProviderBackgroundAppService> _logger;
        private readonly IProviderAppService _providerAppService;
        private readonly ISession _session;
        public ProviderBackgroundAppService(ISession session, ILogger<ProviderBackgroundAppService> logger, IProviderAppService providerAppService)
        {
            _logger = logger;
            _providerAppService = providerAppService;
            _session = session;
        }
       
        public async Task<bool> RemoveAsync(long consumerOID, long keTePongoProviderOID, Action<string, string> addError)
        {
            var consumption = await _session.Query<Consumption, ConsumptionIndex>(i => i.ConsumerOID == consumerOID).FirstOrDefaultAsync();
            var provider = consumption.Providers.FirstOrDefault(p => p.KeTePongoProviderOID == keTePongoProviderOID);
            return await _providerAppService.RemoveAndRemoveChildrenOIDAsync(consumption.OID, provider.Id, null, addError);
        }

        public async Task<bool> ValidateAsync(long consumerOID, long keTePongoProviderOID, string salesmanEmail, Action<string, string> addError)
        {
            var consumption = await _session.Query<Consumption, ConsumptionIndex>(i => i.ConsumerOID == consumerOID).FirstOrDefaultAsync();
            var provider = consumption.Providers.FirstOrDefault(p => p.Salesman.Email == salesmanEmail);

            
            provider.IsPendingToApprove = false;
            provider.KeTePongoProviderOID = keTePongoProviderOID;
            _session.Save(consumption);
            await _session.CommitAsync();
            return true;
        }
    }
}
