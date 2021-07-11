using AspNet.Security.OAuth.Validation;
using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Users.Models;
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
    public class ConfirmNewUserController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<ConfirmNewUserController> _logger;
        private readonly IAuthorizationService _authorizationService;
        
        private readonly IStringLocalizer S;

        public ConfirmNewUserController(
            IUserAppService userAppService,
            ILogger<ConfirmNewUserController> logger,
            IAuthorizationService authorizationService,
            IStringLocalizer<ConfirmNewUserController> localizer)
        {
            S = localizer;
            _userAppService = userAppService;
            _logger = logger;
            _authorizationService = authorizationService;
        }
        [HttpGet]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<ActionResult> GetAsync(string code)
        {
            if (code == null)
            {
                ModelState.AddModelError(nameof(code), S["The code is required"]);
                return ValidationProblem();
            }
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ConfirmNewUserEmail))
            {
                return ValidationProblem();
            }
            var result = await _userAppService.ConfirmNewUserEmailAsync(User, code,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!result || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            return Ok(S["After validating your email, the user was granted with more permissions, please refresh your access token to get claims with new permissions"]);
        }
    }
}