using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ProviderOrderIndex : MapIndex
    {
        public long OID { get; set; }
        public long ConsumerOID { get; set; }
        public long ProviderOID { get; set; }
        public string SalesmanUserName { get; set; }
        public bool HasAllProductsMappedToProvider { get; set; }
        public DateTime UtcDateTime { get; set; }
        public DateTime UtcMinimumDeliveryDateTime { get; set; }
        public bool IsRemoved { get; set; }
        static public Expression<Func<ProviderOrderIndex, bool>> GetExprByProviderOIDConsumerOIDAndIsRemoved(long providerOID, long consumerOID, bool isRemoved)
        {
            return i => i.ProviderOID == providerOID && i.ConsumerOID == consumerOID && i.IsRemoved == isRemoved;
        }
    }
    class ProviderOrderIndexProvider : IndexProvider<ProviderOrder>
    {
        public override void Describe(DescribeContext<ProviderOrder> context)
        {
            context.For<ProviderOrderIndex>()
                .Map(order =>
                {
                    return new ProviderOrderIndex
                    {
                        OID = order.OID,
                        ConsumerOID = order.ConsumerInfoWhenOrderWasSubmitted.OID,
                        ProviderOID = order.ProviderInfoWhenOrderWasSubmitted.OID.GetValueOrDefault(),
                        UtcDateTime = order.UtcDateTime,
                        SalesmanUserName = order.SalesmanUserName,
                        UtcMinimumDeliveryDateTime = order.UtcMinimumDeliveryDateTime,
                        HasAllProductsMappedToProvider = order.HasAllProductsMappedToProvider,
                        IsRemoved = order.IsRemoved
                    };
                });
        }
    }
}
