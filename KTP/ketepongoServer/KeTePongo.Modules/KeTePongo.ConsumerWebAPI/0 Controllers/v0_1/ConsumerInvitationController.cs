using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.AppServices;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System;
using KeTePongo.Core.Services;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.Core.AppServices;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI;
using Microsoft.Extensions.Localization;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.Versioning;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    /// <summary> 
    /// User interaction
    /// </summary>
    /// <returns></returns>
    [Version("0.1.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConsumerInvitationController : Controller
    {
        private readonly IConsumerUserProfileAppService _consumerUserProfileAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger<ConsumerInvitationController> _logger;
        public ConsumerInvitationController(
            IConsumerUserProfileAppService consumerUserProfileAppService,
            ILogger<ConsumerInvitationController> logger,
            IAuthorizationService authorizationService
            )
        {
            _consumerUserProfileAppService = consumerUserProfileAppService;
            _authorizationService = authorizationService;
            _logger = logger;
        }

        [HttpPost]
        public async Task<ActionResult<ConsumerInvitationDTO>> Post(List<NewConsumerInvitationDTO> newConsumerInvitations)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.SendConsumerInvitations)))
            {
                _logger.LogInformation($"User {User.Identity} has not allowed to send invitations");
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }

            List<ConsumerInvitationDTO> consumerInvitations = await _consumerUserProfileAppService.CreateConsumerInvitationAsync(newConsumerInvitations, new ConsumerClaimsPrincipal(User), Url, HttpContext.Request.Scheme,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
 
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return this.Created("[area]/[controller]", consumerInvitations);
        }
    }
}