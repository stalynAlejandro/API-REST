using KeTePongo.ProviderWebAPI.Models;
using System.ComponentModel;

namespace KeTePongo.ProviderWebAPI.ViewModels
{
    public class WelcomeToProviderCreatorEmailViewModel
    {
        [DisplayName(nameof(ProviderUserProfile))]
        public ProviderUserProfile ProviderUserProfile { get; set; }
        [DisplayName(nameof(Provider))]
        public Provider Provider { get; set; }
    }
}