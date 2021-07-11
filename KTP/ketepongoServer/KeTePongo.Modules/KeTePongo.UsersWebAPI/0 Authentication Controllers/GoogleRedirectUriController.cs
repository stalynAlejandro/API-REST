using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.UsersWebAPI.Authentication_Controllers
{

    public class GoogleRedirectUriController: Controller
    {
        [Route("/google/oauth2")]
        [HttpGet]
        public IActionResult RedirectToApp()
        {
            return Redirect("ketepongoapp://" + HttpContext.Request.Path + HttpContext.Request.QueryString);
        }
    }
}
