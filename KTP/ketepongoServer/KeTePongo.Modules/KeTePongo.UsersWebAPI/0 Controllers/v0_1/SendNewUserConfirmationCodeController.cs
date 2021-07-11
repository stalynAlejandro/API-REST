using AspNet.Security.OAuth.Validation;
using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Users.Services;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Controllers.v0_1
{
    /// <summary> 
    /// User interaction
    /// </summary>
    /// <returns></returns>
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class SendNewUserConfirmationCodeController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<SendNewUserConfirmationCodeController> _logger;
        private readonly IAuthorizationService _authorizationService;

        public SendNewUserConfirmationCodeController(
            IUserAppService userAppService,
            ILogger<SendNewUserConfirmationCodeController> logger,
            IAuthorizationService authorizationService)
        {
            _userAppService = userAppService;
            _logger = logger;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<ActionResult> Get()
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ConfirmNewUserEmail))
            {
                return Unauthorized();
            }
            await _userAppService.SendNewUserConfirmationCodeAsync(User.Identity.Name,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok();
        }
    }
}