using KeTePongo.Notifications.Models;
using KeTePongo.Notifications.Indexes;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using YesSql;
using System.Linq;
using KeTePongo.Notifications.Abstractions.DTOs;
using AutoMapper;
using KeTePongo.Core.Extensions;

namespace KeTePongo.Notifications.AppServices
{
    class NotificationAppService : INotificationAppService
    {
        private readonly IMapper _mapper;
        private readonly ISession _session;
        public NotificationAppService(
           IMapper mapper,
           ISession session
           )
        {
            _mapper = mapper;
            _session = session;
        }
        private async Task<ConsumerNotifications> UpdateConsumerNotificationsAsync(ConsumerNotifications consumerNotifications)
        {
            _session.Save(consumerNotifications);
            await _session.CommitAsync();
            return consumerNotifications;
        }
        public async Task<List<NotificationItemDTO>> GetAllConsumerUserNotificationsFromGivenIdAsync(string userName, long lastNotificationReadId)
        {
            var consumerNotifications = await _session.Query<ConsumerNotifications, ConsumerNotificationsIndex>(ConsumerNotificationsIndex.GetExprByUserName(userName)).FirstOrDefaultAsync();
            if (consumerNotifications.LastNotificationId >= lastNotificationReadId)
            {
                consumerNotifications.Notifications = consumerNotifications.Notifications.Where(n => n.Id > lastNotificationReadId).ToList();
                consumerNotifications = await UpdateConsumerNotificationsAsync(consumerNotifications);
            }
            if (consumerNotifications.Notifications.Count == 0)
            {
                return null;
            }
            return _mapper.Map<List<NotificationItemDTO>>(consumerNotifications.Notifications);
        }
        public async Task InitializeConsumerUserNotificationsAsync(string userName, long consumerOID)
        {
            ConsumerNotifications consumerNotifications = new ConsumerNotifications
            {
                ConsumerOID = consumerOID,
                UserName = userName,
                Notifications = new List<NotificationItem>()
            };
            _session.Save(consumerNotifications);
            await _session.CommitAsync();
        }
        public async Task AddNotificationToConsumerUserAsync(string userName, NotificationItemDTO notificationItemDTO, Action<string, string> addError)
        {
            notificationItemDTO.UtcDateTime = DateTime.UtcNow;
            ConsumerNotifications consumerNotifications = await _session.Query<ConsumerNotifications, ConsumerNotificationsIndex>(ConsumerNotificationsIndex.GetExprByUserName(userName)).FirstOrDefaultAsync();
            consumerNotifications.LastNotificationId += 1;
            notificationItemDTO.Id = consumerNotifications.LastNotificationId;
            consumerNotifications.Notifications.Add(_mapper.Map<NotificationItem>(notificationItemDTO));
            await UpdateConsumerNotificationsAsync(consumerNotifications);
        }
        public async Task AddNotificationToAllConsumerUsersAsync(long consumerOID, NotificationItemDTO notificationItemDTO, Action<string, string> addError)
        {
            List<ConsumerNotifications> consumerNotificationsList = (List<ConsumerNotifications>) await _session.Query<ConsumerNotifications, ConsumerNotificationsIndex>(ConsumerNotificationsIndex.GetExprByConsumerOID(consumerOID)).ListAsync();
            foreach(ConsumerNotifications consumerNotifications in consumerNotificationsList)
            {
                await AddNotificationToConsumerUserAsync(consumerNotifications.UserName, notificationItemDTO, addError);
            }
        }
        public async Task<bool> RemoveConsumerNotificationAsync(string userName, long consumerOID, Action<string, string> addError)
        {
            var consumerNotificationsIndex = await _session.QueryIndex<ConsumerNotificationsIndex>(ConsumerNotificationsIndex.GetExprByUserNameAndConsumerOID(userName, consumerOID)).FirstOrDefaultAsync();
            if (consumerNotificationsIndex == null) return false;
            _session.Delete<ConsumerNotifications>(consumerNotificationsIndex.DocumentId);
            await _session.CommitAsync();
            return true;
        }
        public async Task<List<NotificationItemDTO>> GetAllProviderUserNotificationsFromGivenIdAsync(string userName, long lastNotificationReadId)
        {
            var providerNotifications = await _session.Query<ProviderNotifications, ProviderNotificationsIndex>(ProviderNotificationsIndex.GetExprByUserName(userName)).FirstOrDefaultAsync();
            if (!providerNotifications.Notifications.Any())
            {
                return null;
            }
            if (providerNotifications.LastNotificationId >= lastNotificationReadId)
            {
                providerNotifications.Notifications = providerNotifications.Notifications.Where(n => n.Id > lastNotificationReadId).ToList();
                _session.Save(providerNotifications);
                await _session.CommitAsync();
            }
            return _mapper.Map<List<NotificationItemDTO>>(providerNotifications.Notifications);
        }
        private void InitializeProviderUserNotifications(string userName, long providerOID)
        {
            ProviderNotifications providerNotifications = new ProviderNotifications
            {
                ProviderOID = providerOID,
                UserName = userName,
                Notifications = new List<NotificationItem>()
            };
            _session.Save(providerNotifications);
        }
        public async Task AddNotificationToProviderUserAsync(string userName, NotificationItemDTO notificationItemDTO, Action<string, string> addError)
        {
            notificationItemDTO.UtcDateTime = DateTime.UtcNow;
            ProviderNotifications providerNotifications = await _session.Query<ProviderNotifications, ProviderNotificationsIndex>(ProviderNotificationsIndex.GetExprByUserName(userName)).FirstOrDefaultAsync();
            providerNotifications.LastNotificationId += 1;
            notificationItemDTO.Id = providerNotifications.LastNotificationId;
            providerNotifications.Notifications.Add(_mapper.Map<NotificationItem>(notificationItemDTO));
            _session.Save(providerNotifications);
            await _session.CommitAsync();
        }
        public async Task AddNotificationToAllProviderUsersAsync(long providerOID, NotificationItemDTO notificationItemDTO, Action<string, string> addError)
        {
            List<ProviderNotifications> providerNotificationsList = (List<ProviderNotifications>) await _session.Query<ProviderNotifications, ProviderNotificationsIndex>(ProviderNotificationsIndex.GetExprByProviderOID(providerOID)).ListAsync();
            foreach (ProviderNotifications providerNotifications in providerNotificationsList)
            {
                await AddNotificationToProviderUserAsync(providerNotifications.UserName, notificationItemDTO, addError);
            }
        }
        private async Task<bool> RemoveProviderNotificationAsync(string userName, long providerOID, Action<string, string> addError)
        {
            var providerNotificationsId = (await _session.QueryIndex<ProviderNotificationsIndex>(ProviderNotificationsIndex.GetExprByUserNameAndProviderOID(userName, providerOID)).FirstOrDefaultAsync())?.DocumentId;
            if (providerNotificationsId == null) return false;
            _session.Delete<ProviderNotifications>(providerNotificationsId.Value);
            return true;
        }

        public async Task UpdateProviderOfUsersNotifications(string[] userNames, long sourceProviderOID, long targetProviderOID, Action<string, string> addError)
        {
            foreach (var userName in userNames)
            {
                if (IsProviderDeleted(sourceProviderOID))
                {
                    await RemoveProviderNotificationAsync(userName, sourceProviderOID, addError);
                }
                if (IsProviderAdded(targetProviderOID))
                {
                    InitializeProviderUserNotifications(userName, targetProviderOID);
                }
                await _session.CommitAsync();
            }
        }
        private bool IsProviderDeleted(long sourceProviderOID)
        {
            return sourceProviderOID != 0;
        }
        private bool IsProviderAdded(long targetProviderOID)
        {
            return targetProviderOID != 0;
        }
    }
}