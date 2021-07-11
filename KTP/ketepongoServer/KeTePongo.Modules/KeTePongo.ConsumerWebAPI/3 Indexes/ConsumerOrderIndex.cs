using KeTePongo.ConsumerWebAPI.Models;
using Org.BouncyCastle.Asn1.Esf;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ConsumerWebAPI.Indexes
{
    public class ConsumerOrderIndex : MapIndex
    {
        public long OID { get; set; }
        public long ConsumerOID { get; set; }
        public string UserName { get; set; }
        public DateTime UtcDateTime { get; set; }
        static public Expression<Func<ConsumerOrderIndex, bool>> GetExprByConsumerOID(long consumerOID)
        {
            return i => i.ConsumerOID == consumerOID;
        }
    }
    class ConsumerOrderIndexProvider : IndexProvider<ConsumerOrder>
    {
        public override void Describe(DescribeContext<ConsumerOrder> context)
        {
            context.For<ConsumerOrderIndex>()
                .Map(order =>
                {
                    return new ConsumerOrderIndex
                    {
                        OID = order.OID,
                        UserName = order.UserName,
                        ConsumerOID = order.ConsumerOID,
                        UtcDateTime = order.UtcDateTime
                    };
                });
        }
    }
}
