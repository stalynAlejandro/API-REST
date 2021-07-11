using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ConsumersOfAProviderSalesmanIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public string SalesmanUserName { get; set; }
        public int ChangeVersion { get; set; }
        static public Expression<Func<ConsumersOfAProviderSalesmanIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
        static public Expression<Func<ConsumersOfAProviderSalesmanIndex, bool>> GetExprByProviderOIDAndSalesmanUserName(long providerOID,string salesmanUserName)
        {
            return i => i.ProviderOID == providerOID && i.SalesmanUserName == salesmanUserName;
        }
        static public Expression<Func<ConsumersOfAProviderSalesmanIndex, bool>> GetExprByProviderOIDAndSalesmanUserNameAndChangeVersion(long providerOID, string salesmanUserName, int changeVersion)
        {
            return i => i.ProviderOID == providerOID && i.SalesmanUserName == salesmanUserName && i.ChangeVersion > changeVersion;
        }
    }
    class ConsumersOfAProviderSalesmanIndexIndexProvider : IndexProvider<ConsumersOfAProviderSalesman>
    {
        public override void Describe(DescribeContext<ConsumersOfAProviderSalesman> context)
        {
            context.For<ConsumersOfAProviderSalesmanIndex>()
                .Map(consumersOfAProviderSalesman =>
                {
                    return new ConsumersOfAProviderSalesmanIndex
                    {
                        OID = consumersOfAProviderSalesman.OID,
                        ProviderOID = consumersOfAProviderSalesman.ProviderOID,
                        SalesmanUserName = consumersOfAProviderSalesman.SalesManUserName,
                        ChangeVersion = consumersOfAProviderSalesman.ChangeVersion
                    };
                });
        }
    }
}

