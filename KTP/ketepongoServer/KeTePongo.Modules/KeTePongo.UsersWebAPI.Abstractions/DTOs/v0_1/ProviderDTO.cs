using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Localization;

namespace KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1
{
    public class ProviderDTO
    {
        public string TradeName { get; set; }
        public long ProviderOID { get; set; }
    }

}
