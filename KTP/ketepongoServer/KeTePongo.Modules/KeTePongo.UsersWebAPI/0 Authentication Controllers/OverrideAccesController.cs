using AspNet.Security.OpenIdConnect.Primitives;
using KeTePongo.UsersWebAPI.Services;
using KeTePongo.UsersWebAPI.Models.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using OrchardCore.Modules;
using OrchardCore.OpenId;
using OrchardCore.OpenId.Controllers;
using OrchardCore.OpenId.Abstractions.Managers;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Localization;
using OrchardCore.Users.Services;
using OrchardCore.Environment.Shell;
using Microsoft.Extensions.Logging;
using OrchardCore.Users;
using Microsoft.AspNetCore;
using OpenIddict.Abstractions;
using System.Security.Claims;
using OpenIddict.Server;
using OrchardCore.Security.Services;


using System.Collections.Generic;
using System.Collections.Immutable;
using System.Diagnostics;
using System.Linq;
using AspNet.Security.OpenIdConnect.Extensions;

using Microsoft.AspNetCore.Authentication;

using Microsoft.AspNetCore.Http;

using OpenIddict.Mvc.Internal;

using OrchardCore.OpenId.Filters;
using OrchardCore.OpenId.ViewModels;
using OrchardCore.Routing;
using KeTePongo.UsersWebAPI.AppServices;
using KeTePongo.Core.AppServices;

namespace KeTePongo.UsersWebAPI.Authentication_Controllers
{
    [Authorize, Feature(OpenIdConstants.Features.Server)]
    public class OverrideAccesController : AccessController
    {
        private readonly IOpenIdApplicationManager _applicationManager;
        private readonly IStringLocalizer S;
        private readonly IOpenIdScopeManager _scopeManager;
        private readonly ShellSettings _shellSettings;
        private readonly IOpenIdAppProviderAppService _openIdAppProviderAppService;
        public OverrideAccesController(IOpenIdApplicationManager applicationManager,
            UserManager<IUser> userManager,
            IOpenIdAuthorizationManager authorizationManager,
            IStringLocalizer<AccessController> localizer,
            IUserService userService,
            IOpenIdAppProviderAppService openIdAppProviderAppService,
            IOpenIdScopeManager scopeManager,
            ShellSettings shellSettings,
            ILogger<OverrideAccesController> logger) : base(applicationManager, authorizationManager, localizer, scopeManager, shellSettings)
        {
            _applicationManager = applicationManager;
            S = localizer;
            _scopeManager = scopeManager;
            _shellSettings = shellSettings;
            _openIdAppProviderAppService = openIdAppProviderAppService;
        }

        [AllowAnonymous, HttpPost("/connect/token")]
        [IgnoreAntiforgeryToken]
        [Produces("application/json")]
        [ApiExplorerSettings(IgnoreApi = true)]
        public new async Task<IActionResult> Token([ModelBinder(typeof(OpenIddictMvcBinder))] OpenIdConnectRequest request)
        {
            if (request.IsClientCredentialsGrantType())
            {
                return await ExchangeClientCredentialsGrantType(request);
            }
            else
                return await base.Token(request);
        }
        private async Task<IActionResult> ExchangeClientCredentialsGrantType(OpenIdConnectRequest request)
        {
            // Note: client authentication is always enforced by OpenIddict before this action is invoked.
            var application = await _applicationManager.FindByClientIdAsync(request.ClientId);
            if (application == null)
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIddictConstants.Errors.InvalidClient,
                    ErrorDescription = S["The specified 'client_id' parameter is invalid."]
                });
            }

            var identity = new ClaimsIdentity(
                OpenIddictServerDefaults.AuthenticationScheme,
                OpenIddictConstants.Claims.Name,
                OpenIddictConstants.Claims.Role);
           

            identity.AddClaim(OpenIdConstants.Claims.EntityType, OpenIdConstants.EntityTypes.Application,
                OpenIddictConstants.Destinations.AccessToken,
                OpenIddictConstants.Destinations.IdentityToken);

            identity.AddClaim(OpenIddictConstants.Claims.Subject, request.ClientId,
                OpenIddictConstants.Destinations.AccessToken,
                OpenIddictConstants.Destinations.IdentityToken);

            identity.AddClaim(OpenIddictConstants.Claims.Name,
                await _applicationManager.GetDisplayNameAsync(application),
                OpenIddictConstants.Destinations.AccessToken,
                OpenIddictConstants.Destinations.IdentityToken);

        var openIdAppProviderDTO = await _openIdAppProviderAppService.GetAsync(request.ClientId);

            identity.AddClaim(CrossModuleClaims.ProviderOID, openIdAppProviderDTO.ProviderOID.ToString(), OpenIddictConstants.Destinations.AccessToken,
                    OpenIddictConstants.Destinations.IdentityToken);

            // If the role service is available, add all the role claims
            // associated with the application roles in the database.
            var roleService = HttpContext.RequestServices.GetService<IRoleService>();

            foreach (var role in await _applicationManager.GetRolesAsync(application))
            {
                identity.AddClaim(identity.RoleClaimType, role,
                    OpenIddictConstants.Destinations.AccessToken,
                    OpenIddictConstants.Destinations.IdentityToken);

                if (roleService != null)
                {
                    foreach (var claim in await roleService.GetRoleClaimsAsync(role))
                    {
                        identity.AddClaim(claim.SetDestinations(
                            OpenIdConnectConstants.Destinations.AccessToken,
                            OpenIdConnectConstants.Destinations.IdentityToken));
                    }
                }
            }

            var ticket = new AuthenticationTicket(
                new ClaimsPrincipal(identity),
                new AuthenticationProperties(),
                OpenIddictServerDefaults.AuthenticationScheme);

            ticket.SetResources(await GetResourcesAsync(request.GetScopes()));

            return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
        }
        private async Task<IEnumerable<string>> GetResourcesAsync(IEnumerable<string> scopes)
        {
            // Note: the current tenant name is always added as a valid resource/audience,
            // which allows the end user to use the corresponding tokens with the APIs
            // located in the current tenant without having to explicitly register a scope.
            var resources = new List<string>(1);
            resources.Add(OpenIdConstants.Prefixes.Tenant + _shellSettings.Name);
            resources.AddRange(await _scopeManager.ListResourcesAsync(scopes.ToImmutableArray()));

            return resources;
        }
    }
}
