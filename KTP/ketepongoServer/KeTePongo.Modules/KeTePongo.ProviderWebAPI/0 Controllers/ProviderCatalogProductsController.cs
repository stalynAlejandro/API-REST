using AspNet.Security.OAuth.Validation;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Annotations;
using KeTePongo.Core.Versioning;
using Microsoft.Extensions.Logging;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.AppServices;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides the Consumer Product Carte
    ///</Summary>
    [Version("[0.2.0.0]")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderCatalogProductsController : Controller 
    {
        private readonly IProviderCatalogProductsAppService _providerCatalogProductsAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger _logger;

        public ProviderCatalogProductsController(IProviderCatalogProductsAppService providerCatalogProductsAppService,
            IAuthorizationService authorizationService,
            ILogger<ProviderCatalogProductsController> logger)
        {
            _providerCatalogProductsAppService = providerCatalogProductsAppService;
            _authorizationService = authorizationService;
            _logger = logger;
        }
        /// <summary> 
        /// Provides the carte data of the provider linked with the authenticated user
        /// </summary>
        /// <returns>Provides the Provider Catalog Products of a provider</returns>
        /// <response code="200">Returns the provider catalog products </response>
        /// <response code="401">Unauthorized to get provider catalog products</response>       
        /// <response code="404">provider catalog products not found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ProviderCatalogProductsDTO))]
        public async Task<ActionResult<ProviderCatalogProductsDTO>> Get(int? changeVersion)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnProviderCatalogProducts))
            {
                return Unauthorized();
            }

            string apiVersion = Request.HttpContext.Request.Headers[VersionAttribute.ApiVersionHeader];
            
            var providerClaims = new ProviderClaimsPrincipal(User);
            var result = await _providerCatalogProductsAppService.GetAsync(providerClaims, changeVersion);
            _logger.LogInformation("Retrieved ProviderCatalogProducts for ProviderOID '{providerOID}' and User: '{username}' using version: '{version}'", providerClaims.ProviderOID, User.Identity.Name, apiVersion);
            
            if (result == null && !changeVersion.HasValue)
            {                
                _logger.LogInformation("Not Found ProviderCatalogProducts for ProviderOID '{providerOID}' User: '{username}' using version: '{version}'", providerClaims.ProviderOID, User.Identity.Name, changeVersion, apiVersion);
                return NotFound();
            }
            return Ok(result);
        }
    }
}