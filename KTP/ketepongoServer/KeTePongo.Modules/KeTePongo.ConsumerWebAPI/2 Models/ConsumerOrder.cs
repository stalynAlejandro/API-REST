using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using KeTePongo.Core.Interfaces;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ConsumerWebAPI.Models
{
    public class ConsumerOrder : IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public long OID { get; set; }
        [Obsolete("Obsolete", false)]
        public int Id { get; set; }
        public string UserName { get; set; }
        public long ConsumerOID { get; set; }
        public DateTime UtcDateTime { get; set; }
        public bool WasEmailSent { get; set; }
        public bool HasErrors { get; set; }
        public List<SubOrder> SubOrders { get; set; }

        public void SetSubOrdersAsRemoved(int providerId)
        {
            SubOrders.Where(so => so.Provider.Id == providerId).ToList().ForEach(so => so.IsRemoved = true);
        }
        public bool ValidateEntity(IStringLocalizer<ConsumerOrder> localizer, Action<string, string> addError)
        {
            if (this.SubOrders == null || this.SubOrders.Count == 0)
            {
                addError($"{nameof(ConsumerOrder.SubOrders)}", localizer["An order must have at least one suborder"]);
                return false;
            }
            if (this.SubOrders.Any(so => so.OrderLines == null) || this.SubOrders.Any(so => so.OrderLines.Count == 0))
            {
                addError($"{nameof(SubOrder.OrderLines)}", localizer["A suborder must have at least one product line"]);
                return false;
            }
            if (this.SubOrders.Any(so => so.OrderLines.Any(ol => ol.Quantity <= 0)))
            {
                addError($"{nameof(ConsumerOrderLine.Quantity)}", localizer["The order lines must have quantities greater than 0"]);
                return false;
            }
            if (this.SubOrders.Any(so => so.Provider == null))
            {
                addError($"{nameof(SubOrder.Provider)}", localizer["Not existing provider at an order line"]);
                return false;
            }
            if (this.SubOrders.Any(so => so.OrderLines.Any(ol => ol.Product == null)))
            {
                addError($"{nameof(ConsumerOrderLine.Product)}", localizer["Not existing product at an OrderLine"]);
                return false;
            }
            return true;
        }
    }
    public class SubOrder
    {
        public int SubOrderId { get; set; }
        public Provider Provider { get; set; }
        public DateTime UtcMinimumDeliveryDateTime { get; set; }
        public string Observation { get; set; }
        public bool? WasProcessed { get; set; }
        public long? ProviderOrderOID { get; set; }
        public bool? WasEmailSentToProvider { get; set; }
        public string ProcessingError { get; set; }
        public List<ConsumerOrderLine> OrderLines { get; set; }
        public bool IsRemoved { get; set; }
    }
    public class ConsumerOrderLine
    {
        public int Quantity { get; set; }
        public string Observation { get; set; }
        public Product Product { get; set; }
        bool IsRejected { get; set; }
    }
}
