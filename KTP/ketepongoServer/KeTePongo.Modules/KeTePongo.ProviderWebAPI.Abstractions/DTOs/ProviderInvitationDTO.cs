using System;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ProviderWebAPI.Abstractions.DTOs
{
    public class NewProviderInvitationDTO
    {
        public string Email { get; set; }
    }
    public class ProviderInvitationDTO : NewProviderInvitationDTO
    {
        public long OID { get; set; }
        public DateTime CreationDate { get; set; }
        public long ProviderOID { get; set; }
        public string CreatorUserName { get; set; }
    }
}
