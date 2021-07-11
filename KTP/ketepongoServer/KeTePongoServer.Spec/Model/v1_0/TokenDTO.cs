using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KeTePongoServer.Spec.Model.v1_0
{
    public class TokenDTO
    {
        public string token_type { get; set; }
        public string access_token { get; set; }
        public string refresh_token { get; set; }
    }
}
