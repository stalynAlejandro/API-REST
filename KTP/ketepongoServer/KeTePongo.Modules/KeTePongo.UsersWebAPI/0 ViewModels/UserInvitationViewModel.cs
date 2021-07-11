using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class UserInvitationViewModel
    {
        [DisplayName(nameof(Email))]
        [EmailAddress(ErrorMessage = Resources.EmailAddressAttribute_Invalid)]
        public String Email { get; set; }

        public long OID { get; set; }

        [DisplayName(nameof(Name))]
        public String Name { get; set; }

        [DisplayName(nameof(Token))]
        public String Token { get; set; }

        [DisplayName(nameof(Password))]
        [Required, StringLength(20, MinimumLength = 6)]
        [DataType(DataType.Password, ErrorMessage = Resources.DataTypeAttribute_Password_Invalid)]
        public string Password { get; set; }
    }
}
