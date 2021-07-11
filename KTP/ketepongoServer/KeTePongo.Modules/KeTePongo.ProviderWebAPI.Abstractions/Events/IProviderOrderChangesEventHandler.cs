using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IProviderOrderChangesEventHandler
    {
        Task AddedProviderOrdersAsync(AddedProviderOrdersContext context, Action<string, string> addError);
    }
    public class AddedProviderOrdersContext
    {
        public AddedProviderOrdersContext(
            long orderOID,
            bool hasErrors,
            List<SubOrderProcessingStatus> subOrdersProcessingStatus)
        {
            OrderOID = orderOID;
            HasErrors = hasErrors;
            SubOrdersProcessingStatus = subOrdersProcessingStatus;
        }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public long OrderOID { get; internal set; }
        public bool HasErrors { get; internal set; }
        public List<SubOrderProcessingStatus> SubOrdersProcessingStatus { get; internal set; } = new List<SubOrderProcessingStatus>();
    }
    public class SubOrderProcessingStatus
    {
        public SubOrderProcessingStatus(
            int subOrderId, 
            long providerOrderOID, 
            bool wasProcessed, 
            bool? wasEmailSentToProvider, 
            string processingError)
        {
            SubOrderId = subOrderId;
            ProviderOrderOID = providerOrderOID;
            WasProcessed = wasProcessed;
            WasEmailSentToProvider = wasEmailSentToProvider;
            ProcessingError = processingError;
        }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        [Range(1, int.MaxValue, ErrorMessage = Resources.RangeAttribute_ValidationError)]
        public int SubOrderId { get; internal set; }
        public long ProviderOrderOID { get; internal set; }
        public bool WasProcessed { get; internal set; }

        public bool? WasEmailSentToProvider { get; internal set; }
        public string ProcessingError { get; internal set; }
    }
}
