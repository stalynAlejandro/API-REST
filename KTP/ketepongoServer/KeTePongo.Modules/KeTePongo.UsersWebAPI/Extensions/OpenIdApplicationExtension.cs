using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Newtonsoft.Json.Linq;
using OrchardCore.OpenId.YesSql.Models;
using System;

namespace KeTePongo.UsersWebAPI.Extensions
{
    public static class OpenIdApplicationExtension
    {
        static public Version GetOpenIdAppMinVersion(this OpenIdApplication app)
        {
            if (app.Properties != null && app.Properties.TryGetValue(nameof(OpenIdAppMinVersionDTO.ClientMinVersion), out JToken value))
            {
                return new Version(value.ToObject<string>());
            }
            else
            {
                return new Version();
            }
        }
        static public long GetOpenIdAppProviderOID(this OpenIdApplication app)
        {
            if (app.Properties != null && app.Properties.TryGetValue(nameof(OpenIdAppProviderDTO.ProviderOID), out JToken value))
            {
                return Convert.ToInt64(value.ToString());
            }
            else
            {
                return 0;
            }
        }
        static public OpenIdApplication SetProviderOIDAndDisplayName(this OpenIdApplication app, long providerOID, string displayName)
        {
            app.DisplayName = displayName;
            if (app.Properties == null)
            {
                app.Properties = new JObject();
            }
            app.Properties[nameof(OpenIdAppProviderDTO.ProviderOID)] = new JValue(providerOID.ToString());
            return app;
        }
    }
}