using OrchardCore.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using KeTePongo.Core.AppServices;
using System.Threading.Tasks;
using KeTePongo.Core;

namespace KeTePongo.ProviderWebAPI
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageAllProviders = new Permission(nameof(ManageAllProviders), "Manage all Providers from dashboard");

        public static readonly Permission ViewOwnProviderMappings = new Permission(nameof(ViewOwnProviderMappings), "View own provider mappings");

        public static readonly Permission ViewOwnProviderCatalogProducts = new Permission(nameof(ViewOwnProviderCatalogProducts), "View own provider catalog products");

        public static readonly Permission ViewOwnProviderProfile = new Permission(nameof(ViewOwnProviderProfile), "View own provider profile");
        
        public static readonly Permission EditOwnProviderProfile = new Permission(nameof(EditOwnProviderProfile), "Edit own provider profile");

        public static readonly Permission ViewOwnProviderSections = new Permission(nameof(ViewOwnProviderSections), "View own provider sections");
        public static readonly Permission CreateProviderSections = new Permission(nameof(CreateProviderSections), "Create provider sections");
        public static readonly Permission EditOwnProviderSections = new Permission(nameof(EditOwnProviderSections), "Edit own provider sections");
        public static readonly Permission DeleteOwnProviderSections = new Permission(nameof(DeleteOwnProviderSections), "Delete own provider sections");

        public static readonly Permission ViewOwnProviderProducts= new Permission(nameof(ViewOwnProviderProducts), "View own provider products");
        public static readonly Permission EditOwnProviderProducts = new Permission(nameof(EditOwnProviderProducts), "Edit own provider products");
        public static readonly Permission CreateProviderProducts = new Permission(nameof(CreateProviderProducts), "Create provider products");
        public static readonly Permission DeleteOwnProviderProducts = new Permission(nameof(DeleteOwnProviderProducts), "Delete own provider products");

        public static readonly Permission SendProviderInvitations = new Permission(nameof(SendProviderInvitations), "Send provider invitations");

        public static readonly Permission SendERPProviderClients = new Permission(nameof(SendProviderInvitations), "Send ERP provider clients");
        public static readonly Permission SendERPProviderCatalogProducts = new Permission(nameof(SendERPProviderCatalogProducts), "Send ERP provider catalog products");

        public static readonly Permission ViewOwnConsumersOfAProviderSalesman = new Permission(nameof(ViewOwnConsumersOfAProviderSalesman), "View own consumers of a provider salesman");
        public static readonly Permission EditOwnConsumersOfAProviderSalesman = new Permission(nameof(EditOwnConsumersOfAProviderSalesman), "Edit own consumers of a provider salesman");
        public Task<IEnumerable<Permission>> GetPermissionsAsync()
        {
            return Task.FromResult(new[] {
                CrossModulePermissions.CreateOwnProviderProfile, ViewOwnProviderProfile, SendProviderInvitations, ManageAllProviders, EditOwnProviderProfile,
                ViewOwnProviderSections, CreateProviderSections, EditOwnProviderSections, DeleteOwnProviderSections,
                ViewOwnProviderProducts, EditOwnProviderProducts, CreateProviderProducts, DeleteOwnProviderProducts,
                CrossModulePermissions.ViewAllProviderCatalogProducts, ViewOwnProviderCatalogProducts, CrossModulePermissions.CreateOwnConsumerProfile, CrossModulePermissions.ViewProviderInfo,
                ViewOwnConsumersOfAProviderSalesman, EditOwnConsumersOfAProviderSalesman, SendERPProviderClients, SendERPProviderCatalogProducts
            }.AsEnumerable());
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype
                {
                    Name = Roles.NoProviderUserRoleName,
                    Permissions = new Permission[] { CrossModulePermissions.CreateOwnProviderProfile }
                },
                new PermissionStereotype
                {
                    Name = Roles.ProviderUserRoleName,
                    Permissions = GetPermissionsAsync().Result.Where(p => p != EditOwnProviderProfile  
                                                            && p!= SendProviderInvitations 
                                                            && p!= ManageAllProviders
                                                            && p!= EditOwnProviderProducts
                                                            && p!= CrossModulePermissions.CreateOwnConsumerProfile
                                                   ).ToList()
                },
                new PermissionStereotype
                {
                    Name = Roles.ProviderAdminUserRoleName,
                    Permissions = GetPermissionsAsync().Result.Where(p => p!=ManageAllProviders).ToList()
                },
                new PermissionStereotype
                {
                    Name = "Administrator",
                    Permissions = new Permission[] { ManageAllProviders }
                },
                new PermissionStereotype
                {
                    Name = Roles.ERPProviderRoleName,
                    Permissions = new Permission[] { SendERPProviderClients, SendERPProviderCatalogProducts, ViewOwnProviderCatalogProducts }
                },
            };
        }
    }
}