using KeTePongo.Core.YesSqlCollections;
using KeTePongo.ProviderWebAPI.Indexes;
using KeTePongo.ProviderWebAPI.Models;
using System;

namespace KeTePongo.ProviderWebAPI
{
    public class ModuleCollections : IModuleCollections
    {
        public CollectionEntities[] CollectionEntities =>
            new CollectionEntities[] {
                //Commented while migration from current schema to new schema with a document table per collections is finished
                //new CollectionEntities(nameof(CatalogProducts), typeof(CatalogProducts), typeof(ProviderProductsIndex)),
                //new CollectionEntities(nameof(ConsumerProviderMappings), typeof(ConsumerProviderMappings), typeof(ConsumerProviderMappingIndex)),
                //new CollectionEntities(nameof(ConsumerUser), typeof(ConsumerUser), typeof(ConsumerUserIndex)),
                //new CollectionEntities(nameof(Provider), typeof(Provider), typeof(ProviderIndex)),
                //new CollectionEntities(nameof(ProviderInvitation), typeof(ProviderInvitation), typeof(ProviderInvitationIndex)),
                //new CollectionEntities(nameof(ProviderOrder), typeof(ProviderOrder), typeof(ProviderOrderIndex)),
                //new CollectionEntities(nameof(ProviderUserProfile), typeof(ProviderUserProfile), typeof(ProviderUserProfileIndex)),
            };
    }
}
