using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1
{
    public class OpenIdAppProviderDTO : UpdatedOpenIdAppProviderDTO
    {
        [DisplayName(nameof(ClientId))]
        public string ClientId { get; set; }
    }
    public class UpdatedOpenIdAppProviderDTO
    {
        [DisplayName(nameof(DisplayName))]
        public string DisplayName { get; set; }
        [DisplayName(nameof(ProviderOID))]
        public long ProviderOID { get; set; }
    }
}
