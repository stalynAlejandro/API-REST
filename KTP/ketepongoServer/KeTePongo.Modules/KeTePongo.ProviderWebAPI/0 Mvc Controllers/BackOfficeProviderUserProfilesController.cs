using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.ProviderWebAPI.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Navigation;
using Settings = OrchardCore.Settings;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace KeTePongo.ProviderWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeProviderUserProfilesController : Controller
    {
        private readonly INotifier _notifier;
        private readonly Settings.ISiteService _siteService;
        private readonly ILogger<BackOfficeProviderController> _logger;
        private readonly IProviderAppService _providerAppService;
        private readonly IProviderUserProfileAppService _providerUserProfileAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly dynamic New;

        public IHtmlLocalizer T { get; }

        public BackOfficeProviderUserProfilesController(
            INotifier notifier, 
            IHtmlLocalizer<BackOfficeProviderController> localizer,
            IProviderAppService providerAppService,
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
            _providerAppService = providerAppService;
            _providerUserProfileAppService = providerUserProfileAppService;
            _authorizationService = authorizationService;

            New = shapeFactory;
        }

        public async Task<ActionResult> Index(long providerOID, PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var provider = await _providerAppService.GetAsync(providerOID);
            var providerUsers = await _providerUserProfileAppService.GetProviderUsersAsync(providerOID, pager);
            var count = await _providerAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new ProviderUsersViewModel()
            {
                Provider = provider,
                ProviderUsers = providerUsers,
                Pager = pagerShape
            });
        }
    }
}