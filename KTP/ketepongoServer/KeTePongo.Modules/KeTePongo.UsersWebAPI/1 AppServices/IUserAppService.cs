using KeTePongo.Core.AppServices;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using Microsoft.AspNetCore.Mvc;
using OrchardCore.Navigation;
using OrchardCore.Users;
using OrchardCore.Users.Models;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace KeTePongo.UsersWebAPI.AppServices
{
    public enum ConfirmUserInvitation { Create, Existing, Error };
    public interface IUserAppService
    {
        Task<UserDTO> GetAsync(string userName);
        Task<IEnumerable<UserDTO>> GetAllAsync(Pager pager);
        Task<int> GetCountAsync();
        Task<UserDTO> AddAsync(NewUserDTO newUserDTO, bool isEmailConfirmed, Action<string, string> addError);
        Task<UserDTO> UpdateAsync(string userName, UpdatedUserDTO updatedUserDTO, Action<string, string> addError);
        Task<UserDTO> UpdateAsync(User user, UpdatedUserDTO updatedUserDTO, Action<string, string> addError);
        Task<bool> UpdateEmailAsync(ClaimsPrincipal claims, UpdatedEmailDTO updatedUserEmailDTO, Action<string, string> addError);
        Task<bool> ConfirmNewUserEmailAsync(ClaimsPrincipal claims, string code, Action<string, string> addError);
        Task<bool> ConfirmEmailChangeAsync(ClaimsPrincipal claims, string code, Action<string, string> addError);
        Task<bool> ChangePasswordAsync(ClaimsPrincipal claims, ChangePasswordDTO changePassword, Action<string, string> addError);
        Task<bool> UpdatePhoneAsync(ClaimsPrincipal claims, string telephone, Action<string, string> addError);
        Task<bool> ConfirmTelephoneAsync(ClaimsPrincipal claims, ConfirmUserPhoneDTO confirmUserPhoneDTO, Action<string, string> addError);
        Task<bool> SendNewUserConfirmationCodeAsync(string userName, Action<string, string> addError);
        Task<bool> SendEmailConfirmationCodeAsync(string userName, Action<string, string> addError);
        Task<bool> SendPhoneConfirmationCodeAsync(string userName, Action<string, string> addError);
        Task<bool> SendUserLostPasswodEmailAsync(IUrlHelper Url, string scheme, string userIdentifier, Action<string, string> addError);
    }
}
