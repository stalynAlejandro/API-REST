using AspNet.Security.OAuth.Validation;
using KeTePongo.ProviderWebAPI.AppServices.ProviderCatalogProductDocument;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using KeTePongo.Core.Versioning;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs.ProviderCatalogProductDTOs;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.ProviderWebAPI.Models.ProviderCatalogProductDocument;
using System.Linq;
using Newtonsoft.Json;
using KeTePongo.ProviderWebAPI.AppServices;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides CRUD operations for Consumer Products within its Carte
    ///</Summary>
    
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ERPMostConsumedCatalogProductsController : Controller
    {
        private readonly ILogger<ERPMostConsumedCatalogProductsController> _logger;
        private readonly IERPProviderCatalogProductsAppService _erpProviderCatalogProductsAppService;
        private readonly IAuthorizationService _authorizationService;

        public ERPMostConsumedCatalogProductsController(ILogger<ERPMostConsumedCatalogProductsController> logger,
                                    IERPProviderCatalogProductsAppService erpProviderCatalogProductsAppService,
                                    IAuthorizationService authorizationService)
        {
            _logger = logger;
            _erpProviderCatalogProductsAppService = erpProviderCatalogProductsAppService;
            _authorizationService = authorizationService;
        }

        [HttpPut]

        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(IList<MostConsumedCatalogProductDTO>))]
        public async Task<ActionResult> Put(IList<MostConsumedCatalogProductDTO> erpMostConsumedCatalogProductsDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.SendERPProviderCatalogProducts))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _erpProviderCatalogProductsAppService.UpdateERPMostConsumedCatalogProductsAsync(new ProviderClaimsPrincipal(User), erpMostConsumedCatalogProductsDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok(result);
        }
    }
}