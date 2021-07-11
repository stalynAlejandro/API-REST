using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class CatalogProductInConsumerConsumptionIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ConsumerOID { get; set; }
        public long ConsumptionOID { get; set; }
        public int ConsumerProductId { get; set; }
        public string ProductERPId { get; set; }
        public long ProviderOID { get; set; }
        static public Expression<Func<CatalogProductInConsumerConsumptionIndex, bool>> GetExprByProviderOIDConsumerOIDConsumptionOIDProductERPId(long providerOID, long consumerOID, long consumptionOID, string productERPId)
        {
            return i => i.ProviderOID == providerOID && i.ConsumerOID == consumerOID && i.ConsumptionOID == consumptionOID && i.ProductERPId == productERPId;
        }
        static public Expression<Func<CatalogProductInConsumerConsumptionIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
    }
    class CatalogProductInConsumerConsumptionIndexProvider : IndexProvider<CatalogProductInConsumerConsumption>
    {
        public override void Describe(DescribeContext<CatalogProductInConsumerConsumption> context)
        {
            context.For<CatalogProductInConsumerConsumptionIndex>()
                .Map(catalogProductInConsumerConsumption =>
                {
                    return new CatalogProductInConsumerConsumptionIndex
                    {
                        OID = catalogProductInConsumerConsumption.OID,
                        ConsumerOID = catalogProductInConsumerConsumption.ConsumerOID,
                        ConsumptionOID = catalogProductInConsumerConsumption.ConsumptionOID,
                        ConsumerProductId = catalogProductInConsumerConsumption.ConsumerProductId,
                        ProductERPId = catalogProductInConsumerConsumption.ProductERPId,
                        ProviderOID = catalogProductInConsumerConsumption.ProviderOID
                    };
                });
        }
    }
}

