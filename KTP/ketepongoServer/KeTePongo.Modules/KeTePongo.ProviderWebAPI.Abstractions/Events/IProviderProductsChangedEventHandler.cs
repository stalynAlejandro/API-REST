using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IProviderProductsChangedEventHandler
    {
        Task ProviderProductsChanged(ProviderProductsChangedContext context, Action<string, string> addError);
    }
    public class ProviderProductsChangedContext
    {
        public ProviderProductsChangedContext(long providerOID, IList<ProductChange> productChanges)
        {
            ProviderOID = providerOID;
            ProductChanges = productChanges;
        }
        public long ProviderOID { get; private set; }
        public IList<ProductChange> ProductChanges { get; private set; }
    }
    public class ProductChange
    {
        public static ProductChange CreateProductUpdateChange(int productId, string changedName) 
        {
            return new ProductChange(ProductChangeType.Updated, productId, changedName);
        }
        public static ProductChange CreateProductRemoveChange(int productId)
        {
            return new ProductChange(ProductChangeType.Removed, productId, null);
        }
        private ProductChange(ProductChangeType changeType, int productId, string changedName)
        {
            ChangeType = changeType;
            ProductId = productId;
            ChangedName = changedName;
        }
        public enum ProductChangeType {Updated, Removed}
        public ProductChangeType ChangeType { get; private set; }
        public int ProductId { get; private set; }
        public string ChangedName { get; private set; }
    }
}