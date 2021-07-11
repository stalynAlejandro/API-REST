using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ERPMostConsumedCatalogProductsIndex : MapIndex
    {
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        static public Expression<Func<ERPMostConsumedCatalogProductsIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
    }
    class ERPMostConsumedCatalogProductsIndexProvider : IndexProvider<ERPMostConsumedCatalogProducts>
    {
        public override void Describe(DescribeContext<ERPMostConsumedCatalogProducts> context)
        {
            context.For<ERPMostConsumedCatalogProductsIndex>()
                .Map(erpMostConsumedCatalogProducts =>
                {
                    return new ERPMostConsumedCatalogProductsIndex
                    {
                        OID = erpMostConsumedCatalogProducts.OID,
                        ProviderOID = erpMostConsumedCatalogProducts.ProviderOID,
                    };
                });
        }
    }
}

