using AspNet.Security.OAuth.Validation;
using AutoMapper;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.Core;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderActivationController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IProviderAppService _providerAppService;
        private readonly ILogger<ProviderController> _logger;
        private readonly IMapper _mapper;
        public const string ConsumerOIDClaimKey = "consumer_oid";
        public ProviderActivationController(
            IAuthorizationService authorizationService,
            IProviderAppService providerAppService,
            ILogger<ProviderController> logger,
            IMapper mapper)
        {
            _authorizationService = authorizationService;
            _providerAppService = providerAppService;
            _logger = logger;
            _mapper = mapper;
        }

        /// <summary>
        /// Gets the user provider data
        /// </summary>
        /// <returns>Gets the user provider data</returns>
        /// <response code="200">Returns user provider data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="404">Error: Not Found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ProviderDTO))]
        public async Task<ActionResult<ProviderDTO>> Get()
        {
            if (!(await _authorizationService.AuthorizeAsync(User, CrossModulePermissions.CreateOwnProviderProfile)))
            {
                return Unauthorized();
            }

            var claim = User.Claims.FirstOrDefault(c => c.Type == ConsumerOIDClaimKey);
            var consumerOID =  claim != null ? long.Parse(claim.Value) : 0;

            var provider = await _providerAppService.ActivateProviderAsync(new ProviderClaimsPrincipal(User), consumerOID, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (provider == null)
            {
                return NotFound("Provider not found");
            }

            return Ok(provider);
        }
    }
}
