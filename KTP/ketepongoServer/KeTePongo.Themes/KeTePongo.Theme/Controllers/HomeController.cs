using Microsoft.AspNetCore.Mvc;

namespace KeTePongo.Theme.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
