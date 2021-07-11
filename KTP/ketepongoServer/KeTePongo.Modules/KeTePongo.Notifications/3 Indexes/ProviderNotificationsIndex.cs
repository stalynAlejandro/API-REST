using KeTePongo.Notifications.Models;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using YesSql.Indexes;

namespace KeTePongo.Notifications.Indexes
{
    public class ProviderNotificationsIndex : MapIndex
    {
        public int DocumentId { get; set; }
        public long OID { get; set; }
        public long ProviderOID { get; set; }
        public string UserName { get; set; }
        static public Expression<Func<ProviderNotificationsIndex, bool>> GetExprByUserName(string userName)
        {
            return i => i.UserName == userName;
        }
        static public Expression<Func<ProviderNotificationsIndex, bool>> GetExprByProviderOID(long providerOID)
        {
            return i => i.ProviderOID == providerOID;
        }
        static public Expression<Func<ProviderNotificationsIndex, bool>> GetExprByUserNameAndProviderOID(string userName, long providerOID)
        {
            return i => (i.UserName == userName && i.ProviderOID == providerOID);
        }
    }
    class ProviderNotificationsIndexProvider : IndexProvider<ProviderNotifications>
    {
        public override void Describe(DescribeContext<ProviderNotifications> context)
        {
            context.For<ProviderNotificationsIndex>()
                .Map(notification =>
                {
                    return new ProviderNotificationsIndex
                    {
                        OID = notification.OID,
                        ProviderOID = notification.ProviderOID,
                        UserName = notification.UserName
                    };
                });
        }
    }
}
