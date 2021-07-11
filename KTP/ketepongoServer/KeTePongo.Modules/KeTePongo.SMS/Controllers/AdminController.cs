using System;
using System.Threading.Tasks;
using KeTePongo.SMS.Abstractions;
using KeTePongo.SMS.Drivers;
using KeTePongo.SMS.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using OrchardCore.DisplayManagement.Notify;


namespace KeTePongo.SMS.Controllers
{
    public class AdminController : Controller
    {
        private readonly IAuthorizationService _authorizationService;
        private readonly INotifier _notifier;
        private readonly ISMSService _smsService;
        private readonly IHtmlLocalizer _htmlLocalizer;

        public AdminController(
            IHtmlLocalizer<AdminController> htmlLocalizer,
            IAuthorizationService authorizationService,
            INotifier notifier,
            ISMSService smsService
            )
        {
            _htmlLocalizer = htmlLocalizer;
            _authorizationService = authorizationService;
            _notifier = notifier;
            _smsService = smsService;
        }

        [HttpGet]
        public async Task<IActionResult> Index()
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageSMSSettings))
            {
                return Unauthorized();
            }

            return View();
        }

        [HttpPost, ActionName(nameof(Index))]
        public async Task<IActionResult> IndexPost(SMSSettingsViewModel model)
        {
            if (!await _authorizationService.AuthorizeAsync(User, Permissions.ManageSMSSettings))
            {
                return Unauthorized();
            }

            var message = CreateMessageFromViewModel(model);

            var result = await _smsService.SendSMSAsync(message, (key, errorMessage) => ModelState.AddModelError(key, errorMessage));

            if (result)
            {
                _notifier.Success(_htmlLocalizer["Message sent successfully"]);
                return Redirect(Url.Action("Index", "Admin", new { area = "OrchardCore.Settings", groupId = SMSSettingsDisplayDriver.GroupId }));
            }

            return View(model);
        }

        private MessageSMS CreateMessageFromViewModel(SMSSettingsViewModel testSettings)
        {
            var message = new MessageSMS
            {
                PhoneNumber = testSettings.PhoneNumber,
                Message = testSettings.Message
            };

            return message;
        }
    }
}
