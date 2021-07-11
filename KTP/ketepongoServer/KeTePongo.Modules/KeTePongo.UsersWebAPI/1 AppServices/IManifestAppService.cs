using KeTePongo.Core.Versioning;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public interface IManifestAppService
    {
        public APIModuleAttribute GetManifest();
    }
}