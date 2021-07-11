using System.ComponentModel;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class ProviderUserProfileDTO
    {
        public string UserName { get; set; }
        [DisplayName(nameof(Name))]
        public string Name { get; set; }

        [DisplayName(nameof(Email))]
        public string Email { get; set; }

        [DisplayName(nameof(IsAdmin))]
        public bool IsAdmin { get; set; }
    }
}