using AspNet.Security.OAuth.Validation;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;

namespace KeTePongo.UsersWebAPI.Controllers
{
    ///<summary>
    /// Phone Controller
    /// </summary>
    /// <returns></returns>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]

    public class ChangePhoneController : Controller
    {
        private readonly IUserAppService _userAppService;
        private readonly ILogger<ChangePhoneController> _logger;

        public ChangePhoneController(
            IUserAppService userAppService,
            ILogger<ChangePhoneController> logger)
        {
            _userAppService = userAppService;
            _logger = logger;
        }

        [HttpPut]
        public async Task<ActionResult> Put([FromBody] UpdatedPhoneDTO updatedPhoneDTO)
        {
            if (!TryValidateModel(updatedPhoneDTO) || !ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State:  { Json(ModelState) }");
                return ValidationProblem();
            }

            var result = await _userAppService.UpdatePhoneAsync(User, updatedPhoneDTO.NewPhone,
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
