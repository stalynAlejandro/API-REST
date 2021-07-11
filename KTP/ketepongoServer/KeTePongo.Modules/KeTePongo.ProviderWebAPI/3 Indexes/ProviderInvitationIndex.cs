using KeTePongo.Core.YesSqlCollections;
using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ProviderInvitationIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public string Email { get; set; }
        public DateTime CreationDate { get; set; }
        static public Expression<Func<ProviderInvitationIndex, bool>> GetExprByEmail(string email)
        {
            return i => i.Email == email;
        }
        static public Expression<Func<ProviderInvitationIndex, bool>> GetExprByOID(long oid)
        {
            return i => i.OID == oid;
        }
    }
    class ProviderInvitationIndexProvider : IndexProvider<ProviderInvitation>
    {
        public override void Describe(DescribeContext<ProviderInvitation> context)
        {
            context.For<ProviderInvitationIndex>()
                .Map(providerInvitation =>
                new ProviderInvitationIndex
                {
                    OID = providerInvitation.OID,
                    Email = providerInvitation.Email,
                    CreationDate = providerInvitation.CreationDate
                });
        }
    }
}
