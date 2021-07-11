using System;
using System.Collections.Generic;
using System.Text;

namespace KeTePongo.Notifications.Abstractions.DTOs
{
    public enum NotificationCategory {General, AccessToCatalogConsumerRequest, UnsubscribedFromCatalog, RemovedProduct, AccessToCatalogConsumerAccepted}
    public class NotificationItemDTO
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime UtcDateTime { get; set; }
        public NotificationCategory Category { get; set; }
        public NotificationItemDTO(string title, string description, NotificationCategory category)
        {
            Title = title;
            Description = description;
            Category = category;
        }
    }
}
