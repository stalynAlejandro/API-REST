using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public interface IConsumerChangesEventHandler
    {
        Task ConsumerSavedOIDAsync(ConsumerChangesContext context, Action<string, string> addError);
        Task AddedConsumerAsync(ConsumerDTO consumerDTO, Action<string, string> addError);
        Task UpdatedConsumerAsync(long providerOID, ConsumerDTO consumerDTO, Action<string, string> addError);
        Task RemovedConsumerAsync(long providerOID, long consumerOID, Action<string, string> addError);
    }
    public class ConsumerChangesContext
    {
        public ConsumerChangesContext(long consumerOID, long providerOID)
        {
            ProviderOID = providerOID;
            ConsumerOID = consumerOID;
        }
        public long ProviderOID { get; private set; }
        public long ConsumerOID { get; private set; }
    }
}
