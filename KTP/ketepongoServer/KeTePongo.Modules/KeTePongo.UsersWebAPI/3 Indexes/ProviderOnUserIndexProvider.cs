using KeTePongo.UsersWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.UsersWebAPI.Indexes
{
    public class ProviderOnUserIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public string TradeName { get; set; }
        static public Expression<Func<ProviderOnUserIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
    }
    class ProviderOnUserIndexProvider : IndexProvider<Provider>
    {
        public override void Describe(DescribeContext<Provider> context)
        {
            context.For<ProviderOnUserIndex>()
                .Map(provider =>
                {
                    return new ProviderOnUserIndex
                    {
                        OID = provider.OID,
                        ProviderOID = provider.ProviderOID,
                        TradeName = provider.TradeName
                    };
                });
        }
    }
}

