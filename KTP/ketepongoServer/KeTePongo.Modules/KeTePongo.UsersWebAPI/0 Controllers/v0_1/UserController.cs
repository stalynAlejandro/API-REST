using AspNet.Security.OAuth.Validation;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Models;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Entities;
using OrchardCore.Users.Models;
using OrchardCore.Users.Services;
using Swashbuckle.AspNetCore.Annotations;
using System.Net;
using System.Threading.Tasks;
using KeTePongo.Core.Versioning;

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
    public class UserController : Controller
    {
        private readonly IUserService _userService;
        private readonly IUserAppService _userAppService;
        private readonly ILogger<UserController> _logger;
        
        public UserController(
            IUserService userService,
            IUserAppService userAppService,
            ILogger<UserController> logger)
        {
            _userService = userService;
            _userAppService = userAppService;
            _logger = logger;
        }

        /// <summary>Gets the user data</summary>
        /// <returns>Gets the user data</returns>
        /// <response code="200">Returns user data</response>
        /// <response code="401">User not authenticated</response>       
        /// <response code="404">Error: Not Found</response>       
        [HttpGet]
        [SwaggerResponse((int)HttpStatusCode.OK, Type = typeof(UserDTO))]
        [ProducesResponseType((int)HttpStatusCode.NotFound, Type = typeof(NotFoundResult))]
        public async Task<ActionResult<UserDTO>> Get()
        {
            var user = await _userService.GetAuthenticatedUserAsync(User) as User;
            if (user == null)
            {
                return NotFound("User not found");
            }
            var userProfile = user.As<UserProfile>();
            return Ok(new UserDTO() { 
                Name = userProfile.Name,  
                Email = user.Email, 
                EmailConfirmed = user.EmailConfirmed, 
                UserPhone = new UserPhoneDTO() {
                    IsPhoneConfirmed = userProfile.IsPhoneConfirmed,
                    PhoneNumber = userProfile.PhoneNumber,
                    NewPhoneNumberRequested = userProfile.NewPhoneNumberRequested,
                    TwoFactorPhoneConfirmationCode = userProfile.TwoFactorPhoneConfirmationCode
                } });;;
        }

        [HttpPost]
        [AllowAnonymous]
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        public async Task<ActionResult<UserDTO>> Post([FromBody] NewUserDTO newUserDTO) 
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _userAppService.AddAsync(newUserDTO, false,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Created("[area]/[controller]", result);
        }
        
        [HttpPut]
        public async Task<ActionResult<UserDTO>> Put([FromBody] UpdatedUserDTO updateUserDTO)
        {
            var user = await _userService.GetAuthenticatedUserAsync(User) as User;
            if (user == null)
            {
                return NotFound("User not found");
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _userAppService.UpdateAsync(user, updateUserDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Accepted(result);
        }
    }
}