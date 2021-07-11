using KeTePongo.ConsumerWebAPI.Models;
using System;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ConsumerWebAPI.Indexes
{
    public class ConsumerUserProfileIndex : MapIndex
    {
        public long OID { get; set; }
        public string UserName { get; set; }
        public long ConsumerOID { get; set; }
        public string Email { get; set; }
        public string Telephone { get; set; }

        static public Expression<Func<ConsumerUserProfileIndex, bool>> GetExprByUserName(string userName)
        {
            return i => i.UserName == userName;
        }
        static public Expression<Func<ConsumerUserProfileIndex, bool>> GetExprByConsumerOID(long consumerOID)
        {
            return i => i.ConsumerOID == consumerOID;
        }
        static public Expression<Func<ConsumerUserProfileIndex, bool>> GetExprByUserEmail(string userEmail)
        {
            return i => i.Email == userEmail;
        }
        static public Expression<Func<ConsumerUserProfileIndex, bool>> GetExprByUserPhone(string phone)
        {
            return i => i.Telephone == phone;
        }
    }
    class ConsumerUserProfileIndexProvider : IndexProvider<ConsumerUserProfile>
    {
        public override void Describe(DescribeContext<ConsumerUserProfile> context)
        {
            context.For<ConsumerUserProfileIndex>()
                .Map(consumerUserProfile =>
                new ConsumerUserProfileIndex
                {
                    OID = consumerUserProfile.OID,
                    UserName = consumerUserProfile.UserName,
                    Email = consumerUserProfile.Email,
                    ConsumerOID = consumerUserProfile.ConsumerOID,
                    Telephone = consumerUserProfile.Telephone
                });
        }
    }
}
