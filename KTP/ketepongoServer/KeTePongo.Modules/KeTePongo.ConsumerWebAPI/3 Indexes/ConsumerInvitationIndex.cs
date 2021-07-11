using KeTePongo.ConsumerWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ConsumerWebAPI.Indexes
{
    public class ConsumerInvitationIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; }
        public string CreatorUserName { get; set; }
        static public Expression<Func<ConsumerInvitationIndex, bool>> GetExprByEmail(string email)
        {
            return i => i.Email == email;
        }
    }
    class ConsumerInvitationIndexProvider : IndexProvider<ConsumerInvitation>
    {
        public override void Describe(DescribeContext<ConsumerInvitation> context)
        {
            context.For<ConsumerInvitationIndex>()
                .Map(consumerInvitation =>
                new ConsumerInvitationIndex
                {
                    OID = consumerInvitation.OID,
                    Email = consumerInvitation.Email,
                    CreationDate = consumerInvitation.CreationDate,
                    CreatorUserName = consumerInvitation.CreatorUserName
                });
        }
    }
}
