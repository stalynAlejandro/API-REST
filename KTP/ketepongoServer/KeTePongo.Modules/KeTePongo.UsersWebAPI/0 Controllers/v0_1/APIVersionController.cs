using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Swashbuckle.AspNetCore.Annotations;
using System;

namespace KeTePongo.UsersWebAPI.Controllers.v0_1
{
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    public class APIVersionController : Controller
    {
        private ILogger<APIVersionController> _logger;
        private readonly IManifestAppService _manifestService;
        public APIVersionController(IManifestAppService manifestService, ILogger<APIVersionController> logger)
        {
            _manifestService = manifestService;
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
        public IActionResult Get(string clientMaxVersionSupported)
        {
            try
            {
                var manifest = _manifestService.GetManifest();
                if (string.IsNullOrWhiteSpace(clientMaxVersionSupported))
                {
                    return Ok(new Version(manifest.APIVersion));
                }

                var clientVersion = new Version(clientMaxVersionSupported);
                var currentVersion = new Version(manifest.APIVersion);
                var oldestVersion = new Version(manifest.MinAPIVersionSupported);

                if (clientVersion >= currentVersion)
                    return Ok(currentVersion);
                if (currentVersion > clientVersion && oldestVersion <= clientVersion)
                    return Ok(clientVersion);
                return Ok(oldestVersion);
            }
            catch (Exception e)
            {
                _logger.LogError(new EventId(), e, "Unexpected exception returning Current Version");
                throw;
            }
        }
    }
}