using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace KeTePongo.ConsumerWebAPI.Abstractions.DTOs.v0_1
{
    public class NewConsumerInvitationDTO
    {
        [DisplayName(nameof(Email))]
        public string Email { get; set; }
    }
    public class ConsumerInvitationDTO : NewConsumerInvitationDTO
    {
        public long OID { get; set; }

        [DisplayName(nameof(CreationDate))]
        public DateTime CreationDate { get; set; }

        [DisplayName(nameof(ConsumerOID))]
        public long ConsumerOID { get; set; }

        [DisplayName(nameof(CreatorUserName))]
        public string CreatorUserName { get; set; }
    }
}
