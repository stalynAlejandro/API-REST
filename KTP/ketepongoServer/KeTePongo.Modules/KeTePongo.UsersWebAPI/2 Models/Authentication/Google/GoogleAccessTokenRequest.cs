using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.UsersWebAPI.Models.Authentication.Google
{
    public class GoogleAccessTokenRequest
    {
        public string Code { get; set; }
        public string Client_id { get; set; }
        public string Client_secret { get; set; }
        public string Redirect_uri { get; set; }
        public string Grant_type { get; set; }
        public string Scope { get; set; }
    }
}
