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
    public class ConsumerController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IConsumerAppService _consumerAppService;
        private readonly ILogger<ConsumerController> _logger;
        private readonly IMapper _mapper;
        IStringLocalizer S;
        public ConsumerController(
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
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerProfile)))
            {
                return Unauthorized();
            }
            var consumer = await _consumerAppService.GetAsync(new ConsumerClaimsPrincipal(User));
            if (consumer == null)
            {
                return NotFound(S["Consumer not found"]);
            }

            return Ok(consumer);
        }

        /// <summary>
        /// Creates a new consumer
        /// </summary>
        /// <returns>Creates a new consumer</returns>
        /// <response code="201">Returns newly created Consumer data</response>
        /// <response code="400">Invalid data, consumer already exists or user already has a consumer</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, Type = typeof(ConsumerDTO))]
        public async Task<ActionResult<ConsumerDTO>> Create([FromForm] NewConsumerDTO newConsumerDTO)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, CrossModulePermissions.CreateOwnConsumerProfile)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var consumer = await _consumerAppService.AddAsync(new ConsumerClaimsPrincipal(User), newConsumerDTO,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return this.Created("[area]/[controller]", consumer);
        }

        /// <summary>
        /// Updates a consumer
        /// </summary>
        /// <returns>Updates a consumer</returns>
        /// <response code="202">Returns updated consumer data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ConsumerDTO))]
        public async Task<ActionResult<ConsumerDTO>> Put([FromForm] UpdateConsumerDTO updateOwnConsumerDTO)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnConsumerProfile)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var consumer = await _consumerAppService.UpdateAsync(new ConsumerClaimsPrincipal(User), updateOwnConsumerDTO,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Accepted("[area]/[controller]", consumer);
        }

    }
}
