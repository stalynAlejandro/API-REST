using KeTePongo.ConsumerWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ConsumerWebAPI.Indexes
{
    public class ConsumptionIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ConsumerOID { get; set; }

        static public Expression<Func<ConsumptionIndex, bool>> GetExprByOID(long OID)
        {
            return i => i.OID == OID;
        }
        static public Expression<Func<ConsumptionIndex, bool>> GetExprByConsumerOID(long consumerOID)
        {
            return i => i.ConsumerOID == consumerOID;
        }
    }
    class ConsumptionIndexProvider : IndexProvider<Consumption>
    {
        public override void Describe(DescribeContext<Consumption> context)
        {
            context.For<ConsumptionIndex>()
                .Map(consumption =>
                {
                    return new ConsumptionIndex
                    {
                        OID = consumption.OID,
                        ConsumerOID = consumption.ConsumerOID,
                    };
                });
        }
    }
}

