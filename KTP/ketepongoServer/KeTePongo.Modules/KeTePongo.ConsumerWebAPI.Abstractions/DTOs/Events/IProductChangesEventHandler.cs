using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI.Abstractions.Events
{
    public interface IProductChangesEventHandler
    {
        //Cuando un cliente añade un producto de un proveedor ya enlazado, se añade en el lado comercio y en este handler se añade el mappings con los datos de idproducto e idformato
        Task ConsumerUserAddedProductOfNonRegisteredProvider(ConsumerUserAddedProductOfNonRegisteredProviderContext context, Action<string, string> addError);
        Task ConsumerUserRemovedProductOfNonRegisteredProvider(ConsumerUserRemovedProductOfNonRegisteredProviderContext context, Action<string, string> addError);
        Task ConsumerUserAddedProductOfRegisteredProvider(ConsumerProductChangedOfLinkedProviderContext context, Action<string, string> addError);
        Task ConsumerUserRemovedProductOfRegisteredProvider(ConsumerProductChangedOfLinkedProviderContext context, Action<string, string> addError);
        Task ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSide(ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSideContext context, Action<string, string> addError);
    }
    public class ConsumerUserAddedProductOfNonRegisteredProviderContext
    {
        public ConsumerUserAddedProductOfNonRegisteredProviderContext(
            int consumerOID,
            int localProviderOID,
            int consumerProductId,
            List<string> emails)
        {
            ConsumerOID = consumerOID;
            LocalProviderOID = localProviderOID;
            ConsumerProductId = consumerProductId;
            Emails = emails;
        }
        public int ConsumerOID { get; private set; }
        public int LocalProviderOID { get; private set; }
        public int ConsumerProductId { get; private set; }
        public List<string> Emails { get; private set; }
    }
    public class ConsumerUserRemovedProductOfNonRegisteredProviderContext
    {
        public ConsumerUserRemovedProductOfNonRegisteredProviderContext(
                long consumerOID,
                int localProviderId,
                int consumerProductId)
        {
            ConsumerOID = consumerOID;
            LocalProviderId = localProviderId;
            ConsumerProductId = consumerProductId;
        }
        public long ConsumerOID { get; private set; }
        public int LocalProviderId { get; private set; }
        public int ConsumerProductId { get; private set; }
    }
    public class ConsumerProductChangedOfLinkedProviderContext
    {
        public ConsumerProductChangedOfLinkedProviderContext(
            long consumerOID, 
            long providerOID, 
            int consumerProductId, 
            long consumptionOID, 
            string productERPId)
        {
            ConsumerOID = consumerOID;
            ProviderOID = providerOID;
            ConsumerProductId = consumerProductId;
            ConsumptionOID = consumptionOID;
            ProductERPId = productERPId;
        }
        public long ConsumerOID { get; private set; }
        public long ConsumptionOID { get; set; }
        public int ConsumerProductId { get; private set; }
        public string ProductERPId { get; set; }
        public long ProviderOID { get; set; }
    }

    public class ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSideContext
    {
        public ConsumerServerSideAddedProductsToConsumptionTriggeredByProviderServerSideContext(
            int consumerOID, 
            int providerOID, 
            int consumerProductId, 
            int providerProductId, 
            string providerERPId)
        {
            ConsumerOID = consumerOID;
            ProviderOID = providerOID;
            ConsumerProductId = consumerProductId;
            ProviderProductId = providerProductId;
            ProviderERPId = providerERPId;
        }
        public int ConsumerOID { get; private set; }
        public int ProviderOID { get; private set; }
        public int ConsumerProductId { get; private set; }
        public int ProviderProductId { get; private set; }
        public string ProviderERPId { get; private set; }
    }
}
