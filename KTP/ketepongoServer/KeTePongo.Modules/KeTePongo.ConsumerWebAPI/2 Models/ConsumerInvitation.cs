using KeTePongo.Core.Interfaces;
using System;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Models
{
    public class ConsumerInvitation : IOIDEntity, IChangeVersion
    {
        [Required(ErrorMessage = Resources.RequiredAttribute_ValidationError)]
        public int ChangeVersion { get; set; }
        [Obsolete("Obsolete", false)]
        public int Id { get; set; }
        public long OID { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; } = DateTime.UtcNow;
        public long ConsumerOID { get; set; }
        public string CreatorUserName { get; set; }
    }
}
