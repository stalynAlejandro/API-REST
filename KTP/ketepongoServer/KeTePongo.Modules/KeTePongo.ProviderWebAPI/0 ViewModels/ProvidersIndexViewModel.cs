using KeTePongo.ProviderWebAPI.Abstractions.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.ProviderWebAPI.ViewModels
{
    public class ProvidersIndexViewModel
    {
        public IEnumerable<ProviderDTO> Providers { get; set; }
        public dynamic Pager { get; set; }
    }
}
