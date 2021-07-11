using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1
{
    public class OpenIdAppMinVersionDTO : UpdatedOpenIdAppMinVersionDTO
    {
        [DisplayName(nameof(ClientId))]
        public string ClientId { get; set; }
    }
    public class UpdatedOpenIdAppMinVersionDTO
    {
        [DisplayName(nameof(DisplayName))]
        public string DisplayName { get; set; }
        [DisplayName(nameof(ClientMinVersion))]
        public Version ClientMinVersion { get; set; }
    }
}
