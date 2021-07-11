using KeTePongo.Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Models
{
    public class ProviderInvitation : IOIDEntity, IChangeVersion
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public long ProviderOID { get; set; }
        public string CreatorUserName { get; set; }
    }
}
