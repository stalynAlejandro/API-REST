using System;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ConsumerUser
    {
        public int Id { get; private set; }
        //Consumer Module Properties completed with consumer module events
        public long ConsumerOID { get; set; }

        public string UserName { get; set; }
        public string Email { get; set; }
    }
}
