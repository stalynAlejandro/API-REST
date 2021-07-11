using KeTePongo.Core.AppServices;
using KeTePongo.UsersWebAPI.Abstractions.DTOs.v0_1;
using System;
using System.Collections.Generic;
using System.ComponentModel;

namespace KeTePongo.UsersWebAPI.ViewModels
{
    public class UsersIndexViewModel
    {
        [DisplayName(nameof(Users))]
        public IEnumerable<UserDTO> Users { get; set; }
        public dynamic Pager { get; set; }
    }
}
