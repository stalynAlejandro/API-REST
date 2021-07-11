using AutoMapper;
using KeTePongo.Core.AppServices;
using KeTePongo.Core.Services;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using KeTePongo.UsersWebAPI.Abstractions.Events;
using KeTePongo.UsersWebAPI.Models;
using KeTePongo.UsersWebAPI.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using OrchardCore.Entities;
using OrchardCore.Modules;
using OrchardCore.Users;
using OrchardCore.Users.Indexes;
using OrchardCore.Users.Models;
using OrchardCore.Users.Services;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using Microsoft.Extensions.DependencyInjection;
using OrchardCore.Navigation;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using KeTePongo.SMS.Abstractions;
using System.Linq;
using KeTePongo.UsersWebAPI.Indexes;
using KeTePongo.UsersWebAPI.Services;
using System.Text.RegularExpressions;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public class UserAppService : IUserAppService
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly UserManager<IUser> _userManager;
        private readonly IEmailTemplateService _emailTemplateService;
        private readonly ILogger<UserAppService> _logger;
        private readonly Lazy<IEnumerable<IUserChangesEventHandler>> _userChangesEventHandler;
        private readonly ISession _session;
        private const string _usernameCounterSeparator = "+";

        private readonly IStringLocalizer S;

        private readonly ISMSService _smsService;
        public UserAppService(
            ISession session,
            IMapper mapper,
            IUserService userService,
            IServiceProvider serviceProvider,
            UserManager<IUser> userManager,
            IEmailTemplateService emailTemplateService,
            ILogger<UserAppService> logger,
            IStringLocalizer<UserAppService> localizer,
            ISMSService smsService
            )
        {
            S = localizer;
            _userChangesEventHandler = new Lazy<IEnumerable<IUserChangesEventHandler>>(() => serviceProvider.GetService<IEnumerable<IUserChangesEventHandler>>());
            _mapper = mapper;
            _userService = userService;
            _userManager = userManager;
            _emailTemplateService = emailTemplateService;
            _logger = logger;
            _session = session;
            _smsService = smsService;
        }
        public async Task<IEnumerable<UserDTO>> GetAllAsync(Pager pager)
        {
            var result = await _session.Query<User>().Skip(pager.GetStartIndex()).Take(pager.PageSize).ListAsync();
            return _mapper.Map<IEnumerable<User>, IEnumerable<UserDTO>>(result);
        }
        public async Task<UserDTO> GetAsync(string userName)
        {
            var result = await _userManager.FindByNameAsync(userName) as User;
            return _mapper.Map<User, UserDTO>(result);
        }
        public Task<int> GetCountAsync()
        {
            return _session.Query<KeTePongoUserIndex>().CountAsync();
        }

        public async Task<UserDTO> AddAsync(NewUserDTO newUserDTO, bool isEmailConfirmed, Action<string, string> addError)
        {
            UserDTO result = null;

            if (string.IsNullOrWhiteSpace(newUserDTO.UserName))
            {
                newUserDTO.UserName = null;
            }
            if (newUserDTO.UserName != null && newUserDTO.UserName.Contains(_usernameCounterSeparator))
            {
                addError($"{nameof(NewUserDTO.UserName)}", "Custom username for a new user cannot contain a + character");
                return null;
            }

            string roleName = "";
            switch (newUserDTO.UserType)
            {
                case UserType.ConsumerUser: roleName = Roles.PendingConsumerUserRoleName; break;
                case UserType.ProviderUser: roleName = Roles.PendingProviderUserRoleName; break;
            }

            var username = await GenerateNewUserNameAsync(newUserDTO.Email);
            var user = await _userService.CreateUserAsync(new User
            {
                UserName = newUserDTO.UserName ?? username,
                Email = newUserDTO.Email,
                EmailConfirmed = isEmailConfirmed,
                RoleNames = new string[] { _userManager.NormalizeName(roleName) }
            }, newUserDTO.Password, addError) as User;

            if (user == null)
            {
                addError("", $"Unknow Reason for username={username}");
                return null;
            }
            try
            {
                var userProfile = user.As<UserProfile>();
                userProfile.Name = newUserDTO.Name;
                userProfile.UserTypes.Add(newUserDTO.UserType);
                user.Put<UserProfile>(userProfile);
                _session.Save(user);
                await _session.CommitAsync();

                if (!user.EmailConfirmed && !await SendNewUserConfirmationCodeAsync(user, addError))
                {
                    return null;
                }
                result = _mapper.Map<User, UserDTO>(user);
                if (isEmailConfirmed)
                {
                    var context = new AddedConfirmedUserContext(
                        userName: user.UserName,
                        email: user.Email,
                        userType: newUserDTO.UserType,
                        name: userProfile.Name);
                    await _userChangesEventHandler.Value.InvokeAsync(x => x.AddedConfirmedUserAsync(context, addError), _logger);
                }
            }
            finally
            {
                if (result == null)
                {
                    addError("", "Unexpected Exception");
                    await _userManager.DeleteAsync(user);
                }
            }
            return result;
        }

        public async Task<bool> SendNewUserConfirmationCodeAsync(string userName, Action<string, string> addError)
        {
            var user = await _userManager.FindByNameAsync(userName) as User;
            return await SendNewUserConfirmationCodeAsync(user, addError);
        }
        private async Task<bool> SendNewUserConfirmationCodeAsync(User user, Action<string, string> addError)
        {
            if (user.EmailConfirmed)
            {
                addError("", S["The email has been confirmed"]);
                return false;
            }
            var userProfile = user.As<UserProfile>();
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
            var emailViewModel = new UserConfirmEmailViewModel()
            {
                User = _mapper.Map<User, UserDTO>(user),
                ConfirmationCode = code
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(emailViewModel, "TemplateUserConfirmEmail");
            await _emailTemplateService.SendEmailAsync((user as User).Email, $"{Constants.KeTePonGoAppName} - {S["Confirm your account"]}", body);
            return true;
        }
        public async Task<bool> SendUserLostPasswodEmailAsync(IUrlHelper Url, string scheme, string userIdentifier, Action<string, string> addError)
        {
            var user = await _userService.GetForgotPasswordUserAsync(userIdentifier) as User;
            if (user == null || (!await _userManager.IsEmailConfirmedAsync(user)))
            {
                return false;
            }

            user.ResetToken = Convert.ToBase64String(Encoding.UTF8.GetBytes(user.ResetToken));
            var resetPasswordUrl = Url.Action("ResetPassword", "ResetPassword", new { code = user.ResetToken }, scheme);

            var lostPasswordViewModel = new LostPasswordViewModel() { User = _mapper.Map<User, UserDTO>(user), LostPasswordUrl = resetPasswordUrl };
            var body = await _emailTemplateService.GetEmailBodyAsync(lostPasswordViewModel, "TemplateUserLostPassword");
            await _emailTemplateService.SendEmailAsync((user as User).Email, $"{Constants.KeTePonGoAppName} - {S["Reset password"]}", body);

            return true;
        }
        public async Task<UserDTO> UpdateAsync(string userName, UpdatedUserDTO updatedUserDTO, Action<string, string> addError)
        {
            var user = await _userManager.FindByNameAsync(userName) as User;
            return await UpdateAsync(user, updatedUserDTO, addError);
        }
        public async Task<UserDTO> UpdateAsync(User user, UpdatedUserDTO updatedUserDTO, Action<string, string> addError)
        {
            var userProfile = user.As<UserProfile>();
            userProfile = _mapper.Map<UpdatedUserDTO, UserProfile>(updatedUserDTO, userProfile);
            user.Put<UserProfile>(userProfile);
            await _userManager.UpdateAsync(user);
            await _session.CommitAsync();

            var result = _mapper.Map<User, UserDTO>(user);
            var context = new UpdatedUserContext(
                userName: user.UserName,
                userTypes: userProfile.UserTypes,
                updatedUser: _mapper.Map<UserProfile, UpdatedUserDTO>(userProfile)
            );
            await _userChangesEventHandler.Value.InvokeAsync(x => x.UpdatedUserAsync(context, addError), _logger);
            return result;
        }
        public async Task<bool> ChangePasswordAsync(ClaimsPrincipal claimsPrincipal, ChangePasswordDTO changePassword, Action<string, string> addError)
        {
            var user = await _userService.GetAuthenticatedUserAsync(claimsPrincipal) as User;
            if (user == null)
            {
                _session.Cancel();
                addError(string.Empty, S["User not found"]);
                return false;
            }
            var identityResult = await _userManager.ChangePasswordAsync(user, changePassword.CurrentPassword, changePassword.NewPassword);
            await _session.CommitAsync();
            if (!identityResult.Succeeded)
            {
                (_userService as UserService).ProcessValidationErrors(identityResult.Errors, (User)user, addError);
            }
            return identityResult.Succeeded;
        }

        public async Task<bool> UpdateEmailAsync(ClaimsPrincipal claimsPrincipal, UpdatedEmailDTO updatedUserEmailDTO, Action<string, string> addError)
        {
            var user = await _userService.GetAuthenticatedUserAsync(claimsPrincipal) as User;
            if (user == null)
            {
                addError(string.Empty, S["User not found"]);
                return false;
            }
            var newEmail = updatedUserEmailDTO.NewEmail.Trim();
            var userWithNewEmail = await _userManager.FindByEmailAsync(updatedUserEmailDTO.NewEmail);
            if (user.Email.Equals(newEmail, StringComparison.OrdinalIgnoreCase))
            {
                addError(nameof(UpdatedEmailDTO.NewEmail), S["This email is already your current one"]);
                return false;
            }
            else if (userWithNewEmail != null && user.UserName != userWithNewEmail.UserName)
            {
                addError(nameof(UpdatedEmailDTO.NewEmail), S["A user with the same email already exists"]);
                return false;
            }
            else if (!user.EmailConfirmed)
            {
                addError(nameof(UpdatedEmailDTO.NewEmail), S["An user with a not confirmed email cannot change its email"]);
                return false;
            }
            var code = await _userManager.GenerateChangeEmailTokenAsync(user, newEmail);
            var profile = user.As<UserProfile>();
            profile.NewEmailRequested = newEmail;
            user.Put<UserProfile>(profile);
            _session.Save(user);
            await _session.CommitAsync();
            var emailViewModel = new UserConfirmEmailViewModel()
            {
                User = _mapper.Map<User, UserDTO>(user),
                ConfirmationCode = code,
                NewEmail = newEmail
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(emailViewModel, "TemplateUserConfirmEmailChange");
            if (!(await _emailTemplateService.SendEmailAsync(newEmail, $"{Constants.KeTePonGoAppName} - {S["Confirm your new email"]}", body)))
            {
                return false;
            }
            return true;
        }
        public async Task<bool> ConfirmNewUserEmailAsync(ClaimsPrincipal claimsPrincipal, string code, Action<string, string> addError)
        {
            if (code == null)
            {
                _logger.LogWarning($"Invalid values requesting email confirmation for username: {claimsPrincipal.Identity.Name}");
                addError($"{nameof(code)}", S["Invalid value"]);
                return false;
            }
            var user = await _userService.GetAuthenticatedUserAsync(claimsPrincipal) as User;
            if (user.EmailConfirmed)
            {
                _session.Cancel();
                _logger.LogWarning($"Not found username requesting email confirmation for userName: {user.UserName}");
                addError($"{nameof(user.UserName)}", S["Not found"]);
                return false;
            }
            var profile = user.As<UserProfile>();
            profile.NewEmailRequested = null;
            user.Put<UserProfile>(profile);
            string roleName = "";
            var userType = profile.UserTypes.FirstOrDefault();
            switch (userType)
            {
                case UserType.ConsumerUser: roleName = Roles.NoConsumerUserRoleName; break;
                case UserType.ProviderUser: roleName = Roles.NoProviderUserRoleName; break;
            }
            user.RoleNames.Add(_userManager.NormalizeName(roleName));
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (!result.Succeeded)
            {
                _session.Cancel();
                _logger.LogWarning($"Invalid code requesting email confirmation for userName: {user.UserName}");
                addError($"{nameof(code)}", S["Invalid code"]);
                return false;
            }
            await _session.CommitAsync();

            var context = new AddedConfirmedUserContext(
                userName: user.UserName,
                email: user.Email,
                userType: userType,
                name: profile.Name
            );
            var valor = _userChangesEventHandler.Value;
            await _userChangesEventHandler.Value.InvokeAsync(x => x.AddedConfirmedUserAsync(context, addError), _logger);

            return true;
        }

        public async Task<bool> ConfirmEmailChangeAsync(ClaimsPrincipal claims, string code, Action<string, string> addError)
        {
            var user = await _userService.GetAuthenticatedUserAsync(claims) as User;
            var profile = user.As<UserProfile>();
            var oldEmail = user.Email;
            var newEmail = profile.NewEmailRequested;
            if (oldEmail == newEmail)
            {
                return true;
            }
            if (string.IsNullOrWhiteSpace(newEmail))
            {
                _logger.LogWarning($"Invalid code requesting email change confirmation for userName: {user.UserName}");
                addError($"{nameof(code)}", S["Invalid code"]);
                return false;
            }
            profile.NewEmailRequested = null;
            user.Put<UserProfile>(profile);
            var result = await _userManager.ChangeEmailAsync(user, newEmail, code);
            if (!result.Succeeded)
            {
                _session.Cancel();
                _logger.LogWarning($"Error confirming code {code} or user {user.UserName} : {result.Errors}");
                foreach (var error in result.Errors)
                {
                    addError("", S[error.Description]);
                }
                return false;
            }
            await _session.CommitAsync();

            var context = new UserEmailChangedContext(
                userTypes: user.As<UserProfile>().UserTypes,
                userName: user.UserName,
                newEmail: user.Email,
                oldEmail: oldEmail
                );
            await _userChangesEventHandler.Value.InvokeAsync(x => x.UserEmailChangedAsync(context, addError), _logger);

            return true;
        }

        private async Task<bool> ValidatePhoneUserAsync(User user, string telephone, Action<string, string> addError)
        {
            var userWithNewPhone = await _session.Query<User, KeTePongoUserIndex>(i => i.PhoneNumber == telephone).FirstOrDefaultAsync();

            if (userWithNewPhone != null && userWithNewPhone.UserName != user.UserName)
            {
                _logger.LogWarning($"Invalid phone {telephone} was requested to confirm, same phone number already exists");
                addError($"{nameof(telephone)}", S["This phone number has already been verified by another user"]);
                return false;
            }

            if (userWithNewPhone != null && userWithNewPhone.UserName == user.UserName)
            {
                _logger.LogWarning($"Invalid phone {telephone} was requested to confirm, same phone number already exists");
                addError($"{nameof(telephone)}", S["You already have verified this number to your account"]);
                return false;
            }

            if (telephone == null || !Regex.Match(telephone, @"^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$").Success)
            {
                addError($"{nameof(telephone)}", S["Telephone number is not valid"]);
                return false;
            }

            return true;
        }

        public async Task<bool> UpdatePhoneAsync(ClaimsPrincipal claimsPrincipal, string telephone, Action<string, string> addError)
        {
            var user = await _userService.GetAuthenticatedUserAsync(claimsPrincipal) as User;

            if (!(await ValidatePhoneUserAsync(user, telephone, addError)))
            {
                return false;
            }

            var code = await _userManager.GenerateTwoFactorTokenAsync(user, TokenOptions.DefaultPhoneProvider);
            var profile = user.As<UserProfile>();
            profile.SetPendingToConfirm(telephone, code);

            var message = new MessageSMS
            {
                PhoneNumber = telephone,
                Message = S["Welcome to KeTePongo. Please, input the following code to confirm your phone number: "] + code
            };

            var isSmsSent = await _smsService.SendSMSAsync(message, addError);

            if (!isSmsSent)
            {
                _session.Cancel();
                _logger.LogError($"Error sending SMS Confirmation code to phone number: {telephone}");
                return false;
            }
            else
            {
                user.Put<UserProfile>(profile);
                await _userManager.UpdateAsync(user);
                await _session.CommitAsync();
                return true;
            }

        }

        private bool ValidateCodeFromUser(ConfirmUserPhoneDTO confirmUserPhoneDTO, User user, Action<string, string> addError)
        {
            var profile = (user as User).As<UserProfile>();

            if (profile.IsPhoneConfirmed)
            {
                _logger.LogWarning($"Invalid try to confirm phone {confirmUserPhoneDTO.Telephone} already confirmed for user {user.UserName}");
                addError($"{nameof(confirmUserPhoneDTO.Telephone)}", S["The telephone was already verified"]);
                return false;
            }

            if (profile.NewPhoneNumberRequested != confirmUserPhoneDTO.Telephone)
            {
                _logger.LogWarning($"Invalid try to confirm phone {confirmUserPhoneDTO.Telephone} not linked to user: {user.UserName}");
                addError($"{nameof(confirmUserPhoneDTO.Telephone)}", S["The specified telephone does not match the one that was requested to confirm"]);
                return false;
            }

            if (profile.TwoFactorPhoneConfirmationCode == null || profile.TwoFactorPhoneConfirmationCode != confirmUserPhoneDTO.Code)
            {
                _logger.LogWarning($"Invalid telephone confirmation code for user: {user.UserName}");
                addError($"{nameof(confirmUserPhoneDTO.Code)}", S["Invalid code"]);
                return false;
            }

            return true;
        }

        public async Task<bool> ConfirmTelephoneAsync(ClaimsPrincipal claimsPrincipal, ConfirmUserPhoneDTO confirmUserPhoneDTO, Action<string, string> addError)
        {
            var user = await _userService.GetAuthenticatedUserAsync(claimsPrincipal) as User;

            if (!(ValidateCodeFromUser(confirmUserPhoneDTO, user, addError)))
            {
                _logger.LogInformation($"The code from user was a valid one.");
                return false;
            }

            var profile = (user as User).As<UserProfile>();
            profile.SetPhoneNumber();
            (user as User).Put<UserProfile>(profile);

            var token = await _userManager.GenerateChangePhoneNumberTokenAsync(user, profile.PhoneNumber);
            var result = await _userManager.ChangePhoneNumberAsync(user, profile.PhoneNumber, token);
            if (!result.Succeeded)
            {
                _session.Cancel();
                _logger.LogWarning($"Error confirming phone number {profile.PhoneNumber} for user {user.UserName}: {result.Errors}");
                addError($"{nameof(profile.PhoneNumber)}", S["An error occured while confirmating the telephone"]);
                return false;
            }
            await _session.CommitAsync();

            var context = new UserPhoneChangedContext(
                userTypes: user.As<UserProfile>().UserTypes,
                userName: user.UserName,
                newPhone: profile.PhoneNumber);

            await _userChangesEventHandler.Value.InvokeAsync(x => x.UserPhoneChangedAsync(context, addError), _logger);

            return true;
        }

        private async Task<string> GenerateNewUserNameAsync(string email)
        {
            var userName = email.Split('@')[0].Replace(_usernameCounterSeparator, "_");
            var normalizedUserName = userName.ToUpperInvariant();

            if (await _session.Query<User, UserIndex>(i => i.NormalizedUserName == normalizedUserName).Take(1).CountAsync() == 0)
            {
                return userName;
            }
            return await GetUsernameAddingCountOfThoseWithSameRootIfAnyoneExists(userName, normalizedUserName);
        }

        private async Task<string> GetUsernameAddingCountOfThoseWithSameRootIfAnyoneExists(string userName, string normalizedUserName)
        {
            var numberOfRepeatedUsers = await _session.Query<User, UserIndex>(i => i.NormalizedUserName.StartsWith($"{normalizedUserName}+")).CountAsync();
            return $"{userName}{_usernameCounterSeparator}{numberOfRepeatedUsers}";
        }

        public async Task<bool> SendEmailConfirmationCodeAsync(string userName, Action<string, string> addError)
        {
            var user = await _userManager.FindByNameAsync(userName) as User;
            return await SendEmailConfirmationCodeAsync(user, addError);
        }

        private async Task<bool> SendEmailConfirmationCodeAsync(User user, Action<string, string> addError)
        {
            var profile = user.As<UserProfile>();
            var code = await _userManager.GenerateChangeEmailTokenAsync(user, profile.NewEmailRequested);
            var emailViewModel = new UserConfirmEmailViewModel()
            {
                User = _mapper.Map<User, UserDTO>(user),
                ConfirmationCode = code,
                NewEmail = profile.NewEmailRequested
            };
            var body = await _emailTemplateService.GetEmailBodyAsync(emailViewModel, "TemplateUserConfirmEmailChange");
            if (!(await _emailTemplateService.SendEmailAsync(profile.NewEmailRequested, $"{Constants.KeTePonGoAppName} - {S["Confirm your new email"]}", body)))
            {
                return false;
            }
            return true;
        }

        public async Task<bool> SendPhoneConfirmationCodeAsync(string userName, Action<string, string> addError)
        {
            var user = await _userManager.FindByNameAsync(userName) as User;
            return await SendPhoneConfirmationCodeAsync(user, addError);
        }
        private async Task<bool> SendPhoneConfirmationCodeAsync(User user, Action<string, string> addError)
        {
            var profile = user.As<UserProfile>();
            var message = new MessageSMS()
            {   
                PhoneNumber = profile.NewPhoneNumberRequested,
                Message = S["Welcome to KeTePongo. Please, input the following code to confirm your phone number: "] + profile.TwoFactorPhoneConfirmationCode
            };

            var isSmsSent = await _smsService.SendSMSAsync(message, addError);

            if (!isSmsSent)
            {
                _session.Cancel();
                _logger.LogError($"Error sending SMS Confirmation code to phone number: {profile.TwoFactorPhoneConfirmationCode}");
                return false;
            }
            else
            {
                user.Put<UserProfile>(profile);
                await _userManager.UpdateAsync(user);
                await _session.CommitAsync();
                return true;
            }
        }
    }
}
