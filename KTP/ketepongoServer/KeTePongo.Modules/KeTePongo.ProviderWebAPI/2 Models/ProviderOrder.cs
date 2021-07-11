
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.Core.Interfaces;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ProviderOrder : IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        [Obsolete("Obsolete", false)]
        public int Id { get; set; }
        public long OID { get; set; }
        public int ConsumerOrderId { get; set; }
        public int ConsumerSubOrderId { get; set; }
        public string ConsumerUserName { get; set; }
        public string SalesmanUserName { get; set; }
        public ProviderInfoAtOrder ProviderInfoWhenOrderWasSubmitted { get; set; }
        public ConsumerInfoAtOrder ConsumerInfoWhenOrderWasSubmitted { get; set; }
        public DateTime UtcDateTime { get; set; }
        public DateTime UtcMinimumDeliveryDateTime { get; set; }
        public string Observation { get; set; }
        public bool HasAllProductsMappedToProvider { get { return OrderLines.Any(ol => !ol.IsMappedToProviderProduct()); } }
        public bool WasEmailSent { get; set; }
        public List<ProviderOrderLine> OrderLines { get; set; }
        public bool IsRemoved { get; set; }

        public bool ValidateEntity(Action<string, string> addError)
        {
            if (OrderLines == null || !OrderLines.Any())
            {
                addError($"{nameof(ProviderOrder.OrderLines)}", "An order must have at least one product line");
                return false;
            }
            if (OrderLines.Any(ol => ol.Quantity <= 0))
            {
                addError($"{nameof(ProviderOrderLine.Quantity)}", "The order lines must have quantities greater than 0");
                return false;
            }
            return true;
        }
    }
    public class ProviderOrderLine
    {
        public CatalogProduct ProviderProduct { get; set; }
        public ConsumerProduct ConsumerProduct { get; set; }
        public int Quantity { get; set; }
        public string Observation { get; set; }

        internal bool IsMappedToProviderProduct()
        {
            return ProviderProduct != null;
        }
    }
    public class ConsumerProduct : ILocalIdEntity
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageUrl { get; set; }
        [Obsolete("Obsolete", false)]
        public int ProviderId { get; set; }
        public long ProviderOID { get; set; }
        public int? ProviderProductId { get; set; }
        public string ProviderERPId { get; set; }
    }
}
