using AspNet.Security.OpenIdConnect.Primitives;
using KeTePongo.UsersWebAPI.Services;
using KeTePongo.UsersWebAPI.Models.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Authentication_Controllers
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    public class ExternalOpenIdAuthProviderController : Controller
    {
        private readonly IOpenIdTokenProviderService _openIdTokenProviderService;
        public ExternalOpenIdAuthProviderController(
            IOpenIdTokenProviderService openIdTokenProviderService)
        {
            _openIdTokenProviderService = openIdTokenProviderService;
        }

        [HttpPost]
        public async Task<IActionResult> Token([FromBody] ExternalProviderAccessTokenRequest accessTokenRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            SetRequestAsOpenIdTokenRequest();
            try
            {
                var ticket = await _openIdTokenProviderService.GetOpenIdAuthenticationTicketAsync(accessTokenRequest);
                return SignIn(ticket.Principal, ticket.Properties, ticket.AuthenticationScheme); ;
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
