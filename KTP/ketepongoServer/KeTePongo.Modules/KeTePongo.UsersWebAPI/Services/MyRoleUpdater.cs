using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using global::OrchardCore.Security;
using global::OrchardCore.Security.Permissions;
using global::OrchardCore.Environment.Extensions;
using global::OrchardCore.Environment.Extensions.Features;

namespace KeTePongo.UsersWebAPI.Services
{
    public class MyRoleUpdater : IMyRoleUpdater
    {
        private readonly RoleManager<IRole> _roleManager;
        private readonly IEnumerable<IPermissionProvider> _permissionProviders;
        private readonly ITypeFeatureProvider _typeFeatureProvider;

        public MyRoleUpdater(
            RoleManager<IRole> roleManager,
            IEnumerable<IPermissionProvider> permissionProviders,
            ITypeFeatureProvider typeFeatureProvider,
            ILogger<MyRoleUpdater> logger)
        {
            _typeFeatureProvider = typeFeatureProvider;
            _roleManager = roleManager;
            _permissionProviders = permissionProviders;

            Logger = logger;
        }

        public ILogger Logger { get; set; }

        public async Task AddDefaultRolesForFeatureAsync(IFeatureInfo feature)
        {
            var providersForEnabledModule = _permissionProviders
                .Where(x => _typeFeatureProvider.GetFeatureForDependency(x.GetType()).Id == feature.Id);

            if (Logger.IsEnabled(LogLevel.Debug))
            {
                if (providersForEnabledModule.Any())
                {
                    Logger.LogDebug("Configuring default roles for feature '{FeatureName}'", feature.Id);
                }
                else
                {
                    Logger.LogDebug("No default roles for feature '{FeatureName}'", feature.Id);
                }
            }

            foreach (var permissionProvider in providersForEnabledModule)
            {
                var stereotypes = permissionProvider.GetDefaultStereotypes();
                foreach (var stereotype in stereotypes)
                {

                    var role = await _roleManager.FindByNameAsync(stereotype.Name);
                    if (role == null)
                    {
                        if (Logger.IsEnabled(LogLevel.Information))
                        {
                            Logger.LogInformation("Defining new role '{RoleName}' for permission stereotype", stereotype.Name);
                        }

                        role = new Role { RoleName = stereotype.Name };
                        await _roleManager.CreateAsync(role);
                    }

                    var stereotypePermissionNames = (stereotype.Permissions ?? Enumerable.Empty<Permission>()).Select(x => x.Name);
                    var currentPermissionNames = ((Role)role).RoleClaims.Where(x => x.ClaimType == Permission.ClaimType).Select(x => x.ClaimValue);

                    var distinctPermissionNames = currentPermissionNames
                        .Union(stereotypePermissionNames)
                        .Distinct();

                    var additionalPermissionNames = distinctPermissionNames.Except(currentPermissionNames);

                    if (additionalPermissionNames.Any())
                    {
                        foreach (var permissionName in additionalPermissionNames)
                        {
                            if (Logger.IsEnabled(LogLevel.Debug))
                            {
                                Logger.LogDebug("Default role '{Role}' granted permission '{Permission}'", stereotype.Name, permissionName);
                            }

                            await _roleManager.AddClaimAsync(role, new Claim(Permission.ClaimType, permissionName));
                        }
                    }
                }
            }
        }

        public async Task RevokePermissionForRolesForFeatureAsync(IFeatureInfo feature, List<string> roleNamesToRevoke)
        {
            var providersForEnabledModule = _permissionProviders
                .Where(x => _typeFeatureProvider.GetFeatureForDependency(x.GetType()).Id == feature.Id);

            foreach (var permissionProvider in providersForEnabledModule)
            {
                var permissions = await permissionProvider.GetPermissionsAsync();
                foreach (var roleToRevoke in roleNamesToRevoke)
                {
                    var role = await _roleManager.FindByNameAsync(roleToRevoke);
                    if (role != null)
                    {
                        var permissionsToRemove = ((Role)role).RoleClaims.Where(x => x.ClaimType == Permission.ClaimType &&  permissions.Any(p=> p.Name == x.ClaimValue)).Select(e=>e.ToClaim()).ToList();
                        if (permissionsToRemove.Any())
                        {
                            for (int i = permissionsToRemove.Count-1; i >= 0; i--)
                            {
                                await _roleManager.RemoveClaimAsync(role, permissionsToRemove[i]);
                            }
                        }
                    }
                }
            }
        }
    }
}