using KeTePongo.ConsumerWebAPI.Models;
using System.ComponentModel;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class ConsumerUserConfirmInvitationEmailViewModel
    {
        [DisplayName(nameof(ConsumerInvitation))]
        public ConsumerInvitation ConsumerInvitation { get; set; }
        [DisplayName(nameof(ConfirmationUrl))]
        public string ConfirmationUrl { get; set; }
    }
}