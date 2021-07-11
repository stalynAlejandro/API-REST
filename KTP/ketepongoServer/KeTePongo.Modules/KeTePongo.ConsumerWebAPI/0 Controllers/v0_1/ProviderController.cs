using AspNet.Security.OAuth.Validation;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.Versioning;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides CRUD operations for Consumer Providers within a Consumer Consumption
    ///</Summary>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderController : Controller
    {
        private readonly ILogger<ProviderController> _logger;
        private readonly IProviderAppService _providerAppService;
        private readonly IAuthorizationService _authorizationService;

        public ProviderController(ILogger<ProviderController> logger,
                                    IProviderAppService providerAppService,
                                    IAuthorizationService authorizationService)
        {
            _logger = logger;
            _providerAppService = providerAppService;
            _authorizationService = authorizationService;
        }

        /// <summary> 
        /// Allows to get the provider of the consumer consumption linked with the authenticated user
        /// </summary>
        /// <returns>Provides the provider data of the consumer linked with authenticated user</returns>
        /// <response code="200">Returns the provider location</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized to get consumer location</response>       
        /// <response code="404">Provider not found for the consumer linked with the authenticated user</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ProviderDTO))]
        public async Task<ActionResult<ProviderDTO>> Get(int id)
        {
            if(!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerProviders))
            {
                return Unauthorized();
            }
            var result =  await _providerAppService.GetAsync(new ConsumerClaimsPrincipal(User), id,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            if (result == null)
                return NotFound();
            return Ok(result);
        }

        /// <summary>
        /// Creates a provider
        /// </summary>
        /// <returns>Creates a provider</returns>
        /// <response code="202">Returns created provider data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ProviderDTO))]
        public async Task<ActionResult<ProviderDTO>> Post([FromBody] NewProviderDTO providerDTO)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.CreateConsumerProviders)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _providerAppService.AddAsync(new ConsumerClaimsPrincipal(User), providerDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Created("[area]/[controller]/{id:int}",result);
        }

        /// <summary>
        /// Updates a consumer provider
        /// </summary>
        /// <returns>Updates a consumer provider</returns>
        /// <response code="202">Returns updated provider data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ProviderDTO))]
        public async Task<ActionResult<ProviderDTO>> Put([FromBody] UpdateProviderDTO providerDTO)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnConsumerProviders)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _providerAppService.UpdateAsync(new ConsumerClaimsPrincipal(User), providerDTO,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok(result);
        }

        /// <summary>
        /// Removes a provider
        /// </summary>
        /// <response code="200">Returns id of deleted provider</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpDelete("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(int))]
        public async Task<ActionResult<int>> Delete(int id, int? changeVersion)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.DeleteOwnConsumerProviders))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _providerAppService.RemoveAsync(new ConsumerClaimsPrincipal(User), id,changeVersion,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok(result ? id : 0);
        }
    }
}
