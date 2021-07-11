using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.ProviderWebAPI.Abstractions.Events
{
    public interface IERPProviderCatalogProductsChangesEventHandler
    {
        Task UpdatedERPProviderCatalogProductsAsync(ERPProviderCatalogProductsChangesContext context, Action<string, string> addError);
    }
    public class ERPProviderCatalogProductsChangesContext
    {
        public ERPProviderCatalogProductsChangesContext(long providerOID,long consumptionOID, ERPProviderCatalogProductsChangesDTO erpProviderCatalogProductsChangesDTO)
        {
            ERPProviderCatalogProductsChangesDTO = erpProviderCatalogProductsChangesDTO;
            ProviderOID = providerOID;
            ConsumptionOID = consumptionOID;
        }
        public ERPProviderCatalogProductsChangesDTO ERPProviderCatalogProductsChangesDTO { get; private set; }
        public long ProviderOID { get; private set; }
        public long ConsumptionOID { get; private set; }
    }
}