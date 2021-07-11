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
    [AllowAnonymous]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    public class KeTePongoOpenIdAuthProvider : Controller
    {
        private readonly IOpenIdTokenProviderService _openIdTokenProviderService;
        private readonly IUserService _userService;
        private readonly UserManager<IUser> _userManager;
        private IStringLocalizer<KeTePongoOpenIdAuthProvider> S;
        public KeTePongoOpenIdAuthProvider(
            IOpenIdTokenProviderService openIdTokenProviderService, IUserService userService, UserManager<IUser> userManager, IStringLocalizer<KeTePongoOpenIdAuthProvider> stringLocalizer)
        {
            _openIdTokenProviderService = openIdTokenProviderService;
            _userService = userService;
            _userManager = userManager;
            S = stringLocalizer;
        }

        /// <summary>
        /// Retrieves an access token to authenticate against KeTePongo API
        /// </summary>
        /// <returns>An access token valid for authenticating provided by KeTePongo Authorization server</returns>
        /// <response code="200">Returns an access token</response>
        /// <response code="400">The specified username/password couple is invalid or the e-mail was not found. Returns Error and errorDescription</response>       
        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(200, Type = typeof(OpenIdConnectResponse))]
        [ProducesResponseType(400, Type = typeof(OpenIdConnectResponse))]
        public async Task<IActionResult> Token([FromBody] KeTePongoProviderAccessTokenRequest accessTokenRequest)
        {
            string error = null;

            var user = await _userManager.FindByEmailAsync(accessTokenRequest.Email) as User;

            if(user == null)
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIddictConstants.Errors.InvalidGrant,
                    ErrorDescription = S["The specified username/password couple is invalid."]
                });
            }

            var authenticatedUser = await _userService.AuthenticateAsync(user.UserName, accessTokenRequest.Password, (key, message) => error = message);
            if (authenticatedUser == null)
            {
                return BadRequest(new OpenIdConnectResponse
                {
                    Error = OpenIddictConstants.Errors.InvalidGrant,
                    ErrorDescription = S[error]
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

        /// <summary>
        /// Logs out authenticated user from KeTePongo 
        /// </summary>
        /// <returns>Logs out authenticated user from KeTePongo </returns>
        /// <response code="200">Logs out authenticated user from KeTePongo </response>    
        [HttpGet]
        [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
        public async Task<IActionResult>Logout()
        {
            SetRequestAsOpenIdLogout();
            var user = await _userService.GetAuthenticatedUserAsync(User);
            var userId = _userManager.GetUserId(User);
            await _openIdTokenProviderService.LogoutAsync(user, userId);

            await HttpContext.SignOutAsync();
            return SignOut(OpenIddictServerDefaults.AuthenticationScheme);
        }

        private void SetRequestAsOpenIdLogout()
        {//Otherwise OpenIdDict won't allow this endpoint as token endpoint
            var openIdConnectRequest = new OpenIdConnectRequest();
            openIdConnectRequest.SetProperty(OpenIdConnectConstants.Properties.MessageType,
                OpenIdConnectConstants.MessageTypes.LogoutRequest);
            HttpContext.SetOpenIdConnectRequest(openIdConnectRequest);
        }
    }
}
