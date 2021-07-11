using JWT;
using JWT.Serializers;
using KeTePongo.UsersWebAPI.Models.Authentication;
using KeTePongo.UsersWebAPI.Models.Authentication.Google;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using OrchardCore.Google;
using OrchardCore.Google.Authentication.Services;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Services
{
    public class GoogleTokenProviderService : IExternalTokenProviderService
    {
        private readonly GoogleAuthenticationService _googleAuthenticationService;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IDataProtectionProvider _dataProtectionProvider;

        public GoogleTokenProviderService(GoogleAuthenticationService googleAuthenticationService,
            IHttpContextAccessor httpContextAccessor,
            IDataProtectionProvider dataProtectionProvider)
        {
            _googleAuthenticationService = googleAuthenticationService;
            _httpContextAccessor = httpContextAccessor;
            _dataProtectionProvider = dataProtectionProvider;
        }

        public async Task<AccessToken> GetAccessTokenAsync(ExternalProviderAccessTokenRequest accessTokenRequest)
        {
            GoogleAccessToken token = new GoogleAccessToken();
            List<KeyValuePair<string, string>> nvc = await CreateGoogleAccesTokenRequestPayload(accessTokenRequest);

            using (HttpClient client = new HttpClient())
            {
                using (HttpResponseMessage res = await client.PostAsync("https://www.googleapis.com/oauth2/v4/token", new FormUrlEncodedContent(nvc)))
                {
                    if (res.StatusCode == HttpStatusCode.OK)
                    {
                        using (HttpContent content = res.Content)
                        {
                            string data = await content.ReadAsStringAsync();
                            if (data != null)
                            {
                                token = JsonConvert.DeserializeObject<GoogleAccessToken>(data);
                              
                            }
                        }
                    }
                }
            }
            return token;
        }

        public string GetEmail(AccessToken token)
        {
            var payload = GetIdTokenPayload((token as GoogleAccessToken).id_token);
            return payload.Email;
        }

        private async Task<List<KeyValuePair<string, string>>> CreateGoogleAccesTokenRequestPayload(ExternalProviderAccessTokenRequest accessTokenRequest)
        {
            var settings = await _googleAuthenticationService.GetSettingsAsync();
            var nvc = new List<KeyValuePair<string, string>>();
            nvc.Add(new KeyValuePair<string, string>(nameof(GoogleAccessTokenRequest.Client_id).ToLower(), settings.ClientID));
            nvc.Add(new KeyValuePair<string, string>(nameof(GoogleAccessTokenRequest.Client_secret).ToLower(),
                _dataProtectionProvider.CreateProtector(GoogleConstants.Features.GoogleAuthentication).Unprotect(settings.ClientSecret)));
            nvc.Add(new KeyValuePair<string, string>(nameof(GoogleAccessTokenRequest.Code).ToLower(), accessTokenRequest.Code));
            nvc.Add(new KeyValuePair<string, string>(nameof(GoogleAccessTokenRequest.Grant_type).ToLower(), "authorization_code"));
            nvc.Add(new KeyValuePair<string, string>(nameof(GoogleAccessTokenRequest.Redirect_uri).ToLower(), accessTokenRequest.Redirect_uri));
            nvc.Add(new KeyValuePair<string, string>(nameof(GoogleAccessTokenRequest.Scope).ToLower(), "profile"));
            return nvc;
        }

        private GoogleIdTokenPayload GetIdTokenPayload(string idToken)
        {
            IJsonSerializer serializer = new JsonNetSerializer();
            IDateTimeProvider provider = new UtcDateTimeProvider();
            IJwtValidator validator = new JwtValidator(serializer, provider);
            IBase64UrlEncoder urlEncoder = new JwtBase64UrlEncoder();
            IJwtDecoder decoder = new JwtDecoder(serializer, validator, urlEncoder);
            return JsonConvert.DeserializeObject<GoogleIdTokenPayload>(decoder.Decode(idToken));
        }
    }
}
