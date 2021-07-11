using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using AspNet.Security.OAuth.Validation;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;

namespace KeTePongo.UsersWebAPI._0_Controllers.v0_1
{
    /// <summary> 
    /// User phone confirmation
    /// </summary>
    /// <returns></returns>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class SendUserTelephoneConfirmationCodeController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<SendUserTelephoneConfirmationCodeController> _logger;
        private readonly IAuthorizationService _authorizationService;

        public SendUserTelephoneConfirmationCodeController(
            ILogger<SendUserTelephoneConfirmationCodeController> logger,
            IAuthorizationService authorizationService,
            IUserAppService userAppService)
        {

            _logger = logger;
            _authorizationService = authorizationService;
            _userAppService = userAppService;
        }

        [HttpGet]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<ActionResult> Get()
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ChangeUserPhone))
            {
                return Unauthorized();
            }

            await _userAppService.SendPhoneConfirmationCodeAsync(User.Identity.Name, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok();
        }
    }
}
