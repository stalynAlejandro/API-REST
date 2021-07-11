using Microsoft.AspNetCore.SignalR;
using System;
using System.Threading.Tasks;

namespace KeTePongo.Notifications.Hubs
{
    public class ConsumerNotificationHub : NotificationHub
    {

    }
    public class ProviderNotificationHub : NotificationHub
    {

    }
    public class NotificationHub : Hub
    {
        public async Task RegisterUserForNotificationsAsync(string userName, long companyOID)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userName);
            await Groups.AddToGroupAsync(Context.ConnectionId, companyOID.ToString());
        }
    }
}
