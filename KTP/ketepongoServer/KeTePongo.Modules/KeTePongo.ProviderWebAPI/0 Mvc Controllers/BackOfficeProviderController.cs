using AutoMapper;
using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
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

namespace KeTePongo.ProviderWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeProviderController : Controller
    {
        private readonly INotifier _notifier;
        private readonly OrchardCore.Settings.ISiteService _siteService;
        private readonly ILogger<BackOfficeProviderController> _logger;
        private readonly IProviderAppService _providerAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly dynamic New;
        private readonly IMapper _mapper;
        public IHtmlLocalizer T { get; }

        public BackOfficeProviderController(
            INotifier notifier, 
            IHtmlLocalizer<BackOfficeProviderController> localizer,
            IProviderAppService providerAppService,
            ILogger<BackOfficeProviderController> logger,
            OrchardCore.Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IAuthorizationService authorizationService,
            IMapper mapper)
        {
            _notifier = notifier;
            _siteService = siteService;
            T = localizer;
            _logger = logger;
            _providerAppService = providerAppService;
            _authorizationService = authorizationService;
            _mapper = mapper;

            New = shapeFactory;
        }

        public async Task<ActionResult> Index(PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var providers = await _providerAppService.GetAllAsync(pager);
            var count = await _providerAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);
            
            return View(new ProvidersIndexViewModel()
            {
                 Providers = providers,
                 Pager = pagerShape
            });
        }

        public IActionResult Create()
        {
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(NewProviderDTO providerDTO)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View(providerDTO);
            }
            await _providerAppService.AddAsync(providerDTO, (key, error)  => ModelState.AddModelError(key, error));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View(providerDTO);
            } 
            _notifier.Success(T["Provider {0} was created successfully", providerDTO.TradeName]);
            return RedirectToAction(nameof(Index));
        }

        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPost(long oid)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            if (oid == 0)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View();
            }
            var providerToUpdate = await _providerAppService.GetAsync(oid);
            if (providerToUpdate == null)
            {
                ModelState.AddModelError("", "Provider not found");
                return View(providerToUpdate);
            }
            if (await TryUpdateModelAsync<ProviderDTO>(providerToUpdate))
            {
                var updateProviderDTO = _mapper.Map<ProviderDTO, UpdateAnyProviderDTO>(providerToUpdate);
                await _providerAppService.UpdateAsync(oid, updateProviderDTO, (key, error) => ModelState.AddModelError(key, error));
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                    return View(providerToUpdate);
                }
                return RedirectToAction(nameof(Index));
            }
            return View(providerToUpdate);
        }

        public async Task<IActionResult> Edit(long oid)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            if (oid == 0)
            {
                return NotFound();
            }
            var providerToUpdate = await _providerAppService.GetAsync(oid);
            if (providerToUpdate == null)
            {
                return NotFound();
            }
            return View(providerToUpdate);
        }
        public async Task<IActionResult> Delete(long oid)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllProviders))
            {
                return Unauthorized();
            }
            if (oid == 0)
            {
                return NotFound();
            }
            if (!await _providerAppService.RemoveAsync(oid, (key, error) => ModelState.AddModelError(key, error)))
            {
                return NotFound();
            }
            _notifier.Success(T["Provider deleted successfully"]);

            return RedirectToAction(nameof(Index));
        }
    }
}