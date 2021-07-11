using KeTePongo.ConsumerWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ConsumerWebAPI.Indexes
{
    public class ConsumerIndex : MapIndex
    {
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        static public Expression<Func<ConsumerIndex, bool>> GetExprByConsumerOID(long consumerOID)
        {
            return i => i.OID == consumerOID;
        }
    }
    
    class ConsumerIndexProvider : IndexProvider<Consumer>
    {
        public override void Describe(DescribeContext<Consumer> context)
        {
            context.For<ConsumerIndex>()
                .Map(consumer =>
                {
                    return new ConsumerIndex
                    {
                        OID = consumer.OID,
                        ProviderOID = consumer.ExtraDataForConsumerModule.ProviderOID
                    };
                });
        }
    }
}

