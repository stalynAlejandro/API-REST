using KeTePongo.Core.Extensions;
using KeTePongo.ProviderWebAPI.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using YesSql.Indexes;

namespace KeTePongo.ProviderWebAPI.Indexes
{
    public class ConsumerUserIndex : MapIndex
    {
        public string UserName { get; set; }
        public long ConsumerOID { get; set; }
        public string Email { get; set; }

        public static Expression<Func<ConsumerUserIndex, bool>>  GetExprByEmails(string semicolonEmailsList)
        {
            if (string.IsNullOrWhiteSpace(semicolonEmailsList))
            {
                return null;
            }
            Expression<Func<ConsumerUserIndex, bool>> emailFilter = x => false;
            foreach (var email in semicolonEmailsList?.Split(';').Where(e => !string.IsNullOrWhiteSpace(e)))
            {
                emailFilter.Compose(x => x.Email == email, Expression.Or);
            }
            return emailFilter;
        }
    }
    class ConsumerUserIndexProvider : IndexProvider<ConsumerUser>
    {
        public override void Describe(DescribeContext<ConsumerUser> context)
        {
            context.For<ConsumerUserIndex>()
                .Map(consumerUser =>
                {
                    return new ConsumerUserIndex()
                    {
                        UserName = consumerUser.UserName,
                        ConsumerOID = consumerUser.ConsumerOID,
                        Email = consumerUser.Email
                    };
                });
        }
    }
}
