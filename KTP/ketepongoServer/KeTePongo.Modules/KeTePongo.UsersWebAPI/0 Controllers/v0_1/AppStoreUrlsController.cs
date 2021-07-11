using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KeTePongo.Core.Versioning;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace KeTePongo.UsersWebAPI._0_Controllers.v0_1
{
    [Version("0.0.0.0")]
    [ApiController]
    [Route("[area]/[controller]")]
    [Produces("application/json")]
    public class AppStoreUrlsController : Controller
    {
        public AppStoreUrlsController()
        {

        }
        /// <summary>
        /// Urls for downloading the app
        /// </summary>
        /// <returns>Returns the urls for downloading and installing the app in Google Market and Apple App Store</returns>
        /// <response code="200"></response>
        [SwaggerResponse(200, Type = typeof(AppStoreUrlsDTO))]
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(new AppStoreUrlsDTO());
        }
    }
}
