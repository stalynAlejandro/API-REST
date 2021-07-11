using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using KeTePongo.Core.Versioning;
using KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Abstractions;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides CRUD operations for Sections within Consumer Product Carte
    ///</Summary>
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class SectionController : Controller
    {
        private readonly ILogger<SectionController> _logger;
        private readonly ISectionAppService _sectionAppService;
        private readonly IAuthorizationService _authorizationService;

        public SectionController(ILogger<SectionController> logger,
                                    ISectionAppService sectionAppService,
                                    IAuthorizationService authorizationService)
        {
            _logger = logger;
            _sectionAppService = sectionAppService;
            _authorizationService = authorizationService;
        }
        /// <summary> 
        /// Allows to get the sections of the consumer product carte linked with the authenticated user
        /// </summary>
        /// <returns>Provides the section data of the consumer linked with authenticated user</returns>
        /// <response code="200">Returns the consumer section</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized to get consumer section</response>       
        /// <response code="404">Section not found for the consumer linked with the authenticated user</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(SectionDTO))]
        public async Task<ActionResult<SectionDTO>> Get(int id)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnProviderSections))
            {
                return Unauthorized();
            }
            var result = await _sectionAppService.GetAsync(new ProviderClaimsPrincipal(User), id, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
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
        /// Creates a section
        /// </summary>
        /// <returns>Updates a section</returns>
        /// <response code="201">Returns created Locaton data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>

        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, Type = typeof(SectionDTO))]
        public async Task<ActionResult<SectionDTO>> Post([FromBody] NewSectionDTO newSectionDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.CreateProviderSections))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
           var result = await _sectionAppService.AddAsync(new ProviderClaimsPrincipal(User), newSectionDTO, 
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Created("[area]/[controller]/{id:int}", result);
        }

        /// <summary>
        /// Updates a consumer section
        /// </summary>
        /// <returns>Updates a consumer section</returns>
        /// <response code="202">Returns updated section data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(SectionDTO))]
        public async Task<ActionResult<SectionDTO>> Put([FromBody] UpdateSectionDTO sectionDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnProviderSections))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _sectionAppService.UpdateAsync(new ProviderClaimsPrincipal(User), sectionDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Accepted("[area]/[controller]/{id:int}", result);
        }

        /// <summary>
        /// Removes a section
        /// </summary>
        /// <response code="200">Returns id of deleted section</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpDelete("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK , Type = typeof(int))]
        public async Task<ActionResult<int>> Delete(int id, int? changeVersion)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.DeleteOwnProviderSections))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _sectionAppService.RemoveAsync(new ProviderClaimsPrincipal(User), id,changeVersion,
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