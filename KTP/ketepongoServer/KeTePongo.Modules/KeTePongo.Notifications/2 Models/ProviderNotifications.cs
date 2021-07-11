using KeTePongo.Core.Interfaces;
using System.Collections.Generic;

namespace KeTePongo.Notifications.Models
{
    public class ProviderNotifications : IOIDEntity, IChangeVersion
    {
        public int ChangeVersion { get; set; }
        public int Id { get; set; }
        public long OID { get; set; }
        public string UserName { get; set; }
        public long ProviderOID { get; set; }
        public long LastNotificationId { get; set; }
        public List<NotificationItem> Notifications { get; set; }
    }
}
