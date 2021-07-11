using AutoMapper;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KeTePongo.ProviderWebAPI.TypeConverters
{
    class MapNewConsumerOrderCreatedDTOToNewProviderOrderDTOList : ITypeConverter<NewConsumerOrderCreatedDTO, List<NewProviderOrderDTO>>
    {
        public List<NewProviderOrderDTO> Convert(NewConsumerOrderCreatedDTO source, List<NewProviderOrderDTO> destination, ResolutionContext context)
        {
            var result  = new List<NewProviderOrderDTO>();
            foreach (var subOrder in source.SubOrders)
            {
                var providerOrderDto = new NewProviderOrderDTO()
                {
                    ConsumerOrderOID = source.OID,
                    ConsumerSubOrderId = subOrder.SubOrderId,
                    ConsumerInfoWhenOrderWasSubmitted = source.ConsumerInfoWhenOrderWasSubmitted,
                    ConsumerUserName = source.UserName,
                    ProviderInfoWhenOrderWasSubmitted = subOrder.ProviderInfoWhenOrderWasSubmitted,
                    SalesmanUserName = source.UserName,
                    UtcDateTime = source.UtcDateTime,
                    UtcMinimumDeliveryDateTime = subOrder.UtcMinimumDeliveryDateTime,
                    Observation = subOrder.Observation,
                    OrderLines = subOrder.OrderLines.Select(l => new ProviderOrderLineDTO()
                    {
                        ConsumerProduct = l.Product,
                        ProviderProduct = null,
                        Quantity = l.Quantity,
                        Observation = l.Observation
                    })
                    .ToList()
                };
                result.Add(providerOrderDto);
            }
            return result;
        }
    }
}
