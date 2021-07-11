using AspNet.Security.OAuth.Validation;
using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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
    public class ChangeEmailController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<ChangeEmailController> _logger;
        public ChangeEmailController(
            IUserAppService userAppService,
            ILogger<ChangeEmailController> logger)
        {
            _userAppService = userAppService;
            _logger = logger;
        }
        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UpdatedEmailDTO updateEmailDTO)
        {
            if (!TryValidateModel(updateEmailDTO) || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _userAppService.UpdateEmailAsync(User, updateEmailDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!result || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Accepted("[area]/[controller]");
        }
    }
}
