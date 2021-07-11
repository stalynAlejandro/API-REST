using KeTePongo.UsersWebAPI;
using KeTePongo.UsersWebAPI.AppServices;
using KeTePongo.UsersWebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Navigation;
using Settings = OrchardCore.Settings;
using System;
using System.Threading.Tasks;
using YesSql;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using AutoMapper;

namespace KeTePongo.UsersWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeOpenIdAppMinVersionController : Controller
    {
        private readonly Settings.ISiteService _siteService;
        private readonly INotifier _notifier;
        public IHtmlLocalizer T { get; }
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger<BackOfficeOpenIdAppMinVersionController> _logger;
        private readonly IOpenIdAppMinVersionAppService _openIdAppMinVersionAppService;
        private readonly IMapper _mapper;

        private readonly dynamic New;

        public BackOfficeOpenIdAppMinVersionController(
            INotifier notifier,
            IHtmlLocalizer<BackOfficeOpenIdAppMinVersionController> localizer,
            ILogger<BackOfficeOpenIdAppMinVersionController> logger,
            IAuthorizationService authorizationService,
            IOpenIdAppMinVersionAppService openIdAppMinVersionAppService,
            Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IMapper mapper)
        {
            _notifier = notifier;
            T = localizer;
            _logger = logger;
            _authorizationService = authorizationService;
            _openIdAppMinVersionAppService = openIdAppMinVersionAppService;
            _siteService = siteService;
            _mapper = mapper;

            New = shapeFactory;
        }

        public async Task<ActionResult> Index(PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageOpenIdAppMinVersion))
            {
                return Unauthorized();
            }
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var openIdAppsMinVersion = await _openIdAppMinVersionAppService.GetAllAsync(pager);
            var count = await _openIdAppMinVersionAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new OpenIdAppsMinVersionIndexViewModel()
            {
                OpenIdAppsMinVersion = openIdAppsMinVersion,
                Pager = pagerShape
            });
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string id, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageOpenIdAppMinVersion))
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }

            var openIdAppMinVersionDTO = await _openIdAppMinVersionAppService.GetAsync(id);
            if (openIdAppMinVersionDTO == null)
            {
                return NotFound();
            }
            ViewData["returnUrl"] = returnUrl;
            return View(openIdAppMinVersionDTO);
        }
        [HttpPost, ActionName(nameof(Edit))]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPost(string id, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageOpenIdAppMinVersion))
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }
            var openIdAppMinVersionDTO = await _openIdAppMinVersionAppService.GetAsync(id);
            if (openIdAppMinVersionDTO == null)
            {
                return NotFound();
            }
            var updatedUserDTO = _mapper.Map<OpenIdAppMinVersionDTO, UpdatedOpenIdAppMinVersionDTO>(openIdAppMinVersionDTO);
            if (await TryUpdateModelAsync<UpdatedOpenIdAppMinVersionDTO>(updatedUserDTO, ""))
            {
                if (!ModelState.IsValid)
                {
                    return View(openIdAppMinVersionDTO);
                }
                await _openIdAppMinVersionAppService.UpdateAsync(id, updatedUserDTO, (key, message) => ModelState.AddModelError(key, message));
                if (!ModelState.IsValid)
                {
                    return View(openIdAppMinVersionDTO);
                }
                if (returnUrl != null)
                {
                    return Redirect(returnUrl);
                }
                return RedirectToAction(nameof(Index));
            }
            return View(openIdAppMinVersionDTO);
        }
    }
}
