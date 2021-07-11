namespace KeTePongo.ProviderWebAPI.Models
{
    public class ProviderInfoAtOrder
    {
        public long? OID { get; set; }
        public int IdForConsumer { get; set; }
        public string TradeName { get; set; }
        public string SalesmanName { get; set; }
        public string SalesmanEmail { get; set; }
        public int? SalesmanUserId { get; set; }
        public string SalesmanTelephone { get; set; }
    }
}
