using AspNet.Security.OAuth.Validation;
using AspNet.Security.OpenIdConnect.Primitives;
using KeTePongo.UsersWebAPI.Services;
using KeTePongo.UsersWebAPI.Models.Authentication;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using OpenIddict.Abstractions;
using OpenIddict.Server;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using OrchardCore.Users.Services;
using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Localization;


namespace KeTePongo.UsersWebAPI.Authentication_Controllers
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    public class UserImpersonation : Controller
    {
        private readonly IOpenIdTokenProviderService _openIdTokenProviderService;
        private readonly UserManager<IUser> _userManager;
        private readonly IAuthorizationService _authorizationService;
        private IStringLocalizer<UserImpersonation> S;

        public UserImpersonation(IOpenIdTokenProviderService openIdTokenProviderService, UserManager<IUser> userManager, IStringLocalizer<UserImpersonation> stringLocalizer, IAuthorizationService authorizationService)
        {
            _openIdTokenProviderService = openIdTokenProviderService;
            _userManager = userManager;
            _authorizationService = authorizationService;
            S = stringLocalizer;
        }

        /// <summary>
        /// Retrieves an access token to authenticate for other user against KeTePongo API
        /// </summary>
        /// <returns>An access token valid for authenticating provided by KeTePongo Authorization server</returns>
        /// <response code="200">Returns an access token</response>
        /// <response code="403">Don't have enough permissions to proceed further. Returns Error and errorDescription</response>       
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(OpenIdConnectResponse))]
        [ProducesResponseType(403, Type = typeof(OpenIdConnectResponse))]
        [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
        public async Task<ActionResult> Token([FromBody] ImpersonationRequestDTO accessRequest)
        {

            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ImpersonateOtherUsers))
            {
                return Unauthorized();
            }

            var user = await _userManager.FindByEmailAsync(accessRequest.UserEmail) as User;

            if (user == null)
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIddictConstants.Errors.InvalidGrant,
                    ErrorDescription = S["The specified user is invalid."]
                });
            }

            if (user.RoleNames.Contains("Administrator"))
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIddictConstants.Errors.InvalidGrant,
                    ErrorDescription = S["Can't impersonate another administrator."]
                });
            }

            SetRequestAsOpenIdTokenRequest();
            try
            {
                var ticket = await _openIdTokenProviderService.CreateOpenIdAccesTokenAsync(user);
                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private void SetRequestAsOpenIdTokenRequest()
        {//Otherwise OpenIdDict won't allow this endpoint as token endpoint
            var openIdConnectRequest = new OpenIdConnectRequest();
            openIdConnectRequest.SetProperty(OpenIdConnectConstants.Properties.MessageType,
                OpenIdConnectConstants.MessageTypes.TokenRequest);
            HttpContext.SetOpenIdConnectRequest(openIdConnectRequest);
        }
    }
}