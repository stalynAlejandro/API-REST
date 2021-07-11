using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using OrchardCore.OpenId.YesSql.Models;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading;
using Newtonsoft.Json.Linq;
using System.Threading.Tasks;
using KeTePongo.UsersWebAPI.Extensions;
using OrchardCore.Navigation;
using OpenIddict.Abstractions;
using Microsoft.Extensions.Caching.Memory;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public class OpenIdAppMinVersionAppService : IOpenIdAppMinVersionAppService
    {
        const string OpenIdApplicationVersionCacheKey = "OpenIdApplicationVersion_";
        IOpenIddictApplicationStore<OpenIdApplication> _openIdAppStore;
        private readonly IMemoryCache _memoryCache;

        public OpenIdAppMinVersionAppService(IOpenIddictApplicationStoreResolver openIdAppStore, IMemoryCache memoryCache)
        {
            _openIdAppStore = openIdAppStore.Get<OpenIdApplication>();
            _memoryCache = memoryCache;
        }
        public async Task<bool> HasToUpdateAsync(string clientId, Version clientVersion, Action<string, string> addError)
        {
            if (string.IsNullOrWhiteSpace(clientId) || clientVersion == null)
            {
                return true;
            }
            var clientApp = await _memoryCache.GetOrCreateAsync<OpenIdAppMinVersionDTO>(OpenIdApplicationVersionCacheKey + clientId, async cacheEntry =>
            {
                cacheEntry.SetPriority(CacheItemPriority.NeverRemove);
                return await GetAsync(clientId);
            });
            if (clientApp == null)
            {
                return false;
            }
            return clientVersion < clientApp.ClientMinVersion;
        }
        public async Task<IEnumerable<OpenIdAppMinVersionDTO>> GetAllAsync(Pager pager = null)
        {
            var result = new List<OpenIdAppMinVersionDTO>();
            var cancellationToken = new CancellationToken();
            int? pageIndex = pager != null ? (pager.PageSize * (pager.Page - 1)): (int?)null;
            foreach (var app in await _openIdAppStore.ListAsync(pager?.PageSize, pageIndex, cancellationToken))
            {
                result.Add(MapOpenIdApplicationToOpenIdAppsWithMinVersionDTO(app));
            }
            return result;
        }
        public async Task<long> GetCountAsync()
        {
            return await _openIdAppStore.CountAsync(new CancellationToken());
        }
        public async Task<OpenIdAppMinVersionDTO> GetAsync(string clientId)
        {
            var result = new List<OpenIdAppMinVersionDTO>();
            var cancellationToken = new CancellationToken();
            var app = await _openIdAppStore.FindByClientIdAsync(clientId, cancellationToken);
            return MapOpenIdApplicationToOpenIdAppsWithMinVersionDTO(app);
        }

        public async Task<bool> UpdateAsync(string clientId, UpdatedOpenIdAppMinVersionDTO openIdAppDTO, Action<string, string> addError)
        {
            if (openIdAppDTO is null)
            {
                throw new ArgumentNullException(nameof(openIdAppDTO));
            }

            var result = new List<OpenIdAppMinVersionDTO>();
            var cancellationToken = new CancellationToken();
            var openidApp = await _openIdAppStore.FindByClientIdAsync(clientId, cancellationToken);
            openidApp = MapOpenIdAppsMinVersionDTOToMapOpenIdApplication(openIdAppDTO, openidApp);
            _memoryCache.Remove(OpenIdApplicationVersionCacheKey + clientId);
            await _openIdAppStore.UpdateAsync(openidApp, cancellationToken);
            return true;
        }
        private OpenIdApplication MapOpenIdAppsMinVersionDTOToMapOpenIdApplication(UpdatedOpenIdAppMinVersionDTO appDTO, OpenIdApplication app)
        {
            app.DisplayName = appDTO.DisplayName;
            if (app.Properties == null)
            {
                app.Properties = new JObject();
            }
            app.Properties[nameof(OpenIdAppMinVersionDTO.ClientMinVersion)] = new JValue(appDTO.ClientMinVersion.ToString());
            return app;
        }
        private OpenIdAppMinVersionDTO MapOpenIdApplicationToOpenIdAppsWithMinVersionDTO(OpenIdApplication app)
        {
            
            var appDTO = new OpenIdAppMinVersionDTO();
            appDTO.ClientId = app.ClientId;
            appDTO.DisplayName = app.DisplayName;
            appDTO.ClientMinVersion = app.GetOpenIdAppMinVersion();
            return appDTO;
        }
    }
}