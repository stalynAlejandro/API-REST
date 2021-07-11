using AspNet.Security.OAuth.Validation;
using AutoMapper;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using KeTePongo.ConsumerWebAPI.Abstractions;
using Microsoft.Extensions.Localization;
using KeTePongo.Core.Versioning;
using KeTePongo.Core;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConsumerActivationController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IConsumerAppService _consumerAppService;
        private readonly ILogger<ConsumerController> _logger;
        private readonly IMapper _mapper;
        IStringLocalizer S;
        public const string ProviderOIDClaimKey = "provider_oid";
        public ConsumerActivationController(
            IAuthorizationService authorizationService,
            IConsumerAppService consumerAppService,
            ILogger<ConsumerController> logger,
            IMapper mapper,
            IStringLocalizer<APIVersionController> stringLocalizer
            )
        {
            S = stringLocalizer;
            _authorizationService = authorizationService;
            _consumerAppService = consumerAppService;
            _logger = logger;
            _mapper = mapper;

        }

        /// <summary>
        /// Gets the user consumer data
        /// </summary>
        /// <returns>Gets the user consumer data</returns>
        /// <response code="200">Returns user consumer data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="404">Error: Not Found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ConsumerDTO))]
        public async Task<ActionResult<ConsumerDTO>> Get()
        {
            if (!(await _authorizationService.AuthorizeAsync(User, CrossModulePermissions.CreateOwnConsumerProfile)))
            {
                return Unauthorized();
            }
            var claim = User.Claims.FirstOrDefault(c => c.Type == ProviderOIDClaimKey);
            var providerOID = claim != null ? long.Parse(claim.Value) : 0;

            var consumer = await _consumerAppService.ActivateConsumerAsync(new ConsumerClaimsPrincipal(User), providerOID, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (consumer == null)
            {
                return NotFound("Provider not found");
            }

            return Ok(consumer);
        }
    }
}
