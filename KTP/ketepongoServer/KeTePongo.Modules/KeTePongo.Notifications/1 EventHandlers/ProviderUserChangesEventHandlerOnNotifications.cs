using KeTePongo.ProviderWebAPI.Abstractions.Events;
using System;
using System.Threading.Tasks;
using KeTePongo.Notifications.AppServices;

namespace KeTePongo.Notifications.EventHandlers
{
    public class ProviderUserChangesEventHandlerOnNotifications : IProviderUserChangesEventHandler
    {
        private readonly INotificationAppService _notificationAppService;
        public ProviderUserChangesEventHandlerOnNotifications(INotificationAppService notificationAppService)
        {
            _notificationAppService = notificationAppService;
        }
        public async Task AddedUsersToAProviderAsync(AddedUsersToAProviderContext context, Action<string, string> addError)
        {
            await _notificationAppService.UpdateProviderOfUsersNotifications(context.UserNames, context.SourceProviderOID, context.TargetProviderOID, addError);
        }
    }
}
