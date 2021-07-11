using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Primitives;
using Swashbuckle.AspNetCore.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.Controllers.v0_1
{
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    public class ClientAppHasToUpdateController : Controller
    {
        private readonly IOpenIdAppMinVersionAppService _openIdAppMinVersion;
        private readonly ILogger<ClientAppHasToUpdateController> _logger;
        private const string ClientId = "client-id";
        private const string ClientVersion = "client-version";

        public ClientAppHasToUpdateController(IOpenIdAppMinVersionAppService openIdAppMinVersion, ILogger<ClientAppHasToUpdateController> logger)
        {
            _openIdAppMinVersion = openIdAppMinVersion;
            _logger = logger;
        }
        /// <summary>
        /// Gets the API version for the client
        /// </summary>
        /// <response code="200"><div>
        /// Returns current API version compatible with the client. Provide your current max version supported. if the client is programmed for a more modern version the version returned by the web will be the maximum version that supports that webapi.
        ///If the client provides a version number lower than the maximum that the webapi supports, it will be the webapi that returns the version number that the client sent if it is supported.Otherwise it will return an error. </div></response>
        /// <response code="500">Internal server error</response>
        [SwaggerResponse(200, Type = typeof(Version))]
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try
            {
                StringValues clientId, clientVersion;
                Request.Headers.TryGetValue(ClientId, out clientId);
                Request.Headers.TryGetValue(ClientVersion, out clientVersion);
                var version = new Version();
                if(!String.IsNullOrWhiteSpace(clientVersion.FirstOrDefault()))
                {
                    version = new Version(clientVersion);
                }
                if (await _openIdAppMinVersion.HasToUpdateAsync(clientId.FirstOrDefault(), version, (key, message) => ModelState.AddModelError(key, message)))
                {
                    return new StatusCodeResult(StatusCodes.Status426UpgradeRequired);
                }
                else
                {
                    return Ok();
                }
            }
            catch (Exception e)
            {
                _logger.LogError(new EventId(), e, "Unexpected exception returning Current Version");
                throw;
            }
        }
    }
}
