using KeTePongo.ConsumerWebAPI.Abstractions.Events;
using System;
using System.Threading.Tasks;
using KeTePongo.Notifications.AppServices;

namespace KeTePongo.Notifications.EventHandlers
{
    public class ConsumerUserChangesEventHandlerOnNotifications : IConsumerUserChangesEventHandler
    {
        private readonly INotificationAppService _notificationAppService;
        public ConsumerUserChangesEventHandlerOnNotifications(INotificationAppService notificationAppService)
        {
            _notificationAppService = notificationAppService;
        }
        public bool IsConsumerDeleted(long sourceConsumerOID)
        {
            return sourceConsumerOID != 0;
        }
        public bool IsConsumerAdded(long targetConsumerOID)
        {
            return targetConsumerOID != 0;
        }
        public async Task AddedUsersToAConsumerAsync(AddedUsersToAConsumerContext context, Action<string, string> addError)
        {
            foreach (var userName in context.UserNames)
            {
                if (IsConsumerDeleted(context.SourceConsumerOID))
                {
                    await _notificationAppService.RemoveConsumerNotificationAsync(userName, context.SourceConsumerOID, addError);
                }
                if (IsConsumerAdded(context.TargetConsumerOID))
                {
                    await _notificationAppService.InitializeConsumerUserNotificationsAsync(userName, context.TargetConsumerOID);
                }
            }
        }
    }
}
