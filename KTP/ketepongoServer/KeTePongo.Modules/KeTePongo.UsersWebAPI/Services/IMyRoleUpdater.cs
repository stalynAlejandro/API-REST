using System.Collections.Generic;
using System.Threading.Tasks;
using OrchardCore.Environment.Extensions.Features;

namespace KeTePongo.UsersWebAPI.Services
{
    public interface IMyRoleUpdater
    {
        Task AddDefaultRolesForFeatureAsync(IFeatureInfo feature);
        Task RevokePermissionForRolesForFeatureAsync(IFeatureInfo feature, List<string> roleNamesToRevoke);
    }
}