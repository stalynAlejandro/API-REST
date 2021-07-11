using KeTePongo.Core.Versioning;
using Microsoft.Extensions.Caching.Memory;
using OrchardCore.Modules;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public class ManifestAppService: IManifestAppService
    {
        private const string ManifesKey = "KetePongo.UsersWebAPI.Manifest";
        private readonly IApplicationContext _applicationContext;
        private readonly IMemoryCache _memoryCache;
        public ManifestAppService(IApplicationContext applicationContext, IMemoryCache memoryCache)
        {
            _applicationContext = applicationContext;
            _memoryCache = memoryCache;
        }
        public APIModuleAttribute GetManifest()
        {
            var manifest = _memoryCache.GetOrCreate<APIModuleAttribute>(ManifesKey, (cacheEntry) =>
            {
                cacheEntry.SetPriority(CacheItemPriority.NeverRemove);
                var apiModuleAttribute = _applicationContext.Application.GetModule(this.GetType().Assembly.GetName().Name).ModuleInfo as APIModuleAttribute;
                return apiModuleAttribute;
            });
            return manifest;
        }
    }
}
