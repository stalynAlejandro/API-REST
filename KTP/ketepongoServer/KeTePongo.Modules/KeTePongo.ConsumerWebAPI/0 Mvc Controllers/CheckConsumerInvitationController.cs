using KeTePongo.ConsumerWebAPI.AppServices;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.DisplayManagement.Notify;
using System.Threading.Tasks;
using KeTePongo.ConsumerWebAPI.ViewModels;
using KeTePongo.Core.Services;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Localization;

namespace KeTePongo.ConsumerWebAPI.Mvc_Controllers
{
    [Authorize]
    public class CheckConsumerInvitationController : Controller
    {
        private readonly INotifier _notifier;
        private readonly IConsumerUserProfileAppService _consumerUserProfileAppService;
        private readonly IInvitationTokenProvider _invitationTokenProvider;
        private readonly ILogger<CheckConsumerInvitationController> _logger;

        public IStringLocalizer S { get; }

        public CheckConsumerInvitationController(
            INotifier notifier,
            IStringLocalizer<CheckConsumerInvitationController> localizer,
            IConsumerUserProfileAppService consumerUserProfileAppService,
            ILogger<CheckConsumerInvitationController> logger,
            IInvitationTokenProvider invitationTokenProvider
            )
        {
            _notifier = notifier;
            S = localizer;
            _consumerUserProfileAppService = consumerUserProfileAppService;
            _logger = logger;
            _invitationTokenProvider = invitationTokenProvider;
        }

        public async Task<ActionResult> CheckConsumerInvitation(string token)
        {
            //We need to replace the blanks in the token because the redirect of orchard change the "+" simbols and we need that simbols in order to validate the token
            token = token.Replace(" ", "+");

            ConsumerInvitationValidationViewModel invitationToConsumerViewModel = await _consumerUserProfileAppService.GetConsumerInvitationValidationViewModelAsync(token,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (invitationToConsumerViewModel == null)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View("Error");
            }
            if (!invitationToConsumerViewModel.UserExists)
                return Redirect(Url.Action("ConfirmInvitation", "ConfirmInvitation", new { area = "KeTePongo.UsersWebAPI", token }, HttpContext.Request.Scheme));

            return View(invitationToConsumerViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> PostConsumerInvitationValidation(ConsumerInvitationValidationViewModel userInvitationViewModel)
        {
            if (userInvitationViewModel.SaveButtonClicked(S))
            {
                if (!await _consumerUserProfileAppService.ConfirmConsumerInvitationAsync(userInvitationViewModel,
                                 (key, errorMessage) => ModelState.AddModelError(key, errorMessage)))
                {
                    _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                    return View("ChangeConsumer", userInvitationViewModel);
                }
                return View("Index");
            }
            ModelState.AddModelError("Cancelation", S["You have canceled the 'Change Consumer Operation'"]);
            _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
            return View("Error");
        }

    }
}

