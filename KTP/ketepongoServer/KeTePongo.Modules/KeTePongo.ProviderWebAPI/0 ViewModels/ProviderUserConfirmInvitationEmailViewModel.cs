using KeTePongo.ProviderWebAPI.Models;

namespace KeTePongo.ProviderWebAPI.WebAPI.ViewModels
{
    public class ProviderUserConfirmInvitationEmailViewModel
    {
        public ProviderInvitation ProviderInvitation { get; set; }
        public string ConfirmationUrl { get; set; }
    }
}