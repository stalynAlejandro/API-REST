using AspNet.Security.OAuth.Validation;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Swashbuckle.AspNetCore.Annotations;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.Versioning;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides the Consumption data of a Consumer
    ///</Summary>
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ConsumptionController : Controller 
    {
        private readonly IConsumptionAppService _consumptionAppService;
        private readonly IAuthorizationService _authorizationService;

        public ConsumptionController(IConsumptionAppService consumptionAppService,
            IAuthorizationService authorizationService)
        {
            _consumptionAppService = consumptionAppService;
            _authorizationService = authorizationService;
        }
        /// <summary> 
        /// Provides the consumption data the consumer linked with the authenticated user
        /// </summary>
        /// <returns>Provides the consumption data of a consumer for the consumer linked with authenticated user</returns>
        /// <response code="200">Returns the consumer consumption</response>
        /// <response code="401">Unauthorized to get consumer consumption</response>       
        /// <response code="404">Consumption not found for the consumer linked with the authenticated user</response>
        /// <response code="500">Internal server error</response>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ConsumptionDTO))]
        public async Task<ActionResult<ConsumptionDTO>> Get()
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerConsumption))
            {
                return Unauthorized();
            }
            
            var result = await _consumptionAppService.GetAsync(new ConsumerClaimsPrincipal(User));
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }
    }
}
