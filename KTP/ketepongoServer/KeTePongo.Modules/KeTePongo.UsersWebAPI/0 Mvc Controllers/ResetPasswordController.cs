using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using global::OrchardCore.Modules;
using global::OrchardCore.Settings;
using global::OrchardCore.Users;
using global::OrchardCore.Users.Events;
using global::OrchardCore.Users.Services;
using KeTePongo.UsersWebAPI.AppServices;
using KeTePongo.UsersWebAPI.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Logging;

namespace KeTePongo.UsersWebAPI.Controllers
{
    public class ResetPasswordController : Controller
    {
        private readonly IUserService _userService;
        private readonly IEnumerable<IPasswordRecoveryFormEvents> _passwordRecoveryFormEvents;
        private readonly ILogger _logger;
        private readonly IUserAppService _userAppService;

        public ResetPasswordController(
            IUserService userService,
            ILogger<ResetPasswordController> logger,
            IEnumerable<IPasswordRecoveryFormEvents> passwordRecoveryFormEvents,
            IUserAppService userAppService)
        {
            _userService = userService;
            _userAppService = userAppService;
            _logger = logger;
            _passwordRecoveryFormEvents = passwordRecoveryFormEvents;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            await _passwordRecoveryFormEvents.InvokeAsync((e, modelState) => e.RecoveringPasswordAsync((key, message) => modelState.AddModelError(key, message)), ModelState, _logger);

            if (ModelState.IsValid)
            {
                if (! await _userAppService.SendUserLostPasswodEmailAsync(Url, HttpContext.Request.Scheme, model.EmailOrUsername, (key, message) => ModelState.AddModelError(key, message)))
                {
                    // returns to confirmation page anyway: we don't want to let scrapers know if a username or an email exist
                    return RedirectToLocal(Url.Action("ForgotPasswordConfirmation", "ResetPassword"));
                }
                await _passwordRecoveryFormEvents.InvokeAsync(i => i.PasswordRecoveredAsync(), _logger);
                return RedirectToLocal(Url.Action("ForgotPasswordConfirmation", "ResetPassword"));
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPassword(string code = null)
        {
            if (code == null)
            {
                //"A code must be supplied for password reset.";
            }
            return View(new ResetPasswordViewModel { ResetToken = code });
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            await _passwordRecoveryFormEvents.InvokeAsync((e, modelState) => e.ResettingPasswordAsync((key, message) => modelState.AddModelError(key, message)), ModelState, _logger);

            if (TryValidateModel(model) && ModelState.IsValid)
            {
                if (await _userService.ResetPasswordAsync(model.Email, Encoding.UTF8.GetString(Convert.FromBase64String(model.ResetToken)), model.Password, (key, message) => ModelState.AddModelError(key, message)))
                {
                    await _passwordRecoveryFormEvents.InvokeAsync(i => i.PasswordResetAsync(), _logger);

                    return RedirectToLocal(Url.Action("ResetPasswordConfirmation", "ResetPassword"));
                }
            }

            return View(model);
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult ResetPasswordConfirmation()
        {
            return View();
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return Redirect("~/");
            }
        }
    }
}
