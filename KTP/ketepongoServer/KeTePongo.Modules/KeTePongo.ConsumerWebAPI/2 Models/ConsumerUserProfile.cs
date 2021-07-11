using KeTePongo.Core.Interfaces;
using System;

namespace KeTePongo.ConsumerWebAPI.Models
{
    public class ConsumerUserProfile : IOIDEntity
    {
        public long OID { get; set; }
        [Obsolete("Obsolete", false)]
        public int Id { get; set; }
        public long ConsumerOID { get; set; }
        //User Module Properties completed with user module events
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActivated { get; set; }
        public string Telephone { get; set; }
    }
}
