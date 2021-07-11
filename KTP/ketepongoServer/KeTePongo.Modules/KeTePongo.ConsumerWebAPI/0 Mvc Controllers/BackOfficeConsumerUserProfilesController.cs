using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.AppServices;
using KeTePongo.ConsumerWebAPI.Models;
using KeTePongo.ConsumerWebAPI.ViewModels;
using KeTePongo.Core.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using OrchardCore.Admin;
using OrchardCore.DisplayManagement;
using OrchardCore.DisplayManagement.Notify;
using OrchardCore.Navigation;
using Settings = OrchardCore.Settings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using YesSql;
using Microsoft.AspNetCore.Authorization;

namespace KeTePongo.ConsumerWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeConsumerUserProfilesController : Controller
    {
        private readonly ISession _session;
        private readonly INotifier _notifier;
        private readonly Settings.ISiteService _siteService;
        private readonly ILogger<BackOfficeConsumerController> _logger;
        private readonly IConsumerAppService _consumerAppService;
        private readonly IConsumerUserProfileAppService _consumerUserProfileAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly dynamic New;

        public IHtmlLocalizer T { get; }

        public BackOfficeConsumerUserProfilesController(
            ISession session,
            LocalSessionFactory sessionFactory, 
            INotifier notifier, 
            IHtmlLocalizer<BackOfficeConsumerController> localizer,
            IConsumerAppService consumerAppService,
            IConsumerUserProfileAppService consumerUserProfileAppService,
            ILogger<BackOfficeConsumerController> logger,
            Settings.ISiteService siteService,
            IShapeFactory shapeFactory,
            IAuthorizationService authorizationService)
        {
            _session = session;
            _notifier = notifier;
            _siteService = siteService;
            T = localizer;
            _logger = logger;
            _consumerAppService = consumerAppService;
            _consumerUserProfileAppService = consumerUserProfileAppService;
            _authorizationService = authorizationService;

            New = shapeFactory;
        }

        public async Task<ActionResult> Index(long consumerOID, PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            var consumer = await _consumerAppService.GetAsync(consumerOID);
            var consumerUsers = await _consumerUserProfileAppService.GetConsumerUsersAsync(consumerOID, pager);
            var count = await _consumerAppService.GetCountAsync();
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new ConsumerUsersViewModel()
            {
                 Consumer = consumer,
                 ConsumerUsers = consumerUsers,
                 Pager = pagerShape
            });
        }
    }
}