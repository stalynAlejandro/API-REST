using System;
using OrchardCore.Security.Permissions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeTePongo.SMS
{
    public class Permissions : IPermissionProvider
    {
        public static readonly Permission ManageSMSSettings = new Permission("ManageSMSSettings", "Manage SMS Settings");

        public Task<IEnumerable<Permission>> GetPermissionsAsync()
        {
            return Task.FromResult(new[]
            {
                ManageSMSSettings
            }
            .AsEnumerable());
        }

        public IEnumerable<PermissionStereotype> GetDefaultStereotypes()
        {
            return new[]
            {
                new PermissionStereotype
                {
                    Name = "Administrator",
                    Permissions = new[] { ManageSMSSettings }
                },
            };
        }
    }
}