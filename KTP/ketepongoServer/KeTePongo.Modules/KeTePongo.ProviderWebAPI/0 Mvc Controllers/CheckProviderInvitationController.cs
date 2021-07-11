using KeTePongo.ProviderWebAPI.AppServices;
using KeTePongo.Core.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using OrchardCore.DisplayManagement.Notify;
using System.Threading.Tasks;
using KeTePongo.ProviderWebAPI.ViewModels;
using Microsoft.AspNetCore.Identity;
using KeTePongo.Core.Services;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;

namespace KeTePongo.ProviderWebAPI.Mvc_Controllers
{
    [Authorize]
    public class CheckProviderInvitationController : Controller
    {
        private readonly INotifier _notifier;
        private readonly IProviderUserProfileAppService _ProviderUserProfileAppService;
        private readonly IInvitationTokenProvider _invitationTokenProvider;
        private readonly ILogger<CheckProviderInvitationController> _logger;


        public IHtmlLocalizer T { get; }

        public CheckProviderInvitationController(
            INotifier notifier,
            IHtmlLocalizer<CheckProviderInvitationController> localizer,
            IProviderUserProfileAppService ProviderUserProfileAppService,
            ILogger<CheckProviderInvitationController> logger,
            IInvitationTokenProvider invitationTokenProvider
            )
        {
            _notifier = notifier;
            T = localizer;
            _ProviderUserProfileAppService = ProviderUserProfileAppService;
            _logger = logger;
            _invitationTokenProvider = invitationTokenProvider;
        }

        public async Task<ActionResult> CheckProviderInvitation(string token)
        {
            //We need to replace the blanks in the token because the redirect of orchard change the "+" simbols and we need that simbols in order to validate the token
            token = token.Replace(" ", "+");

            ProviderInvitationValidationViewModel invitationToProviderViewModel = await _ProviderUserProfileAppService.GetProviderInvitationValidationViewModelAsync(token,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (invitationToProviderViewModel == null)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View("Error");
            }
            if (!invitationToProviderViewModel.UserExists)
                return Redirect(Url.Action("ConfirmInvitation", "ConfirmInvitation", new { area = "KeTePongo.UsersWebAPI", token }, HttpContext.Request.Scheme));

            return View(invitationToProviderViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> PostProviderInvitationValidation(ProviderInvitationValidationViewModel userInvitationViewModel)
        {
            if (userInvitationViewModel.SaveButtonClicked())
            {
                if (!await _ProviderUserProfileAppService.ConfirmProviderInvitationAsync(userInvitationViewModel,
                                 (key, errorMessage) => ModelState.AddModelError(key, errorMessage)))
                {
                    _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                    return View("ChangeProvider", userInvitationViewModel);
                }
                return View("Index");
            }
            ModelState.AddModelError("Cancelation", "You have been canceled the 'Change Provider Operation'");
            _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
            return View("Error");
        }
    }
}

