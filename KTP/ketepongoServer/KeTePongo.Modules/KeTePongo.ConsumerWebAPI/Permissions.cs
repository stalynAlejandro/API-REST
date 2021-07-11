using KeTePongo.Core;
using KeTePongo.Core.AppServices;
using OrchardCore.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.ConsumerWebAPI
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageAllConsumers = new Permission(nameof(ManageAllConsumers), "Manage all consumers from dashboard");

        public static readonly Permission ViewOwnConsumerProfile = new Permission(nameof(ViewOwnConsumerProfile), "View own consumer profile");
        public static readonly Permission EditOwnConsumerProfile = new Permission(nameof(EditOwnConsumerProfile), "Edit own consumer profile");

        public static readonly Permission ViewOwnConsumerConsumption = new Permission(nameof(ViewOwnConsumerConsumption), "View own consumer consumption");

        public static readonly Permission ViewOwnConsumerLocations = new Permission(nameof(ViewOwnConsumerLocations), "View own consumer locations");
        public static readonly Permission CreateConsumerLocations = new Permission(nameof(CreateConsumerLocations), "Create consumer locations");
        public static readonly Permission EditOwnConsumerLocations = new Permission(nameof(EditOwnConsumerLocations), "Edit own consumer locations");
        public static readonly Permission DeleteOwnConsumerLocations = new Permission(nameof(DeleteOwnConsumerLocations), "Delete own consumer locations");

        public static readonly Permission ViewOwnConsumerProviders = new Permission(nameof(ViewOwnConsumerProviders), "View own consumer providers");
        public static readonly Permission CreateConsumerProviders = new Permission(nameof(CreateConsumerProviders), "Create consumer providers");
        public static readonly Permission EditOwnConsumerProviders = new Permission(nameof(EditOwnConsumerProviders), "Edit own consumer providers");
        public static readonly Permission DeleteOwnConsumerProviders = new Permission(nameof(DeleteOwnConsumerProviders), "Delete own consumer providers");

        public static readonly Permission ViewOwnConsumerProducts = new Permission(nameof(ViewOwnConsumerProducts), "View own consumer products");
        public static readonly Permission CreateConsumerProducts = new Permission(nameof(CreateConsumerProducts), "Create consumer products");
        public static readonly Permission EditOwnConsumerProducts = new Permission(nameof(EditOwnConsumerProducts), "Edit own consumer products");
        public static readonly Permission DeleteOwnConsumerProducts = new Permission(nameof(DeleteOwnConsumerProducts), "Delete own consumer products");

        public static readonly Permission ViewOwnConsumerOrders = new Permission(nameof(ViewOwnConsumerOrders), "View own consumer orders");
        public static readonly Permission CreateConsumerOrders = new Permission(nameof(CreateConsumerOrders), "Create consumer orders");

        public static readonly Permission SendConsumerInvitations = new Permission(nameof(SendConsumerInvitations), "Send consumer invitations");


        public Task<IEnumerable<Permission>> GetPermissionsAsync()
        {
            return Task.FromResult(new[] {
                CrossModulePermissions.CreateOwnConsumerProfile, ViewOwnConsumerProfile, EditOwnConsumerProfile
                , ViewOwnConsumerConsumption
                , ViewOwnConsumerLocations, CreateConsumerLocations, EditOwnConsumerLocations, DeleteOwnConsumerLocations
                , ViewOwnConsumerProviders, CreateConsumerProviders, EditOwnConsumerProviders, DeleteOwnConsumerProviders
                , ViewOwnConsumerProducts, CreateConsumerProducts, EditOwnConsumerProducts, DeleteOwnConsumerProducts
                , ViewOwnConsumerOrders, CreateConsumerOrders
                , SendConsumerInvitations, CrossModulePermissions.CreateOwnProviderProfile, CrossModulePermissions.ViewProviderInfo, CrossModulePermissions.ViewAllProviderCatalogProducts
            }.AsEnumerable());
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype
                {
                    Name = Roles.ConsumerAnonymousUserRoleName,
                    Permissions = new[] { CrossModulePermissions.ViewAllProviderCatalogProducts }
                },
                new PermissionStereotype
                {
                    Name = Roles.NoConsumerUserRoleName,
                    Permissions = new Permission[] { CrossModulePermissions.CreateOwnConsumerProfile }
                },
                new PermissionStereotype
                {
                    Name = Roles.ConsumerUserRoleName,
                    Permissions = GetPermissionsAsync().Result.Where(p => p != EditOwnConsumerProfile
                                                               && p!= SendConsumerInvitations
                                                               && p!=ManageAllConsumers
                                                               && p!= CrossModulePermissions.CreateOwnProviderProfile
                                                         ).ToList()
                },
                new PermissionStereotype
                {
                    Name = Roles.ConsumerAdminUserRoleName,
                    Permissions = GetPermissionsAsync().Result.Where(p => p!=ManageAllConsumers).ToList()
                },
                new PermissionStereotype
                {
                    Name = "Administrator",
                    Permissions = new Permission[] { ManageAllConsumers }
                },
            };
        }
    }
}