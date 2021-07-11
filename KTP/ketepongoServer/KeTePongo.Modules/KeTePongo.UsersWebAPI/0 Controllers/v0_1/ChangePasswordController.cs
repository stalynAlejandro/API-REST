using AspNet.Security.OAuth.Validation;
using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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
    public class ChangePasswordController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<ChangeEmailController> _logger;
        
        public ChangePasswordController(
            IUserAppService userAppService,
            ILogger<ChangeEmailController> logger)
        {
            _userAppService = userAppService;
            _logger = logger;
        }
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] ChangePasswordDTO changePasswordDTO)
        {
            if (!TryValidateModel(changePasswordDTO) || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            var result = await _userAppService.ChangePasswordAsync(User, changePasswordDTO,
            (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!result || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            return Accepted("[area]/[controller]");
        }
    }
}