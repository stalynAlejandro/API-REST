using System;
using System.Threading.Tasks;
using AspNet.Security.OAuth.Validation;
using KeTePongo.Core;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace KeTePongo.ProviderWebAPI.Controllers
{

    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderRequestLinkController : Controller
    {
        private readonly ILogger<ProviderRequestLinkController> _logger;
        private readonly IProviderAppService _providerAppService;
        private readonly IAuthorizationService _authorizationService;

        public ProviderRequestLinkController(ILogger<ProviderRequestLinkController> logger, IProviderAppService providerAppService, IAuthorizationService authorizationService)
        {
            _logger = logger;
            _providerAppService = providerAppService;
            _authorizationService = authorizationService;
        }

        [HttpGet]
        public async Task<ActionResult<ProviderLinkRequestDTO>> Get([FromQuery] string email, string phone)
        {
            if (!await _authorizationService.AuthorizeAsync(User, CrossModulePermissions.ViewProviderInfo))
            {
                return Unauthorized();
            }

            var result = await _providerAppService.GetProvidersByEmailOrPhoneAsync(email, phone, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return BadRequest(ModelState);
            }
            if (result == null)
                return NotFound();
            return Ok(result);
        }
    }
}
