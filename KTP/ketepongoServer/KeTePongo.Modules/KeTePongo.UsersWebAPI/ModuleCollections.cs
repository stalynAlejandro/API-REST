using KeTePongo.Core.YesSqlCollections;
using OrchardCore.OpenId.YesSql.Indexes;
using OrchardCore.OpenId.YesSql.Models;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using System;

namespace KeTePongo.UsersWebAPI
{
    public class ModuleCollections : IModuleCollections
    {
        public CollectionEntities[] CollectionEntities =>
            new CollectionEntities[] {
                //Commented while migration from current schema to new schema with a document table per collections is finished
                //new CollectionEntities("OpenId", typeof(OpenIdApplication), typeof(OpenIdScope),
                //        typeof(OpenIdApplicationIndex), typeof(OpenIdAppByRoleNameIndex), typeof(OpenIdAppByLogoutUriIndex), typeof(OpenIdAppByRedirectUriIndex),
                //        typeof(OpenIdScopeIndex), typeof(OpenIdScopeByResourceIndex)
                //    ),
                //new CollectionEntities(nameof(OpenIdAuthorization), typeof(OpenIdAuthorization), typeof(OpenIdAuthorizationIndex)),
                //new CollectionEntities(nameof(OpenIdToken), typeof(OpenIdToken), typeof(OpenIdTokenIndex)),
                //new CollectionEntities(nameof(User), typeof(User), typeof(UserByClaimIndex), typeof(UserByLoginInfoIndex), typeof(UserByRoleNameIndex), typeof(UserIndex), typeof(KeTePongoUserIndex))
            };
    }
}
