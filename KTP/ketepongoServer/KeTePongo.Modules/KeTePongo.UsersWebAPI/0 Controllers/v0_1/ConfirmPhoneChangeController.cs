using AspNet.Security.OAuth.Validation;
using KeTePongo.UsersWebAPI.Abstractions.DTOs;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Users.Models;
using OrchardCore.Users.Services;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Controllers
{
    /// <summary>
    /// Confirm Change Phone
    /// </summary>
    /// <returns></returns>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConfirmPhoneChangeController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<ChangePhoneController> _logger;

        public ConfirmPhoneChangeController(
            IUserAppService userAppService,
            ILogger<ChangePhoneController> logger)
        {
            _userAppService = userAppService;
            _logger = logger;
        }

        [HttpPut]
        public async Task<ActionResult<ConfirmPhoneChangeDTO>> Put([FromBody] ConfirmUserPhoneDTO confirmUserPhoneDTO)
        {
            if (!TryValidateModel(confirmUserPhoneDTO) || !ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            var result = await _userAppService.ConfirmTelephoneAsync(User, confirmUserPhoneDTO, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!result || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            return Accepted(result);
        }
    }
}
