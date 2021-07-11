using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.ModelBinding;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public interface INewConsumerOrderCreatedEventHandler
    {
        Task NewConsumerOrderCreatedAsync(NewConsumerOrderCreatedEventDTO order, Action<string, string> addError);
    }
    public class NewConsumerOrderCreatedEventDTO
    {
        public NewConsumerOrderCreatedEventDTO(long oid, string userName, ConsumerDTO consumer, DateTime utcDateTime, bool hasErrors, List<SubOrderDTO> subOrders)
        {
            OID = oid;
            UserName = userName;
            Consumer = consumer;
            UtcDateTime = utcDateTime;
            HasErrors = hasErrors;
            SubOrders = subOrders;
        }
        public long OID { get; private set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string UserName { get; private set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public ConsumerDTO Consumer { get; private set; }
        [IsUtcDateTime (ErrorMessage = Resources.IsUtcDateTime_Invalid)]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public DateTime UtcDateTime { get; private set; }
        public bool HasErrors { get; private set; }
        public List<SubOrderDTO> SubOrders { get; private set; }
    }
}
