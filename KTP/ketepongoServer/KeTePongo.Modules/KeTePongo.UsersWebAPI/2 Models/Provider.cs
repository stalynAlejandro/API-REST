using KeTePongo.Core.Interfaces;
using System;
using System.Collections.Generic;

namespace KeTePongo.UsersWebAPI.Models
{
    public class Provider: IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }

        public int Id { get; set; }
        public long OID { get; set; }
        public string TradeName { get; set; }
        public long ProviderOID { get; set; }

    }
}
