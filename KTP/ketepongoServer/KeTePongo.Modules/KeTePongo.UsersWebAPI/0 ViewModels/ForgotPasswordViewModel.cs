using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class ForgotPasswordViewModel
    {
        [DisplayName(nameof(EmailOrUsername))]
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string EmailOrUsername { get; set; }
    }
}
