using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Navigation;
using System.Threading.Tasks;
using Settings = OrchardCore.Settings;

namespace KeTePongo.ProviderWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeChangeUserProviderController : Controller
    {
        private readonly INotifier _notifier;
        private readonly Settings.ISiteService _siteService;
        private readonly ILogger<BackOfficeProviderController> _logger;
        private readonly IProviderUserProfileAppService _providerUserProfileAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly dynamic New;

        public IHtmlLocalizer T { get; }

        public BackOfficeChangeUserProviderController(
            INotifier notifier, 
            IHtmlLocalizer<BackOfficeProviderController> localizer,
            IProviderUserProfileAppService providerUserProfileAppService,
            ILogger<BackOfficeProviderController> logger,
            Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IAuthorizationService authorizationService)
        {
            _notifier = notifier;
            _siteService = siteService;
            T = localizer;
            _logger = logger;
            _providerUserProfileAppService = providerUserProfileAppService;
            _authorizationService = authorizationService;

            New = shapeFactory;
        }
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet]
        public async Task<ActionResult> Index(string userName, PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(userName))
            {
                return BadRequest();
            }
            
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            (var currentProvider, var userProviderProfile) = await _providerUserProfileAppService.GetProviderAndUserInfoAsync(userName);
            var providers = await _providerUserProfileAppService.GetProvidersToMoveUserFromCurrentProviderAsync(currentProvider.OID, pager);
            var count = await _providerUserProfileAppService.GetCountOfProvidersToMoveUserFromCurrentProviderAsync(currentProvider.OID);
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new ChangeUserProviderViewModel()
            {
                User = userProviderProfile,
                CurrentProvider = currentProvider,
                Providers = providers,
                Pager = pagerShape
            });
        }

        [HttpGet]
        public async Task<ActionResult> SetProviderOID(string userName, long providerOID, string returnUrl, PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            await _providerUserProfileAppService.AssignProviderToUserAsync(userName, providerOID, (key, error) => ModelState.AddModelError(key, error));
            if(returnUrl!=null)
            {
                return Redirect(returnUrl);
            }
            return Redirect(Url.Action("Index", "BackOfficeProviderUserProfiles", new { providerOID = providerOID }, HttpContext.Request.Scheme));
        }
    }
}
