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
using AutoMapper;
using System.Linq;
using KeTePongo.Core;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides the Provider Catalog Products
    ///</Summary>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProviderCatalogProductsForConsumerController : Controller 
    {
        private readonly IProviderCatalogProductsAppService _providerCatalogProductsAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger _logger;
        private readonly IMapper _mapper;
        public const string ConsumerOIDClaimKey = "consumer_oid";
        public ProviderCatalogProductsForConsumerController(IProviderCatalogProductsAppService providerCatalogProductsAppService,
            IAuthorizationService authorizationService,
            ILogger<ProviderCatalogProductsForConsumerController> logger,
            IMapper mapper)
        {
            _providerCatalogProductsAppService = providerCatalogProductsAppService;
            _authorizationService = authorizationService;
            _logger = logger;
            _mapper = mapper;
        }
        /// <summary> 
        /// Provides the carte data of the provider linked with the authenticated user
        /// </summary>
        /// <returns>Provides the Provider Catalog Products data of a provider</returns>
        /// <response code="200">Returns the provider catalog products</response>
        /// <response code="401">Unauthorized to get provider catalog products</response>       
        /// <response code="404">Provider catalog products not found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ProviderCatalogProductsDTO))]
        public async Task<ActionResult<ProviderCatalogProductsDTO>> Get(string providerCode, long providerOID, int? changeVersion)
        {
            var hasProviderCodeValue = !string.IsNullOrWhiteSpace(providerCode);
            if ((hasProviderCodeValue)
                && !await _authorizationService.AuthorizeAsync(User, CrossModulePermissions.ViewAllProviderCatalogProducts))
            {
                return Unauthorized();
            }
            if (!hasProviderCodeValue && providerOID == 0)
                return BadRequest();

            string apiVersion = Request.HttpContext.Request.Headers[VersionAttribute.ApiVersionHeader];
            ProviderCatalogProductsDTO result;
            if (hasProviderCodeValue)
            {
                result = await _providerCatalogProductsAppService.GetProviderCatalogProductsByCompanyCodeAsync(providerCode, changeVersion, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
                _logger.LogInformation("Retrieved ProviderCatalogProducts for ConsumerCode '{consumerCode}' and User: '{username}' using version: '{version}'", providerCode, User.Identity.Name, apiVersion);
            }
            else
            {
                var claim = User.Claims.FirstOrDefault(c => c.Type == ConsumerOIDClaimKey);
                var consumerOID = claim != null ? long.Parse(claim.Value) : 0;
                result = await _providerCatalogProductsAppService.GetProviderCatalogProductsByProviderOIDAsync(consumerOID, providerOID, changeVersion, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
                _logger.LogInformation("Retrieved ProviderCatalogProducts for providerOID '{providerOID}' and User: '{username}' using version: '{version}'", providerOID, User.Identity.Name, apiVersion);
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return Unauthorized();
            }

            if (result == null && !changeVersion.HasValue)
            {                
                _logger.LogInformation("Not Found ProviderCatalogProducts for providerOID '{providerOID}' User: '{username}' using version: '{version}'", providerOID, User.Identity.Name, changeVersion, apiVersion);
                return NotFound();
            }
            return Ok(result);
        }
    }
}
