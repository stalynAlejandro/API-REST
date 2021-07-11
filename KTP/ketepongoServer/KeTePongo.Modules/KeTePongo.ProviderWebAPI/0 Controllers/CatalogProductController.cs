using AspNet.Security.OAuth.Validation;
using KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument;
using KeTePongo.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using AutoMapper;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;

using System;
using KeTePongo.Core.Versioning;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Abstractions;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides CRUD operations for Consumer Products within its Carte
    ///</Summary>
    [Version("[0.2.0.0]")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class CatalogProductController : Controller
    {
        private readonly ILogger<CatalogProductController> _logger;
        private readonly ICatalogProductAppService _catalogProductAppService;
        private readonly IAuthorizationService _authorizationService;

        public CatalogProductController(ILogger<CatalogProductController> logger,
                                    ICatalogProductAppService catalogProductAppService,
                                    IAuthorizationService authorizationService)
        {
            _logger = logger;
            _catalogProductAppService = catalogProductAppService;
            _authorizationService = authorizationService;
        }

        /// <summary> 
        /// Allows to get the products on the carte of the consumer linked with the authenticated user
        /// </summary>
        /// <returns>Provides the product data of the consumer linked with authenticated user</returns>
        /// <response code="200">Returns the consumer product</response>
        /// <response code="400">Invalid data, product already exists or other validation error</response>
        /// <response code="401">Unauthorized to get consumer product</response>       
        /// <response code="404">Product not found for the consumer linked with the authenticated user</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(CatalogProductDTO))]
        public async Task<ActionResult<CatalogProductDTO>> Get(int id)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnProviderProducts))
            {
                return Unauthorized();
            }
            var result = await _catalogProductAppService.GetAsync(new ProviderClaimsPrincipal(User), id, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
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
        /// Updates a consumer product
        /// </summary>
        /// <returns>Updates a consumer product</returns>
        /// <response code="202">Returns updated product data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(CatalogProductDTO))]
        public async Task<ActionResult<CatalogProductDTO>> Post(NewCatalogProductDTO newProduct)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions. CreateProviderProducts))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _catalogProductAppService.AddAsync(new ProviderClaimsPrincipal(User), newProduct,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Created("[area]/[controller]/{id:int}",result);
        }

        /// <summary>
        /// Updates a consumer product
        /// </summary>
        /// <returns>Updates a consumer product</returns>
        /// <response code="202">Returns updated product data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(CatalogProductDTO))]
        public async Task<ActionResult<CatalogProductDTO>> Put(UpdateCatalogProductDTO productDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnProviderProducts))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _catalogProductAppService.UpdateAsync(new ProviderClaimsPrincipal(User), productDTO,
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
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.DeleteOwnProviderProducts))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _catalogProductAppService.RemoveAsync(new ProviderClaimsPrincipal(User), id,changeVersion,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            //To-Do: Remove related image??

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok(result ? id : 0);

        }
    }
}
