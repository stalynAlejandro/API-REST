using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.UsersWebAPI.Models.Authentication.Google
{
    public class GoogleIdTokenPayload //See: https://developers.google.com/identity/protocols/OpenIDConnect#obtainuserinfo
    {
        public string Iss { get; set; }
        public string Azp { get; set; }
        public string Aud { get; set; }
        public string Sub { get; set; }
        public string Hd { get; set; }
        public string Email { get; set; }
        public bool Email_verified { get; set; }
        public string At_hash { get; set; }
        public int Iat { get; set; }
        public int Exp { get; set; }
        public string Name { get; set; }
        public string Picture { get; set; }
    }
}
