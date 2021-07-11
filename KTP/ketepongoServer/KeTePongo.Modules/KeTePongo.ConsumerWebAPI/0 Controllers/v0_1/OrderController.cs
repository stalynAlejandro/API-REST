using AspNet.Security.OAuth.Validation;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.AppServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using OrchardCore.Navigation;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.Core.Versioning;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides  operations for Consumer Orders
    ///</Summary>
    [Version("0.1.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class OrderController : Controller
    {
        public readonly IConsumerOrderAppService _orderAppService;
        private readonly ILogger<OrderController> _logger;
        private readonly IAuthorizationService _authorizationService;

        public OrderController(
            IConsumerOrderAppService orderAppService,
            ILogger<OrderController> logger,
            IAuthorizationService authorizationService)
        {
            _orderAppService = orderAppService;
            _logger = logger;
            _authorizationService = authorizationService;
        }
        /// <summary> 
        /// Allows to get a consumer order
        /// </summary>
        /// <returns>Provides a consumer</returns>
        /// <response code="200">Returns the consumer order</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized to get consumer order</response>       
        /// <response code="404">Consumer order not found</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{orderOID:long}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ConsumerOrderDTO))]
        public async Task<ActionResult<ConsumerOrderDTO>> Get(long orderOID)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerOrders))
            {
                return Unauthorized();
            }

            var result = await _orderAppService.GetAsync(new ConsumerClaimsPrincipal(User), orderOID);
            if (result == null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }

            return Ok(result);
        }
        /// <summary> 
        /// Allows to get consumer orderers paginated and ordered by its date
        /// </summary>
        /// <returns>Provides a consumer</returns>
        /// <response code="200">Returns the consumer orders</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized to get consumer orders</response>       
        /// <response code="500">Internal server error</response>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ConsumerOrderDTO))]
        public async Task<ActionResult<IList<ConsumerOrderDTO>>> Get([FromQuery]PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerOrders))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }

            var listResult = await _orderAppService.GetOrdersAsync(new ConsumerClaimsPrincipal(User), new Pager(pagerParameters, 10),
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }

            return Ok(listResult);
        }
        /// <summary>
        /// Creates a new consumer order
        /// </summary>
        /// <returns>New consumer order</returns>
        /// <response code="202">Returns processed order data</response>
        /// <response code="400">Invalid data</response>
        /// <response code="401">Unauthorized</response>
        /// <response code="500">Internal server error</response>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, Type = typeof(ConsumerOrderDTO))]
        public async Task<ActionResult<ConsumerOrderDTO>> Post([FromBody] NewConsumerOrderDTO newOrderDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.CreateConsumerOrders))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            var order = await _orderAppService.AddAsync(new ConsumerClaimsPrincipal(User), newOrderDTO,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem(ModelState);
            }
            return Created("[area]/[controller]/{id:int}", order);
        }
    }
}
