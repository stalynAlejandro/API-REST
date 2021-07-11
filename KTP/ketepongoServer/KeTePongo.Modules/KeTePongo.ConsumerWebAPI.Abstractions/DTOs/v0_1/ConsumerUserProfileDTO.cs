using System;
using System.ComponentModel;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class ConsumerUserProfileDTO
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