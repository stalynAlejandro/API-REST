using AspNet.Security.OAuth.Validation;
using KeTePongo.ConsumerWebAPI.AppServices.ConsumptionDocument;
using KeTePongo.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using YesSql;
using AutoMapper;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Http;
using KeTePongo.ConsumerWebAPI.Abstractions;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.Core.Versioning;
using KeTePongo.ConsumerWebAPI.Models.ConsumptionDocument;
using System.Collections.Generic;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides CRUD operations for Consumer Products within a Consumer Consumption
    ///</Summary>
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    [Authorize(AuthenticationSchemes = OAuthValidationDefaults.AuthenticationScheme)]
    public class ProductController : Controller
    {
        private readonly ILogger<ProductController> _logger;
        private readonly IProductAppService _productAppService;
        private readonly IAuthorizationService _authorizationService;

        public ProductController(ILogger<ProductController> logger,
                                    IProductAppService productAppService,
                                    IAuthorizationService authorizationService)
        {
            _logger = logger;
            _productAppService = productAppService;
            _authorizationService = authorizationService;
        }

        /// <summary> 
        /// Allows to get the product of the consumer consumption linked with the authenticated user
        /// </summary>
        /// <returns>Provides the product data of the consumer linked with authenticated user</returns>
        /// <response code="200">Returns the consumer product</response>
        /// <response code="400">Invalid data, product already exists or other validation error</response>
        /// <response code="401">Unauthorized to get consumer product</response>       
        /// <response code="404">Product not found for the consumer linked with the authenticated user</response>
        /// <response code="500">Internal server error</response>
        [HttpGet("{id:int}")]
        [SwaggerResponse(StatusCodes.Status200OK, Type = typeof(ProductDTO))]
        public async Task<ActionResult<ProductDTO>> Get(int id)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ViewOwnConsumerProducts))
            {
                return Unauthorized();
            }
            var result = await _productAppService.GetAsync(new ConsumerClaimsPrincipal(User), id, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
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
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ProductDTO))]
        public async Task<ActionResult<ProductDTO>> Post([FromForm] NewProductDTOWithImage newProductDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.CreateConsumerProducts))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }

            var result = await _productAppService.AddAsync(new ConsumerClaimsPrincipal(User), newProductDTO,
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
        [SwaggerResponse(StatusCodes.Status202Accepted, Type = typeof(ProductDTO))]
        public async Task<ActionResult<ProductDTO>> Put([FromForm]UpdateProductDTOWithImage productDTO)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.EditOwnConsumerProducts))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _productAppService.UpdateAsync(new ConsumerClaimsPrincipal(User), productDTO,
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
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.DeleteOwnConsumerProducts))
            {
                return Unauthorized();
            }

            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return ValidationProblem();
            }
            var result = await _productAppService.RemoveAsync(new ConsumerClaimsPrincipal(User), id,changeVersion,
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
