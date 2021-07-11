using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using OrchardCore.Users.Models;
using System.ComponentModel;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class UserConfirmEmailViewModel
    {
        [DisplayName(nameof(User))]
        public UserDTO User { get; set; }

        [DisplayName(nameof(ConfirmationCode))]
        public string ConfirmationCode { get; set; }

        [DisplayName(nameof(NewEmail))]
        public string NewEmail { get; set; }
    }

    public class UserConfirmPhoneViewModel
    {
        [DisplayName(nameof(User))]
        public UserDTO User { get; set; }

        [DisplayName(nameof(ConfirmationCode))]
        public string ConfirmationCode { get; set; }

        [DisplayName(nameof(NewPhone))]
        public string NewPhone { get; set; }
    }
}