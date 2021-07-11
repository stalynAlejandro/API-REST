using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using KeTePongo.ProviderWebAPI.AppServices;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using KeTePongo.Core.Services;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    /// <summary> 
    /// User interaction
    /// </summary>
    /// <returns></returns>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderInvitationController : Controller
    {
        private readonly IProviderUserProfileAppService _providerUserProfileAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger<ProviderInvitationController> _logger;
        private readonly IInvitationTokenProvider _invitationTokenProvider;

        public ProviderInvitationController(
            IProviderUserProfileAppService providerUserProfileAppService,
            ILogger<ProviderInvitationController> logger,
            IAuthorizationService authorizationService,
            IInvitationTokenProvider invitationTokenProvider
            )
        {
            _providerUserProfileAppService = providerUserProfileAppService;
            _authorizationService = authorizationService;
            _logger = logger;
            _invitationTokenProvider = invitationTokenProvider;
        }

        [HttpPost]
        public async Task<ActionResult<ConsumerInvitationDTO>> Post(List<NewProviderInvitationDTO> newProviderInvitations)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.SendProviderInvitations)))
            {
                _logger.LogInformation($"User {User.Identity} is not allowed to send invitations");
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }

            List<ProviderInvitationDTO> providerInvitations = await _providerUserProfileAppService.CreateProviderInvitationAsync(newProviderInvitations, new ProviderClaimsPrincipal(User), Url, HttpContext.Request.Scheme,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
 
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return this.Created("[area]/[controller]", providerInvitations);
        }
    }
}
