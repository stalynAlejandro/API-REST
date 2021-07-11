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
    public class ProviderController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IProviderAppService _providerAppService;
        private readonly ILogger<ProviderController> _logger;
        private readonly IMapper _mapper;

        public ProviderController(
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
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnProviderProfile)))
            {
                return Unauthorized();
            }
            var provider = await _providerAppService.GetAsync(new ProviderClaimsPrincipal(User));
            if (provider == null)
            {
                return NotFound("Provider not found");
            }

            return Ok(provider);
        }

        /// <summary>
        /// Creates a new provider
        /// </summary>
        /// <returns>Creates a new provider</returns>
        /// <response code="201">Returns newly created Provider data</response>
        /// <response code="400">Invalid data, provider already exists or user already has a provider</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, Type = typeof(ProviderDTO))]
        public async Task<ActionResult<ProviderDTO>> Create([FromForm] NewProviderDTO newProviderDTO)        
        {
            if (!(await _authorizationService.AuthorizeAsync(User, CrossModulePermissions.CreateOwnProviderProfile)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var provider = await _providerAppService.AddAsync(new ProviderClaimsPrincipal(User), newProviderDTO,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return this.Created("[area]/[controller]", provider);
        }

        /// <summary>
        /// Updates a provider
        /// </summary>
        /// <returns>Updates a provider</returns>
        /// <response code="202">Returns updated provider data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ProviderDTO))]
        public async Task<ActionResult<ProviderDTO>> Put([FromForm] UpdateProviderDTO updateProviderDTO)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnProviderProfile)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var provider = await _providerAppService.UpdateAsync(new ProviderClaimsPrincipal(User), updateProviderDTO,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Accepted("[area]/[controller]", provider);
        }
    }
}
