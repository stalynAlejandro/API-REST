using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KeTePongo.Notifications.AppServices
{
    public interface INotificationAppService
    {
        Task AddNotificationToConsumerUserAsync(string userName, NotificationItemDTO notification, Action<string, string> addError);
        Task AddNotificationToAllConsumerUsersAsync(long consumerOID, NotificationItemDTO notification, Action<string, string> addError);
        Task<List<NotificationItemDTO>> GetAllConsumerUserNotificationsFromGivenIdAsync(string userName, long lastNotificationReadId);
        Task InitializeConsumerUserNotificationsAsync(string userName, long consumerOID);
        Task<bool> RemoveConsumerNotificationAsync(string userName, long consumerOID, Action<string, string> addError);
        Task AddNotificationToProviderUserAsync(string userName, NotificationItemDTO notification, Action<string, string> addError);
        Task UpdateProviderOfUsersNotifications(string[] userNames, long sourceProviderOID, long targetProviderOID, Action<string, string> addError);
        Task AddNotificationToAllProviderUsersAsync(long providerOID, NotificationItemDTO notification, Action<string, string> addError);
        Task<List<NotificationItemDTO>> GetAllProviderUserNotificationsFromGivenIdAsync(string userName, long lastNotificationReadId);
    }
}
