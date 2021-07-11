using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using Microsoft.Extensions.Localization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KeTePongo.ConsumerWebAPI.Extensions
{
    public static class ConsumerOrderExtension
    {
        public static bool SetSubOrders(this ConsumerOrder order, List<NewSubOrderDTO> subOrderDTOs, Func<int[], List<Provider>> orderProvidersGetRange, Func<int[], List<Product>> orderProductsGetRange, IStringLocalizer<ConsumerOrderAppService> S, Action<string, string> addError)
        {
            var orderProviderIds = subOrderDTOs.Select(o => o.ProviderId).Distinct().ToArray();
            if (orderProviderIds.Length < subOrderDTOs.Count)
            {
                addError($"{nameof(NewSubOrderDTO.ProviderId)}", S["Only one suborder per provider is allowed"]);
                return false;
            }
            var orderProductIds = subOrderDTOs.SelectMany(so => so.OrderLines.Select(ol => ol.ProductId)).Distinct().ToArray();
            if (orderProductIds.Length < subOrderDTOs.Sum(so => so.OrderLines.Count()))
            {
                addError($"{nameof(NewSubOrderDTO.ProviderId)}", S["Only one line per product is allowed"]);
                return false;
            }

            List<Provider> orderProviders = orderProvidersGetRange.Invoke(orderProviderIds);
            if (orderProviders == null)
            {
                return false;
            }
            List<Product> orderProducts = orderProductsGetRange.Invoke(orderProductIds);
            if (orderProducts == null)
            {
                return false;
            }
            var subordersWihtNullUtcDateTime = subOrderDTOs.Where(s => s.UtcMinimumDeliveryDateTime == null).ToList();
            subordersWihtNullUtcDateTime.ForEach(s => s.UtcMinimumDeliveryDateTime = DateTime.MinValue.ToUniversalTime());

            for (int subOrderIndex = 0; subOrderIndex < subOrderDTOs.Count; subOrderIndex++)
            {
                var newSubOrder = subOrderDTOs[subOrderIndex];
                var subOrder = order.SubOrders[subOrderIndex];
                subOrder.SubOrderId = subOrderIndex + 1;
                subOrder.Provider = orderProviders.First(p => p.Id == newSubOrder.ProviderId);
                if (subOrder.UtcMinimumDeliveryDateTime == new DateTime())
                {
                    subOrder.UtcMinimumDeliveryDateTime = DateTime.Now.ToUniversalTime();
                }
                for (int orderLineIndex = 0; orderLineIndex < newSubOrder.OrderLines.Count; orderLineIndex++)
                {
                    var newOrderLine = newSubOrder.OrderLines[orderLineIndex];
                    var orderLine = subOrder.OrderLines[orderLineIndex];
                    orderLine.Product = orderProducts.First(p => p.Id == newOrderLine.ProductId);
                }
            }
            return true;
        }
    }
}
