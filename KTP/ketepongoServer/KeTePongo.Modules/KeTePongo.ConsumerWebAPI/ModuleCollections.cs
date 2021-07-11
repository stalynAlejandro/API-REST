using KeTePongo.ConsumerWebAPI.Indexes;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.Core.YesSqlCollections;

namespace KeTePongo.ConsumerWebAPI
{
    public class ModuleCollections : IModuleCollections
    {
        public CollectionEntities[] CollectionEntities =>
            new CollectionEntities[] {
                //Commented while migration from current schema to new schema with a document table per collections is finished
                //new CollectionEntities(nameof(Consumer), typeof(Consumer), typeof(ConsumerIndex)),
                //new CollectionEntities(nameof(ConsumerInvitation), typeof(ConsumerInvitation), typeof(ConsumerInvitationIndex)),
                //new CollectionEntities(nameof(ConsumerOrder), typeof(ConsumerOrder), typeof(ConsumerOrderIndex)),
                //new CollectionEntities(nameof(ConsumerUserProfile), typeof(ConsumerUserProfile), typeof(ConsumerUserProfileIndex)),
                //new CollectionEntities(nameof(Consumption), typeof(Consumption), typeof(ConsumptionIndex))
            };
    }
}
