using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ProviderUserProfile
    {
        public int Id { get; private set; }
        public long ProviderOID { get; set; }
        public long CatalogOID { get; set; }
        public string Address { get; set; }
        public string PostalCode { get; set; }
        public string Town { get; set; }
        public string Telephone { get; set; }
        public bool IsAdmin { get; set; }
        public bool IsActivated { get; set; }


        //User Module Properties completed with user module events
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
    }
}
