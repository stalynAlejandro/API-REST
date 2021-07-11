using AspNet.Security.OAuth.Validation;
using AutoMapper;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using System.Linq;
using KeTePongo.ProviderWebAPI.Abstractions;
using KeTePongo.Core;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ERPClientsPortfolioController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly IERPClientsPortfolioAppService _erpClientsPortfolioAppService;
        private readonly ILogger<ERPClientsPortfolioController> _logger;
        private readonly IMapper _mapper;
        public ERPClientsPortfolioController(
            IAuthorizationService authorizationService,
            IERPClientsPortfolioAppService erpClientsPortfolioAppService,
            ILogger<ERPClientsPortfolioController> logger,
            IMapper mapper)
        {
            _authorizationService = authorizationService;
            _erpClientsPortfolioAppService = erpClientsPortfolioAppService;
            _logger = logger;
            _mapper = mapper;
        }


        /// <summary>
        /// Updates a provider
        /// </summary>
        /// <returns>update the clients list of a linked provider from its ERP</returns>
        /// <response code="200">Returns ok</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPut]
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ProviderDTO))]
        public async Task<IActionResult> Put(IList<ERPClientDTO> eRPClientDTOs)
        {
            if (!(await _authorizationService.AuthorizeAsync(User, Permissions.SendERPProviderClients)))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            await _erpClientsPortfolioAppService.UpdateERPClientsAsync(new ProviderClaimsPrincipal(User), eRPClientDTOs,
                    (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            return Ok();
        }
    }
}
