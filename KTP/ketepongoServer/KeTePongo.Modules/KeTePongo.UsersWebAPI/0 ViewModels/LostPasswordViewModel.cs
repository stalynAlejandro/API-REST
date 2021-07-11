using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using System.ComponentModel;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class LostPasswordViewModel
    {
        [DisplayName(nameof(User))]
        public UserDTO User { get; set; }

        [DisplayName(nameof(LostPasswordUrl))]
        public string LostPasswordUrl { get; set; }
    }
}
