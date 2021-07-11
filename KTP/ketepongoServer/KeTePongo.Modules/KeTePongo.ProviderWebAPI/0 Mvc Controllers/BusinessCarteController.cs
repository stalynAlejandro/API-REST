using KeTePongo.ProviderWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;

using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.ProviderWebAPI.Mvc_Controllers
{
    [Route("[area]/[controller]")]
    public class BusinessCarteController : Controller
    {
        public BusinessCarteController()
        {
        }

        [HttpGet]

        public IActionResult Index()
        {
            return View(new ConsumerAppViewModel()
            {
                ConsumerId = ""
            });
        }

        [HttpGet("/businessQR/{consumerId?}")]
        public IActionResult BusinnesQR(string consumerId)
        {
            return View("Index", new ConsumerAppViewModel()
            {
                ConsumerId = consumerId
            });
        }
    }
}

