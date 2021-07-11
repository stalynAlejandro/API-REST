using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IConsumerValidationByProviderEventHandler
    {
        Task ConsumerValidatedAsync(ConsumerValidatedContext context, Action<string, string> addError);
    }
    public class ConsumerValidatedContext
    {
        public ConsumerValidatedContext(long consumerOID, long providerOID, string erpId, string salesmanEmail)
        {
            ConsumerOID = consumerOID;
            ProviderOID = providerOID;
            ERPId = erpId;
            SalesmanEmail = salesmanEmail;
        }
        public long ConsumerOID { get; private set; }
        public long ProviderOID { get; private set; }
        public string ERPId { get; private set; }
        public string SalesmanEmail { get; private set; }
    }
}