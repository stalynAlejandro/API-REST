using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Annotations;
using KeTePongo.Core.Versioning;
using Microsoft.Extensions.Logging;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.AppServices;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Allows to perform bulk update changes on the elements of Carte
    ///</Summary>
    [Version("[0.2.0.0]")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class CatalogBulkChangesController : Controller 
    {
        private readonly ILogger<CatalogBulkChangesController> _logger;
        private readonly IAuthorizationService _authorizationService;
        private readonly IProviderCatalogProductsAppService _providerCatalogProductAppService;

        public CatalogBulkChangesController(
            IAuthorizationService authorizationService,
            IProviderCatalogProductsAppService providerCatalogProductAppService,
            ILogger<CatalogBulkChangesController> logger)
        {
            _authorizationService = authorizationService;
            _providerCatalogProductAppService = providerCatalogProductAppService;
            _logger = logger;
        }
        /// <summary>
        /// Allows to perform bulk operations on Products Carte
        /// </summary>
        /// <returns>Updates a products carte</returns>
        /// <response code="202">Returns nothing</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(CatalogProductDTO))]
        public async Task<ActionResult<CatalogProductDTO>> Post(CarteBulkChangesDTO carteBulkChanges)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.CreateProviderProducts))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            await _providerCatalogProductAppService.ApplyBulkChangesProviderCatalogProductsAsync(new ProviderClaimsPrincipal(User), carteBulkChanges,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Created("[area]/ConsumerProductCarte/",null);
        }
    }
}