
using OrchardCore.Data.Migration;
using System;
using System.Threading.Tasks;
using KeTePongo.ProviderWebAPI.Indexes;
using YesSql;
using OrchardCore.Users.Models;
using System.Linq;
using System.Collections.Generic;
using KeTePongo.ProviderWebAPI.Models;
using KeTePongo.Core.Extensions;
using Dapper;

namespace KeTePongo.ProviderWebAPI
{
    public class Migrations : DataMigration
    {
        private readonly ISession _session;
        public Migrations(ISession session)
        {
            _session = session;
        }
        public int Create()
        {
            SchemaBuilder.CreateMapIndexTable(nameof(ProviderUserProfileIndex), table => table
               .Column<long>(nameof(ProviderUserProfileIndex.ProviderOID), column => column.NotNull())
               .Column<string>(nameof(ProviderUserProfileIndex.UserName), column => column.NotNull())
               .Column<string>(nameof(ProviderUserProfileIndex.Email))
               .Column<bool>(nameof(ProviderUserProfileIndex.IsActivated))
               .Column<string>(nameof(ProviderUserProfileIndex.Telephone)));
            SchemaBuilder.CreateMapIndexTable(nameof(ConsumerUserIndex), table => table
               .Column<string>(nameof(ConsumerUserIndex.UserName), column => column.NotNull())
               .Column<long>(nameof(ConsumerUserIndex.ConsumerOID), column => column.NotNull())
               .Column<string>(nameof(ConsumerUserIndex.Email)));
            SchemaBuilder.CreateMapIndexTable(nameof(ProviderIndex), table => table
               .Column<long>(nameof(ProviderIndex.OID), column => column.Unique().NotNull())
               .Column<long>(nameof(ProviderIndex.ConsumerOID))
               .Column<bool>(nameof(ProviderIndex.IsProviderCatalogProductsPublic))
               .Column<bool>(nameof(ProviderIndex.IsLinkedToERP))
               .Column<string>(nameof(ProviderIndex.Code))
               .Column<string>(nameof(ProviderIndex.TradeName)));
            SchemaBuilder.CreateMapIndexTable(nameof(ProviderInvitationIndex), table => table
               .Column<long>(nameof(ProviderInvitationIndex.OID), column => column.Unique().NotNull())
               .Column<string>(nameof(ProviderInvitationIndex.Email))
               //.Column<int>(nameof(ProviderInvitationIndex.ProviderInvitationOID), column => column.NotNull())
               .Column<DateTime>(nameof(ProviderInvitationIndex.CreationDate)));
            SchemaBuilder.CreateMapIndexTable(nameof(ProviderOrderIndex), table => table
                .Column<long>(nameof(ProviderOrderIndex.OID), column => column.Unique().NotNull())
                .Column<long>(nameof(ProviderOrderIndex.ConsumerOID), column => column.NotNull())
                .Column<long>(nameof(ProviderOrderIndex.ProviderOID), column => column.NotNull())
                .Column<string>(nameof(ProviderOrderIndex.SalesmanUserName), column => column.Nullable())
                .Column<DateTime>(nameof(ProviderOrderIndex.UtcDateTime))
                .Column<DateTime>(nameof(ProviderOrderIndex.UtcMinimumDeliveryDateTime))
                .Column<bool>(nameof(ProviderOrderIndex.HasAllProductsMappedToProvider))
                .Column<bool>(nameof(ProviderOrderIndex.IsRemoved)));


            SchemaBuilder.CreateMapIndexTable(nameof(ProviderCatalogProductsIndex), table => table
             .Column<long>(nameof(ProviderCatalogProductsIndex.OID), column => column.Unique().NotNull())
             
             .Column<long>(nameof(ProviderCatalogProductsIndex.ProviderOID))
             .Column<string>(nameof(ProviderCatalogProductsIndex.ProviderCode))
             .Column<int>(nameof(ProviderCatalogProductsIndex.ChangeVersion))
             );
            SchemaBuilder.AlterTable(nameof(ProviderCatalogProductsIndex), table =>
            {
                table.CreateIndex($"IX_{nameof(ProviderCatalogProductsIndex)}_{nameof(ProviderCatalogProductsIndex.OID)}", new[] { "DocumentId", nameof(ProviderCatalogProductsIndex.OID) });
                table.CreateIndex($"IX_{nameof(ProviderCatalogProductsIndex)}_{nameof(ProviderCatalogProductsIndex.ProviderCode)}", new[] { "DocumentId", nameof(ProviderCatalogProductsIndex.ProviderCode) });
                //This line fails but we are in a hurry I have filed an issue to investigate and remove it later https://pccom.atlassian.net/browse/EFO-429 
                //table.DropColumn("ConsumerTelephone");
                table.CreateIndex($"IX_{nameof(ProviderCatalogProductsIndex)}_{nameof(ProviderCatalogProductsIndex.ChangeVersion)}_{nameof(ProviderCatalogProductsIndex.ProviderCode)}", new[] { "DocumentId", nameof(ProviderCatalogProductsIndex.ChangeVersion), nameof(ProviderCatalogProductsIndex.ProviderCode) });
            });
            SchemaBuilder.CreateMapIndexTable(nameof(ERPClientsPortfolioIndex), table => table
               .Column<long>(nameof(ERPClientsPortfolioIndex.OID), column => column.Unique().NotNull())
               .Column<long>(nameof(ERPClientsPortfolioIndex.ProviderOID)));

            SchemaBuilder.CreateMapIndexTable(nameof(ConsumersOfAProviderSalesmanIndex), table => table
              .Column<long>(nameof(ConsumersOfAProviderSalesmanIndex.OID), column => column.Unique().NotNull())
              .Column<long>(nameof(ConsumersOfAProviderSalesmanIndex.ProviderOID))
              .Column<string>(nameof(ConsumersOfAProviderSalesmanIndex.SalesmanUserName))
              .Column<int>(nameof(ConsumersOfAProviderSalesmanIndex.ChangeVersion)));

            SchemaBuilder.CreateMapIndexTable(nameof(CatalogProductInConsumerConsumptionIndex), table => table
            .Column<long>(nameof(CatalogProductInConsumerConsumptionIndex.OID), column => column.Unique().NotNull())
            .Column<long>(nameof(CatalogProductInConsumerConsumptionIndex.ConsumerOID))
            .Column<long>(nameof(CatalogProductInConsumerConsumptionIndex.ConsumptionOID))
            .Column<int>(nameof(CatalogProductInConsumerConsumptionIndex.ConsumerProductId))
            .Column<string>(nameof(CatalogProductInConsumerConsumptionIndex.ProductERPId))
            .Column<long>(nameof(CatalogProductInConsumerConsumptionIndex.ProviderOID)));
            
            SchemaBuilder.CreateMapIndexTable(nameof(ERPMostConsumedCatalogProductsIndex), table => table
            .Column<long>(nameof(ERPMostConsumedCatalogProductsIndex.OID), column => column.Unique().NotNull())
            .Column<long>(nameof(ERPMostConsumedCatalogProductsIndex.ProviderOID)));


            return 1;
        }

        // NEXT UPDATE AFTER APPLY PREVIOUS UPDATE
        //public int UpdateFrom2()
        //{
        //    To-Do: ConsumerId at ConsumerUserIndex table is empty. Fix it implementing ConsumerUserChangesEventHandlerOnProvider to save on ConsumerUserIndex the use and call AddedUsersToAConsumerAsync for every user to 
        //    update them on server module
        //
        //    return 3;
        //}
    }
}