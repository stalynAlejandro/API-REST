using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ProviderIndex : MapIndex
    {
        public long OID { get; set; }
        public long ConsumerOID { get; set; }
        public string TradeName { get; set; }
        public bool IsProviderCatalogProductsPublic { get; set; }
        public bool IsLinkedToERP { get; set; }
        public string Code { get; set; }
        static public Expression<Func<ProviderIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.OID == providerOID;
        }
        static public Expression<Func<ProviderIndex, bool>> GetExprByProviderCode(string code)
        {
            return i => i.Code == code;
        }
    }
    class ProviderIndexProvider : IndexProvider<Provider>
    {
        public override void Describe(DescribeContext<Provider> context)
        {
            context.For<ProviderIndex>()
                .Map(provider =>
                {
                    return new ProviderIndex
                    {
                        OID = provider.OID,
                        TradeName = provider.TradeName,
                        ConsumerOID = provider.ExtraDataForProviderModule.ConsumerOID,
                        IsProviderCatalogProductsPublic = provider.IsProviderCatalogProductsPublic,
                        IsLinkedToERP = provider.IsLinkedToERP,
                        Code = provider.ExtraDataForProviderModule.Code
                    };
                });
        }
    }
}

