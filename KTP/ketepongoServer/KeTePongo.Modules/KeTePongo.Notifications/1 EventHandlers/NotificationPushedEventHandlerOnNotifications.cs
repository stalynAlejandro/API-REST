using KeTePongo.Core.AppServices;
using KeTePongo.Notifications.Abstractions.DTOs;
using KeTePongo.Notifications.Abstractions.Events;
using KeTePongo.Notifications.AppServices;
using KeTePongo.Notifications.Hubs;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace KeTePongo.Notifications.EventHandlers
{
    class NotificationPushedEventHandlerOnNotifications : INotificationPushedEventHandler
    {
        private readonly INotificationAppService _notificationAppService;
        private readonly IHubContext<ConsumerNotificationHub> _consumerNotificationHubContext;
        private readonly IHubContext<ProviderNotificationHub> _providerNotificationHubContext;

        public NotificationPushedEventHandlerOnNotifications(INotificationAppService notificationAppService, IHubContext<ConsumerNotificationHub> consumerNotificationHubContext, IHubContext<ProviderNotificationHub> providerNotificationHubContext) {
            _notificationAppService = notificationAppService;
            _consumerNotificationHubContext = consumerNotificationHubContext;
            _providerNotificationHubContext = providerNotificationHubContext;
        }
        public async Task PushNotificationToAConsumerUserAsync(string userName, NotificationItemDTO notification, Action<string, string> addError)
        {
            await _notificationAppService.AddNotificationToConsumerUserAsync(userName, notification, addError);
            await _consumerNotificationHubContext.Clients.Group(userName).SendAsync(Signals.NewNotification);
        }
        public async Task PushNotificationToAllConsumerUsersAsync(long consumerOID, NotificationItemDTO notification, Action<string, string> addError)
        {
            await _notificationAppService.AddNotificationToAllConsumerUsersAsync(consumerOID, notification, addError);
            await _consumerNotificationHubContext.Clients.Group(consumerOID.ToString()).SendAsync(Signals.NewNotification);
        }
        public async Task PushNotificationToAProviderUserAsync(string userName, NotificationItemDTO notification, Action<string, string> addError)
        {
            await _notificationAppService.AddNotificationToProviderUserAsync(userName, notification, addError);
            await _providerNotificationHubContext.Clients.Group(userName).SendAsync(Signals.NewNotification);
        }
        public async Task PushNotificationToAllProviderUsersAsync(long providerOID, NotificationItemDTO notification, Action<string, string> addError)
        {
            await _notificationAppService.AddNotificationToAllConsumerUsersAsync(providerOID, notification, addError);
            await _providerNotificationHubContext.Clients.Group(providerOID.ToString()).SendAsync(Signals.NewNotification);
        }
    }
}
