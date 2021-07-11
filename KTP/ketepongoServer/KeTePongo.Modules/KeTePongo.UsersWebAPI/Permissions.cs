using KeTePongo.Core.AppServices;
using OrchardCore.Security.Permissions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageKetepongoUsers = new Permission(nameof(ManageKetepongoUsers), "Manage all ketepongo users from dashboard");
        public static readonly Permission ManageOpenIdAppMinVersion = new Permission(nameof(ManageOpenIdAppMinVersion), "Manage open id client apps minimum version");
        public static readonly Permission ManageOpenIdAppProvider = new Permission(nameof(ManageOpenIdAppProvider), "Manage open id client apps provider");

        public static readonly Permission ConfirmNewUserEmail = new Permission(nameof(ConfirmNewUserEmail), "Confirm new consumer user email");
        public static readonly Permission ImpersonateOtherUsers = new Permission(nameof(ImpersonateOtherUsers), "Impersonate Other Users");

        public static readonly Permission ChangeUserEmail = new Permission(nameof(ChangeUserEmail), "Change User Email");
        public static readonly Permission ChangeUserPhone = new Permission(nameof(ChangeUserPhone), "Change User Phone");
        public Task<IEnumerable<Permission>> GetPermissionsAsync()
        {
            return Task.FromResult(new[] {
                ConfirmNewUserEmail,
                ManageKetepongoUsers,
                ManageOpenIdAppMinVersion,
                ImpersonateOtherUsers,
                ManageOpenIdAppProvider,
                ChangeUserEmail,
                ChangeUserPhone
            }.AsEnumerable());
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[] {
                new PermissionStereotype
                {
                    Name = Roles.PendingConsumerUserRoleName,
                    Permissions = new[] { ConfirmNewUserEmail }
                },
                new PermissionStereotype
                {
                    Name = Roles.PendingProviderUserRoleName,
                    Permissions = new[] { ConfirmNewUserEmail }
                },
                new PermissionStereotype
                {
                    Name = Roles.ConsumerUserRoleName,
                    Permissions = new[] { ChangeUserEmail, ChangeUserPhone }
                },
                new PermissionStereotype
                {
                    Name = Roles.ConsumerAdminUserRoleName,
                    Permissions = new[] { ChangeUserEmail, ChangeUserPhone }
                },
                  new PermissionStereotype
                {
                    Name = Roles.ProviderUserRoleName,
                    Permissions = new[] { ChangeUserEmail, ChangeUserPhone }
                },
                new PermissionStereotype
                {
                    Name = Roles.ProviderAdminUserRoleName,
                    Permissions = new[] { ChangeUserEmail, ChangeUserPhone }
                },
                new PermissionStereotype
                {
                    Name = "Administrator",
                    Permissions = new[] { ManageKetepongoUsers, ManageOpenIdAppMinVersion, ImpersonateOtherUsers, ManageOpenIdAppProvider }
                }
            };
        }
    }
}