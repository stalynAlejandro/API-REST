using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.ProviderWebAPI.ViewModels
{
    public class ProviderUsersViewModel
    {
        public ProviderDTO Provider { get; set; }
        public IEnumerable<ProviderUserProfileDTO> ProviderUsers { get; set; }
        public dynamic Pager { get; set; }
    }
}
