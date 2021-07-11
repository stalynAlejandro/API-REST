using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.UsersWebAPI.Models.Authentication
{
    public class ImpersonationRequestDTO
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string UserEmail { get; set; }
    }
}
