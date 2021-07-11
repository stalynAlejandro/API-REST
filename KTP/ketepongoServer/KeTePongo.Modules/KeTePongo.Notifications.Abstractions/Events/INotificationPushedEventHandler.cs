using KeTePongo.Notifications.Abstractions.DTOs;
using System;
using System.Threading.Tasks;

namespace KeTePongo.Notifications.Abstractions.Events
{
    public interface INotificationPushedEventHandler
    {
        Task PushNotificationToAConsumerUserAsync(string userName, NotificationItemDTO notification, Action<string, string> addError);
        Task PushNotificationToAllConsumerUsersAsync(long consumerOID, NotificationItemDTO notification, Action<string, string> addError);
        Task PushNotificationToAProviderUserAsync(string userName, NotificationItemDTO notification, Action<string, string> addError);
        Task PushNotificationToAllProviderUsersAsync(long providerOID, NotificationItemDTO notification, Action<string, string> addError);
    }
}
