using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ProviderCatalogProductsIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public string ProviderCode { get; set; }
        public int ChangeVersion { get; set; }
        static public Expression<Func<ProviderCatalogProductsIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
    }
    class ProviderCatalogProductsIndexProvider : IndexProvider<ProviderCatalogProducts>
    {
        public override void Describe(DescribeContext<ProviderCatalogProducts> context)
        {
            context.For<ProviderCatalogProductsIndex>()
                .Map(consumerProductCarte =>
                {
                    return new ProviderCatalogProductsIndex
                    {
                        OID = consumerProductCarte.OID,
                        ProviderOID = consumerProductCarte.Provider.OID,
                        ProviderCode = consumerProductCarte.Provider.ExtraDataForProviderModule.Code,
                        ChangeVersion = consumerProductCarte.ChangeVersion
                    };
                });
        }
    }
}

