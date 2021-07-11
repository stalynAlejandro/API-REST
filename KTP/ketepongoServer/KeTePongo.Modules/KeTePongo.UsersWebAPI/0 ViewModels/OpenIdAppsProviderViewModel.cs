using KeTePongo.Core.AppServices;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using System;
using System.Collections.Generic;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class OpenIdAppsProviderIndexViewModel
    {
        public IEnumerable<OpenIdAppProviderDTO> OpenIdAppsProvider { get; set; }
        public dynamic Pager { get; set; }
    }
}
