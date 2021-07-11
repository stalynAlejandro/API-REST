using KeTePongo.UsersWebAPI.AppServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Localization;
using System.Threading.Tasks;
using KeTePongo.UsersWebAPI.ViewModels;
using Microsoft.AspNetCore.Identity;
using OrchardCore.Users;
using KeTePongo.Core.Services;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Microsoft.Extensions.Logging;
using OrchardCore.Users.Models;
using System;

namespace KeTePongo.UsersWebAPI.Mvc_Controllers
{
    public class ConfirmInvitationController : Controller
    {
        private readonly UserManager<IUser> _userManager;
        private readonly IUserAppService _userAppService;

        private readonly IInvitationTokenProvider _invitationTokenProvider;
        private readonly ILogger<ConfirmInvitationController> _logger;
        private readonly SignInManager<IUser> _signInManager;

        public IHtmlLocalizer T { get; }

        public ConfirmInvitationController(
            IHtmlLocalizer<ConfirmInvitationController> localizer,
            UserManager<IUser> userManager,
            IUserAppService userAppService,
            ILogger<ConfirmInvitationController> logger,
            IInvitationTokenProvider invitationTokenProvider,
            SignInManager<IUser> signInManager
            )
        {
            _userManager = userManager;
            T = localizer;
            _userAppService = userAppService;
            _logger = logger;
            _invitationTokenProvider = invitationTokenProvider;
            _signInManager = signInManager;
        }

        public async Task<ActionResult> ConfirmInvitation(string token)
        {
            var invitation = _invitationTokenProvider.ValidateInvitationToken(token);

            if (string.IsNullOrWhiteSpace(invitation.email))
            {
                _logger.LogWarning($"Invalid Invitation: {Json(ModelState)}");
                return View("Error");
            }
            User user = await _userManager.FindByEmailAsync(invitation.email.ToString()) as User;
            var userInvitationViewModel = new UserInvitationViewModel()
            {
                Email = invitation.email,
                OID = invitation.oid,
                Token = token
            };

            if (user != null)
            {
                if(invitation.userType == (int) UserType.ConsumerUser)
                    return Redirect(Url.Action("CheckConsumerInvitation", "CheckConsumerInvitation", new { area = "KeTePongo.ConsumerWebAPI", token = token }, HttpContext.Request.Scheme));
                if(invitation.userType == (int) UserType.ProviderUser)
                    return Redirect(Url.Action("CheckProviderInvitation", "CheckProviderInvitation", new { area = "KeTePongo.ProviderWebAPI", token = token }, HttpContext.Request.Scheme));

                return View("Error");
            }
            return View(userInvitationViewModel);
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserInvitationViewModel userInvitationViewModel)
        {
            if (userInvitationViewModel is null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View("ConfirmInvitation", userInvitationViewModel);
            }
            var invitation = _invitationTokenProvider.ValidateInvitationToken(userInvitationViewModel.Token);

            NewUserDTO newUserDTO = new NewUserDTO
            {
                Email = userInvitationViewModel.Email,
                Name = userInvitationViewModel.Name,
                UserType = (UserType)Enum.GetValues(typeof(UserType)).GetValue(invitation.userType),
                Password = userInvitationViewModel.Password
            };

            await _userAppService.AddAsync(newUserDTO, true,
                (key, errorMessage) => ModelState.AddModelError(key, errorMessage));
            if (!ModelState.IsValid)
            {
                _logger.LogWarning($"Invalid Model State: {Json(ModelState)}");
                return View("ConfirmInvitation", userInvitationViewModel);
            }
            User user = await _userManager.FindByEmailAsync(newUserDTO.Email) as User;
            await _signInManager.SignInAsync(user, true);
            if (invitation.userType == (int)UserType.ConsumerUser)
                return Redirect(Url.Action("CheckConsumerInvitation", "CheckConsumerInvitation", new { area = "KeTePongo.ConsumerWebAPI", token = userInvitationViewModel.Token }, HttpContext.Request.Scheme));
            if (invitation.userType == (int)UserType.ProviderUser)
                return Redirect(Url.Action("CheckProviderInvitation", "CheckProviderInvitation", new { area = "KeTePongo.ProviderWebAPI", token = userInvitationViewModel.Token }, HttpContext.Request.Scheme));

            return View("Error");
        }
    }
}