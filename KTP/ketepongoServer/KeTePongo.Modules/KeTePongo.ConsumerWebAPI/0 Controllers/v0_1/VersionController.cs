using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.Core.Versioning;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using OrchardCore.Modules;
using System;

namespace KeTePongo.ConsumerWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides Version information of the Consumer Module
    ///</Summary>
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    [IgnoreAntiforgeryToken]
    public class VersionController : Controller
    {
        private readonly IManifestAppService _manifestService;
        public VersionController(IManifestAppService manifestService)
        {
            _manifestService = manifestService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new Version(_manifestService.GetManifest().Version));
        }
    }
}
