using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.UsersWebAPI.Models.Authentication.Google
{
    public class GoogleAccessToken : AccessToken
    {
        public string id_token { get; set; }
    }
}

