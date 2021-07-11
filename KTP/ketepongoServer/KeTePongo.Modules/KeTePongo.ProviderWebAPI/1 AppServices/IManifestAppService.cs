using KeTePongo.Core.Versioning;

namespace KeTePongo.ProviderWebAPI.AppServices
{
    public interface IManifestAppService
    {
        public APIModuleAttribute GetManifest();
    }
}