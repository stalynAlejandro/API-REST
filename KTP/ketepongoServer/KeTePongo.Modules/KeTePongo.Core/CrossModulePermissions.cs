using OrchardCore.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Core
{
    public static class CrossModulePermissions
    {
        public static readonly Permission CreateOwnConsumerProfile = new Permission(nameof(CreateOwnConsumerProfile), "Create own consumer profile");
        public static readonly Permission CreateOwnProviderProfile = new Permission(nameof(CreateOwnProviderProfile), "Create own provider profile");
        public static readonly Permission ViewProviderInfo = new Permission(nameof(ViewProviderInfo), "View provider info");
        public static readonly Permission ViewAllProviderCatalogProducts = new Permission(nameof(ViewAllProviderCatalogProducts), "View all provider catalog products");
    }
}
