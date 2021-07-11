using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IERPClientsPortfolioProviderChangesEventHandler
    {
        Task RemovedERPClientAsync(ERPClientsPortfolioProviderChangesContext context, Action<string, string> addError);
    }
    public class ERPClientsPortfolioProviderChangesContext
    {
        public ERPClientsPortfolioProviderChangesContext(long consumerOID, string erpId, long providerOID)
        {
            ConsumerOID = consumerOID;
            ProviderOID = providerOID;
            ERPId = erpId;
        }
        public long ConsumerOID { get; private set; }
        public long ProviderOID { get; private set; }
        public string ERPId { get; private set; }
    }
}