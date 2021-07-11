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
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides the Consumers of a provider salesman
    ///</Summary>

    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConsumerValidationController : Controller 
    {
        private readonly IConsumersOfAProviderSalesmanAppService _consumersOfAProviderSalesmanAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger _logger;

        public ConsumerValidationController(IConsumersOfAProviderSalesmanAppService consumersOfAProviderSalesmanAppService,
            IAuthorizationService authorizationService,
            ILogger<ConsumersOfAProviderSalesmanController> logger)
        {
            _consumersOfAProviderSalesmanAppService = consumersOfAProviderSalesmanAppService;
            _authorizationService = authorizationService;
            _logger = logger;
        }
        /// <summary> 
        /// Provides the Consumers of a provider salesman linked with the authenticated user
        /// </summary>
        /// Provides the Consumers of a provider salesman linked with the authenticated user
        /// <response code="200">Returns the consumers of a provider salesman</response>
        /// <response code="401">Unauthorized</response>       
        /// <response code="404">not found</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status200OK)]
        public async Task<ActionResult<List<ConsumerOfAProviderSalesmanDTO>>> Put(ConsumerOfAProviderSalesmanValidationDTO consumerOfAProviderSalesmanValidationDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnConsumersOfAProviderSalesman))
            {
                return Unauthorized();
            }

            var providerClaims = new ProviderClaimsPrincipal(User);
            var result = await _consumersOfAProviderSalesmanAppService.ValidateConsumerOfAProviderSalesmanAsync(providerClaims, consumerOfAProviderSalesmanValidationDTO
                , (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok(result);
        }
    }
}