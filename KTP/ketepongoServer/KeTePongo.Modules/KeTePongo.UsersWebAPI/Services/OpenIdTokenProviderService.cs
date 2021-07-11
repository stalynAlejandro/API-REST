using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Extensions;
using AspNet.Security.OpenIdConnect.Primitives;
using KeTePongo.UsersWebAPI.Models.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Identity;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using OrchardCore.OpenId;
using OrchardCore.OpenId.Abstractions.Managers;
using OrchardCore.Users;
using OrchardCore.Users.Services;

namespace KeTePongo.UsersWebAPI.Services
{
    public class OpenIdTokenProviderService : IOpenIdTokenProviderService
    {
        private readonly IEnumerable<IExternalTokenProviderService> _externalTokenProviderServices;
        private readonly UserManager<IUser> _userManager;
        private readonly IUserService _userService;
        private readonly IOpenIdApplicationManager _applicationManager;
        private readonly IOpenIdAuthorizationManager _authorizationManager;
        private readonly IOpenIdScopeManager _scopeManager;

        public OpenIdTokenProviderService(IEnumerable<IExternalTokenProviderService> externalTokenProviderServices,
             UserManager<IUser> userManager,
             IOpenIdApplicationManager applicationManager,
             IOpenIdAuthorizationManager authorizationManager,
             IUserService userService,
             IOpenIdScopeManager scopeManager
             )
        {
            _externalTokenProviderServices = externalTokenProviderServices;
            _userManager = userManager;
            _applicationManager = applicationManager;
            _authorizationManager = authorizationManager;
            _userService = userService;
            _scopeManager = scopeManager;
        }

        public async Task<AuthenticationTicket> GetOpenIdAuthenticationTicketAsync(ExternalProviderAccessTokenRequest accessTokenRequest)
        {
            IExternalTokenProviderService tokenProvider;
            switch (accessTokenRequest.Provider)
            {
                case "google":
                    tokenProvider = _externalTokenProviderServices.First(x => x.GetType() == typeof(GoogleTokenProviderService));
                    break;
                default:
                    throw new Exception(string.Format("Token provider {0} was not found", accessTokenRequest.Provider));
            }

            var accessToken = await tokenProvider.GetAccessTokenAsync(accessTokenRequest);
            var email = tokenProvider.GetEmail(accessToken);

            return await CreateOpenIdAccesTokenAsync(email);
        }

        public async Task<AuthenticationTicket> CreateOpenIdAccesTokenAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                throw new Exception(string.Format("User with e-mail {0} is not registered", email));
            }
            return await CreateOpenIdAccesTokenAsync(user);
        }

        public async Task<AuthenticationTicket> CreateOpenIdAccesTokenAsync(IUser user)
        {
            var application = await _applicationManager.FindByClientIdAsync("KeTePongoConsumerApp");
            var principal = await _userService.CreatePrincipalAsync(user);

            var authorizations = await _authorizationManager.FindAsync(
                subject: GetUserIdentifier(principal),
                client: await _applicationManager.GetIdAsync(application),
                status: OpenIddictConstants.Statuses.Valid,
                type: OpenIddictConstants.AuthorizationTypes.Permanent,
                scopes: ImmutableArray.CreateRange(new string[] { "openid", "profile", "roles", "offline_access" }));

            return await CreateUserTicketAsync(principal, application, authorizations.LastOrDefault());
        }

        private async Task<AuthenticationTicket> CreateUserTicketAsync(
           ClaimsPrincipal principal, object application, object authorization, AuthenticationProperties properties = null)
        {
            var identity = (ClaimsIdentity)principal.Identity;
            if (string.IsNullOrEmpty(principal.FindFirst(OpenIdConstants.Claims.EntityType)?.Value))
            {
                identity.AddClaim(OpenIdConstants.Claims.EntityType, OpenIdConstants.EntityTypes.User,
                    OpenIddictConstants.Destinations.AccessToken,
                    OpenIddictConstants.Destinations.IdentityToken);
            }

            if (string.IsNullOrEmpty(principal.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value))
            {
                identity.AddClaim(new Claim(OpenIdConnectConstants.Claims.Subject, GetUserIdentifier(principal)));
            }

            var ticket = new AuthenticationTicket(principal, properties,
                OpenIddictServerDefaults.AuthenticationScheme);

            ticket.SetScopes(new string[] { "openid", "profile", "roles", "offline_access" });
            ticket.SetResources(await GetResourcesAsync(new string[] { "openid", "profile", "roles", "offline_access" }));

            if (authorization == null)
            {
                authorization = await _authorizationManager.CreateAsync(
                    principal: ticket.Principal,
                    subject: GetUserIdentifier(principal),
                    client: await _applicationManager.GetIdAsync(application),
                    type: OpenIddictConstants.AuthorizationTypes.Permanent,
                    scopes: ImmutableArray.CreateRange(ticket.GetScopes()),
                    properties: ImmutableDictionary.CreateRange(ticket.Properties.Items));
            }
            // Attach the authorization identifier to the authentication ticket.
            ticket.SetInternalAuthorizationId(await _authorizationManager.GetIdAsync(authorization));
            foreach (var claim in ticket.Principal.Claims)
            {
                if (claim.Type == "AspNet.Identity.SecurityStamp")
                {
                    continue;
                }

                var destinations = new List<string>
                {
                    OpenIddictConstants.Destinations.AccessToken
                };

                if ((claim.Type == OpenIddictConstants.Claims.Name && ticket.HasScope(OpenIddictConstants.Scopes.Profile)) ||
                    (claim.Type == OpenIddictConstants.Claims.Email && ticket.HasScope(OpenIddictConstants.Scopes.Email)) ||
                    (claim.Type == OpenIddictConstants.Claims.Role && ticket.HasScope(OpenIddictConstants.Claims.Roles)) ||
                    (claim.Type == OpenIdConstants.Claims.EntityType))
                {
                    destinations.Add(OpenIddictConstants.Destinations.IdentityToken);
                }

                claim.SetDestinations(destinations);
            }

            return ticket;
        }

        private async Task<IEnumerable<string>> GetResourcesAsync(IEnumerable<string> scopes)
        {
            var resources = new List<string>(1);
            resources.Add(OpenIdConstants.Prefixes.Tenant + "Default");
            resources.AddRange(await _scopeManager.ListResourcesAsync(scopes.ToImmutableArray()));
            return resources;
        }

        public string GetUserIdentifier(ClaimsPrincipal principal)
        => principal.FindFirst(OpenIdConnectConstants.Claims.Subject)?.Value ??
           principal.FindFirst(ClaimTypes.NameIdentifier)?.Value ??
           principal.FindFirst(ClaimTypes.Upn)?.Value ??
           throw new InvalidOperationException("No suitable user identifier can be found in the principal.");

        public async Task LogoutAsync(IUser user, string userId)
        {
            var application = await _applicationManager.FindByClientIdAsync("KeTePongoConsumerApp");
            var authorization = await _authorizationManager.FindAsync(
                subject: userId,
                client: await _applicationManager.GetIdAsync(application),
                status: OpenIddictConstants.Statuses.Valid,
                type: OpenIddictConstants.AuthorizationTypes.Permanent,
                scopes: ImmutableArray.CreateRange(new string[] { "openid", "profile", "roles", "offline_access" }));

            if (authorization.Any())
            {
                await _authorizationManager.RevokeAsync(authorization[0]);
            }
        }
    }
}
