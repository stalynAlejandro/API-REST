using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public interface IConsumerProviderChangesEventHandler
    {
        Task AddedConsumerProviderAsync(AddedConsumerProviderContext context, Action<string, string> addError);
        Task RemovedConsumerProviderAsync(RemovedConsumerProviderContext context, Action<string, string> addError);
        
    }
    public class AddedConsumerProviderContext
    {
        public AddedConsumerProviderContext(
           ConsumerDTO consumerDTO ,
            int providerIdForConsumer,
            string providerSalesmanEmail)
        {
            Consumer = consumerDTO;
            ProviderIdForConsumer = providerIdForConsumer;
            ProviderSalesmanEmail = providerSalesmanEmail;
        }
        public ConsumerDTO Consumer { get; set; }
        public int ProviderIdForConsumer { get; private set; }
        public string ProviderSalesmanEmail { get; private set; }
    }
    public class RemovedConsumerProviderContext
    {
        public RemovedConsumerProviderContext(long consumerOID, int providerIdForConsumer, long providerOID, string providerSalesmanEmail)
        {
            ConsumerOID = consumerOID;
            ProviderIdForConsumer = providerIdForConsumer;
            ProviderOID = providerOID;
            ProviderSalesmanEmail = providerSalesmanEmail;
        }
        public long ConsumerOID { get; private set; }
        public long ProviderOID { get; private set; }
        public int ProviderIdForConsumer { get; private set; }
        public string ProviderSalesmanEmail { get; private set; }
    }
}
