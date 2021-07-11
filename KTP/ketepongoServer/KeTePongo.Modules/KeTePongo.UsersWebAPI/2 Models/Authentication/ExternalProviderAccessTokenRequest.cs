using AspNet.Security.OpenIdConnect.Primitives;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace KeTePongo.UsersWebAPI.Models.Authentication
{
    public class ExternalProviderAccessTokenRequest
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Provider { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Code { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Redirect_uri { get; set; }
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public string Grant_type { get; set; }
    }
}
