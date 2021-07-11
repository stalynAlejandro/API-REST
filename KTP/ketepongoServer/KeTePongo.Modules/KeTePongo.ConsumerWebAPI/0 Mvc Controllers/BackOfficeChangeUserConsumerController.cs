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
using System.Threading.Tasks;
using YesSql;
using Microsoft.AspNetCore.Authorization;

namespace KeTePongo.ConsumerWebAPI.Mvc_Controllers
{
    [Admin]
    public class BackOfficeChangeUserConsumerController : Controller
    {
        private readonly ISession _session;
        private readonly INotifier _notifier;
        private readonly Settings.ISiteService _siteService;
        private readonly ILogger<BackOfficeConsumerController> _logger;
        private readonly IConsumerUserProfileAppService _consumerUserProfileAppService;
        private readonly IAuthorizationService _authorizationService;
        private readonly dynamic New;

        public IHtmlLocalizer T { get; }

        public BackOfficeChangeUserConsumerController(
            ISession session,
            LocalSessionFactory sessionFactory, 
            INotifier notifier, 
            IHtmlLocalizer<BackOfficeConsumerController> localizer,
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
            _consumerUserProfileAppService = consumerUserProfileAppService;
            _authorizationService = authorizationService;

            New = shapeFactory;
        }
        [ResponseCache(NoStore = true, Location = ResponseCacheLocation.None)]
        [HttpGet]
        public async Task<ActionResult> Index(string userName, PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            if (string.IsNullOrWhiteSpace(userName))
            {
                return BadRequest();
            }
            
            var siteSettings = await _siteService.GetSiteSettingsAsync();
            var pager = new Pager(pagerParameters, siteSettings.PageSize);
            (var currentConsumer, var userConsumerProfile) = await _consumerUserProfileAppService.GetConsumerAndUserInfoAsync(userName);
            var consumers = await _consumerUserProfileAppService.GetConsumersToMoveUserFromCurrentConsumerAsync(currentConsumer.OID, pager);
            var count = await _consumerUserProfileAppService.GetCountOfConsumersToMoveUserFromCurrentConsumerAsync(currentConsumer.OID);
            var pagerShape = (await New.Pager(pager)).TotalItemCount(count);

            return View(new ChangeUserConsumerViewModel()
            {
                User = userConsumerProfile,
                CurrentConsumer = currentConsumer,
                Consumers = consumers,
                Pager = pagerShape
            });
        }

        [HttpGet]
        public async Task<ActionResult> SetConsumerOID(string userName, long consumerOID, string returnUrl, PagerParameters pagerParameters)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageAllConsumers))
            {
                return Unauthorized();
            }
            await _consumerUserProfileAppService.AssignConsumerToUserAsync(userName, consumerOID, (key, error) => ModelState.AddModelError(key, error));
            if(returnUrl!=null)
            {
                return Redirect(returnUrl);
            }
            return Redirect(Url.Action("Index", "BackOfficeConsumerUserProfiles", new { consumerOID = consumerOID }, HttpContext.Request.Scheme));
        }
    }
}