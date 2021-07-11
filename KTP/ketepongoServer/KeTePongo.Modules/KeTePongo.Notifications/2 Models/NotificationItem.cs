using System;

namespace KeTePongo.Notifications.Models
{
    public enum NotificationCategory { General, AccessToCatalogConsumerRequest, UnsubscribedFromCatalog, RemovedProduct, AccessToCatalogConsumerAccepted }
    public class NotificationItem
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime UtcDateTime { get; set; }
        public NotificationCategory Category { get; set; }
    }
}
