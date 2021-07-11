using KeTePongo.Core.Versioning;

namespace KeTePongo.ConsumerWebAPI.AppServices
{
    public interface IManifestAppService
    {
        APIModuleAttribute GetManifest();
    }
}