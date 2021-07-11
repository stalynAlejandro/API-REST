using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.ViewModels;
using KeTePongo.Core.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.Extensions.Logging;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Navigation;
using Settings = OrchardCore.Settings;
using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

namespace KeTePongo.ConsumerWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeConsumerController : Controller
    {
        private readonly IMapper _mapper;
        private readonly INotifier _notifier;
        private readonly Settings.ISiteService _siteService;
        private readonly ILogger<BackOfficeConsumerController> _logger;
        private readonly IConsumerAppService _consumerAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly dynamic New;

        public IHtmlLocalizer S { get; }

        public BackOfficeConsumerController(
            IMapper mapper,
            LocalSessionFactory sessionFactory, 
            INotifier notifier, 
            IHtmlLocalizer<BackOfficeConsumerController> localizer,
            IConsumerAppService consumerAppService,
            ILogger<BackOfficeConsumerController> logger,
            Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IAuthorizationService authorizationService)
        {
            _notifier = notifier;
            _siteService = siteService;
            S = localizer;
            _logger = logger;
            _consumerAppService = consumerAppService;
            _authorizationService = authorizationService;
            _mapper = mapper;

            New = shapeFactory;
        }

        public async Task<ActionResult> Index(PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var consumers = await _consumerAppService.GetAllAsync(pager);
            var count = await _consumerAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);
            
            return View(new ConsumersIndexViewModel()
            {
                 Consumers = consumers,
                 Pager = pagerShape
            });
        }

        public async Task<IActionResult> Create()
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            return View();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(ConsumerViewModel consumerViewModel)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View(consumerViewModel);
            }
            var newConsumerDTO = _mapper.Map<ConsumerDTO, NewConsumerDTO>(consumerViewModel.Consumer);
            newConsumerDTO.SanitaryMeasures = (consumerViewModel.SanitaryMeasuresString??"").Split("\n\n").ToList();
            newConsumerDTO.ImageFile = consumerViewModel.ImageFile;

            await _consumerAppService.AddAsync(newConsumerDTO, (key, error)  => ModelState.AddModelError(key, error));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View(consumerViewModel);
            } 
            _notifier.Success(S["Consumer {0} was created successfully", consumerViewModel.Consumer.TradeName]);
            return RedirectToAction(nameof(Index));
        }

        [HttpPost, ActionName("Edit")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> EditPost(long oid)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
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
            var consumerViewModel = new ConsumerViewModel();
            if (await TryUpdateModelAsync<ConsumerViewModel>(consumerViewModel))
            {
                var updateConsumerDTO = _mapper.Map<ConsumerDTO, UpdateAnyConsumerDTO>(consumerViewModel.Consumer);
                updateConsumerDTO.SanitaryMeasures = (consumerViewModel.SanitaryMeasuresString??"").Split("\n\n").ToList();
                updateConsumerDTO.ImageFile = consumerViewModel.ImageFile;
                var result = await _consumerAppService.UpdateAsync(oid, updateConsumerDTO, (key, error) => ModelState.AddModelError(key, error));
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                    return View(updateConsumerDTO);
                }
                return RedirectToAction(nameof(Index));
            }
            return RedirectToAction("Edit", new { oid = oid });
        }
        public async Task<IActionResult> Edit(long oid)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            if (oid == 0)
            {
                return NotFound();
            }
            var consumerToUpdate = await _consumerAppService.GetAsync(oid);
            if (consumerToUpdate == null)
            {
                return NotFound();
            }
            var viewModel = new ConsumerViewModel()
            {
                Consumer = consumerToUpdate,
                SanitaryMeasuresString = String.Join("\n\n", consumerToUpdate.SanitaryMeasures)
            };
            return View(viewModel);
        }

        public async Task<IActionResult> Delete(long oid)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            if (oid == 0)
            {
                return NotFound();
            }
            if (!await _consumerAppService.RemoveAsync(oid, (key, error) => ModelState.AddModelError(key, error)))
            {
                return NotFound();
            }
            _notifier.Success(S["Consumer deleted successfully"]);

            return RedirectToAction(nameof(Index));
        }
    }
}