using KeTePongo.Notifications.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using YesSql.Indexes;

namespace KeTePongo.Notifications.Indexes
{
    public class ConsumerNotificationsIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ConsumerOID { get; set; }
        public string UserName { get; set; }
        static public Expression<Func<ConsumerNotificationsIndex, bool>> GetExprByUserName(string userName)
        {
            return i => i.UserName == userName;
        }
        static public Expression<Func<ConsumerNotificationsIndex, bool>> GetExprByConsumerOID(long consumerOID)
        {
            return i => i.ConsumerOID == consumerOID;
        }
        static public Expression<Func<ConsumerNotificationsIndex, bool>> GetExprByUserNameAndConsumerOID(string userName, long consumerOID)
        {
            return i => (i.UserName == userName && i.ConsumerOID == consumerOID);
        }
    }
    class ConsumerNotificationsIndexProvider : IndexProvider<ConsumerNotifications>
    {
        public override void Describe(DescribeContext<ConsumerNotifications> context)
        {
            context.For<ConsumerNotificationsIndex>()
                .Map(notification =>
                {
                    return new ConsumerNotificationsIndex
                    {
                        OID = notification.OID,
                        ConsumerOID = notification.ConsumerOID,
                        UserName = notification.UserName
                    };
                });
        }
    }
}
