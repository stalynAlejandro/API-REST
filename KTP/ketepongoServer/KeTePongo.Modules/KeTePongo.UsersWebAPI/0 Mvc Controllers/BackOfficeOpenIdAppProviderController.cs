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
using KeTePongo.UsersWebAPI.Abstractions.Events;
using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Modules;

namespace KeTePongo.UsersWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeOpenIdAppProviderController : Controller
    {
        private readonly Settings.ISiteService _siteService;
        private readonly INotifier _notifier;
        public IHtmlLocalizer T { get; }
        private readonly IAuthorizationService _authorizationService;
        private readonly ILogger<BackOfficeOpenIdAppProviderController> _logger;
        private readonly IOpenIdAppProviderAppService _openIdAppProviderAppService;
        private readonly IMapper _mapper;
        private readonly Lazy<IEnumerable<IOpenIdAppProviderEventHandler>> _openIdAppProviderEventHandler;

        private readonly dynamic New;

        public BackOfficeOpenIdAppProviderController(
            INotifier notifier,
            IHtmlLocalizer<BackOfficeOpenIdAppProviderController> localizer,
            ILogger<BackOfficeOpenIdAppProviderController> logger,
            IAuthorizationService authorizationService,
            IOpenIdAppProviderAppService openIdAppProviderAppService,
            Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IMapper mapper,
            IServiceProvider serviceProvider)
        {
            _notifier = notifier;
            T = localizer;
            _logger = logger;
            _authorizationService = authorizationService;
            _openIdAppProviderAppService = openIdAppProviderAppService;
            _siteService = siteService;
            _mapper = mapper;

            New = shapeFactory;
            _openIdAppProviderEventHandler = new Lazy<IEnumerable<IOpenIdAppProviderEventHandler>>(() => serviceProvider.GetService<IEnumerable<IOpenIdAppProviderEventHandler>>());
        }

        public async Task<ActionResult> Index(PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageOpenIdAppProvider))
            {
                return Unauthorized();
            }
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var openIdAppsProvider = await _openIdAppProviderAppService.GetAllAsync(pager);
            var count = await _openIdAppProviderAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new OpenIdAppsProviderIndexViewModel()
            {
                OpenIdAppsProvider = openIdAppsProvider,
                Pager = pagerShape
            });
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string id, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageOpenIdAppProvider) || id == "KeTePongoProviderApp" || id == "KeTePongoConsumerApp")
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }

            var openIdAppProviderDTO = await _openIdAppProviderAppService.GetAsync(id);
            if (openIdAppProviderDTO == null)
            {
                return NotFound();
            }
            ViewData["returnUrl"] = returnUrl;
            return View(openIdAppProviderDTO);
        }
        [HttpPost, ActionName(nameof(Edit))]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPost(string id, string returnUrl)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageOpenIdAppProvider) || id == "KeTePongoProviderApp" || id == "KeTePongoConsumerApp")
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(id))
            {
                return NotFound();
            }
            var openIdAppProviderDTO = await _openIdAppProviderAppService.GetAsync(id);
            var sourceProviderOID = openIdAppProviderDTO.ProviderOID;
            if (openIdAppProviderDTO == null)
            {
                return NotFound();
            }
            var updatedUserDTO = _mapper.Map<OpenIdAppProviderDTO, UpdatedOpenIdAppProviderDTO>(openIdAppProviderDTO);
            if (await TryUpdateModelAsync<UpdatedOpenIdAppProviderDTO>(updatedUserDTO, ""))
            {
                if (!ModelState.IsValid)
                {
                    return View(openIdAppProviderDTO);
                }
                await _openIdAppProviderAppService.UpdateAsync(id, updatedUserDTO, (key, message) => ModelState.AddModelError(key, message));
                if (!ModelState.IsValid)
                {
                    return View(openIdAppProviderDTO);
                }
                var context = new OpenIdAppLinkedToProviderContext(
                       sourceProviderOID: sourceProviderOID,
                       targetProviderOID: updatedUserDTO.ProviderOID);
                await _openIdAppProviderEventHandler.Value.InvokeAsync(x => x.OpenIdAppLinkedToProviderAsync(context, (s,y)=> { }), _logger);

                if (returnUrl != null)
                {
                    return Redirect(returnUrl);
                }
                return RedirectToAction(nameof(Index));
            }
            return View(openIdAppProviderDTO);
        }
    }
}
