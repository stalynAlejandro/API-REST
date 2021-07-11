using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.UsersWebAPI.Models.Authentication
{
    public class KeTePongoProviderAccessTokenRequest
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Email { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Password { get; set; }
    }
}
