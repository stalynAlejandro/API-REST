using AspNet.Security.OAuth.Validation;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using OrchardCore.Users.Services;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI._0_Controllers
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConfirmUserTelephoneController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<ConfirmUserTelephoneController> _logger;
        public ConfirmUserTelephoneController(IUserAppService userAppService, ILogger<ConfirmUserTelephoneController> logger)
        {
            _userAppService = userAppService;
            _logger = logger;
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] ConfirmUserPhoneDTO confirmUserPhoneDTO)
        {
            if (!TryValidateModel(confirmUserPhoneDTO) || !ModelState.IsValid)
            {
                return ValidationProblem(ModelState);
            }

            await _userAppService.ConfirmTelephoneAsync(User, confirmUserPhoneDTO, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            return Accepted("[area]/[controller]");
        }
    }
}
