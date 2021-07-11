using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Mvc;
using System;

namespace KeTePongo.UsersWebAPI.Controllers.v0_1
{
    ///<Summary>
    /// Provides Version information of the Provider Module
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
