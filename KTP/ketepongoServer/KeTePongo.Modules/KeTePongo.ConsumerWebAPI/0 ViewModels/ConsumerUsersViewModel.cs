using KeTePongo.ConsumerWebAPI.Abstractions.DTOs;
using KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1;
using System.Collections.Generic;
using System.ComponentModel;

namespace KeTePongo.ConsumerWebAPI.ViewModels
{
    public class ConsumerUsersViewModel
    {
        [DisplayName(nameof(Consumer))]
        public ConsumerDTO Consumer { get; set; }
        [DisplayName(nameof(ConsumerUsers))]
        public IEnumerable<ConsumerUserProfileDTO> ConsumerUsers { get; set; }
        public dynamic Pager { get; set; }
    }
}
