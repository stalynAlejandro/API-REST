using KeTePongo.ProviderWebAPI.AppServices;
using Microsoft.AspNetCore.Mvc;
using System;

namespace KeTePongo.ProviderWebAPI.Controllers
{
    ///<Summary>
    /// Provides Version information of the Provider Module
    ///</Summary>
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
