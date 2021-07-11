using AspNet.Security.OAuth.Validation;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.Versioning;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides CRUD operations for Locations within Consumptions of a Consumer
    ///</Summary>
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class LocationController : Controller
    {
        private readonly ILogger<LocationController> _logger;
        private readonly ILocationAppService _locationAppService;
        private readonly IAuthorizationService _authorizationService;

        public LocationController(ILogger<LocationController> logger,
                                    ILocationAppService locationAppService,
                                    IAuthorizationService authorizationService)
        {
            _logger = logger;
            _locationAppService = locationAppService;
            _authorizationService = authorizationService;
        }
        /// <summary> 
        /// Allows to get the locations of the consumer consumption linked with the authenticated user
        /// </summary>
        /// <returns>Provides the location data of the consumer linked with authenticated user</returns>
        /// <response code="200">Returns the consumer location</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized to get consumer location</response>       
        /// <response code="404">Location not found for the consumer linked with the authenticated user</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(LocationDTO))]
        public async Task<ActionResult<LocationDTO>> Get(int id)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerLocations))
            {
                return Unauthorized();
            }
            var result = await _locationAppService.GetAsync(new ConsumerClaimsPrincipal(User), id, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
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
        /// Creates a location
        /// </summary>
        /// <returns>Updates a location</returns>
        /// <response code="201">Returns created Locaton data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, Type = typeof(LocationDTO))]
        public async Task<ActionResult<LocationDTO>> Post([FromBody] NewLocationDTO newLocationDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.CreateConsumerLocations))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
           var result = await _locationAppService.AddAsync(new ConsumerClaimsPrincipal(User), newLocationDTO, 
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Created("[area]/[controller]/{id:int}", result);
        }

        /// <summary>
        /// Updates a consumer location
        /// </summary>
        /// <returns>Updates a consumer location</returns>
        /// <response code="202">Returns updated location data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(LocationDTO))]
        public async Task<ActionResult<LocationDTO>> Put([FromBody] UpdateLocationDTO locationDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnConsumerLocations))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _locationAppService.UpdateAsync(new ConsumerClaimsPrincipal(User), locationDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Accepted("[area]/[controller]/{id:int}", result);
        }

        /// <summary>
        /// Removes a location
        /// </summary>
        /// <response code="200">Returns id of deleted location</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpDelete("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK , Type = typeof(int))]
        public async Task<ActionResult<int>> Delete(int id, int? changeVersion)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.DeleteOwnConsumerLocations))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _locationAppService.RemoveAsync(new ConsumerClaimsPrincipal(User), id,changeVersion,
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
