using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ERPClientsPortfolioIndex : MapIndex
    {
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        static public Expression<Func<ERPClientsPortfolioIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
    }
    class ERPClientsPortfolioIndexProvider : IndexProvider<ERPClientsPortfolio>
    {
        public override void Describe(DescribeContext<ERPClientsPortfolio> context)
        {
            context.For<ERPClientsPortfolioIndex>()
                .Map(eRPClients =>
                {
                    return new ERPClientsPortfolioIndex
                    {
                        OID = eRPClients.OID,
                        ProviderOID = eRPClients.ProviderOID,
                    };
                });
        }
    }
}

