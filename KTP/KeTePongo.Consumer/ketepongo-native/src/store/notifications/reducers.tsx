import {
  NotificationTypes,
} from "./actionTypes";
import {
  INotificationAction,
  INotificationState,
  NotificationStatus
} from "./types"
import { Reducer } from "redux";
import { NotificationItemDTO } from "model/DTOs";
import { scheduleNotificationAsync } from 'expo-notifications'

const initialState: INotificationState = {
  lastNotificationReadId: 0,
  anyNotificationPendingToRead: false,
  renderedList: [],
  list: [],
  status: NotificationStatus.LOADED_OFF_SCREEN,
  isNotificationsScreen: false,
  isTimerForRetryingToGetNotificationsSet: false,
  isLoadingNotificationsOnBackground: false
  };

const notifications: Reducer<INotificationState, INotificationAction> = (
  state = initialState,
  action: INotificationAction
) => {
  switch (action.type) {
    case NotificationTypes.SET_TIMER:
      return {
        ...state,
        isTimerForRetryingToGetNotificationsSet: true,
      }
    case NotificationTypes.UNSET_TIMER:
      return {
        ...state,
        isTimerForRetryingToGetNotificationsSet: false,
      }
      case NotificationTypes.STARTED_LOADING_ON_BACKGROUND:
        return {
          ...state,
          isLoadingNotificationsOnBackground: true
        }
      case NotificationTypes.FINISHED_LOADING_ON_BACKGROUND:
        return {
          ...state,
          isLoadingNotificationsOnBackground: false
        }
    case NotificationTypes.SWITCH_ON_SCREEN:
      return {
        ...state,
        isNotificationsScreen: !state.isNotificationsScreen,
        status: state.status == NotificationStatus.LOADED_ON_SCREEN ? NotificationStatus.LOADED_OFF_SCREEN : state.status
      }
    case NotificationTypes.UPDATE_FROM_STORAGE:
      const {
        payload: notificationsFromMemory
      } = action as INotificationAction;
      if(notificationsFromMemory != undefined && notificationsFromMemory.length > 0){
        return {
          ...state,
          list: notificationsFromMemory,
          renderedList: notificationsFromMemory,
          lastNotificationReadId: notificationsFromMemory[0].id,
          anyNotificationPendingToRead: notificationsFromMemory.some(notification => !notification.isRead)
        }
      }
      return state;
    case NotificationTypes.NOTIFICATIONS_REQUESTED_OFF_SCREEN:
      return {
        ...state,
        status: NotificationStatus.LOADING_OFF_SCREEN
      }
    case NotificationTypes.NOTIFICATIONS_FAILED_OFF_SCREEN:
      return {
        ...state,
        status: NotificationStatus.LOADING_FAILED_OFF_SCREEN
      }
    case NotificationTypes.NOTIFICATIONS_REQUESTED_ON_SCREEN:
      return {
        ...state,
        status: NotificationStatus.LOADING_ON_SCREEN
      }
    case NotificationTypes.NOTIFICATIONS_FAILED_ON_SCREEN:
      return {
        ...state,
        status: NotificationStatus.LOADING_FAILED_ON_SCREEN
      }
    case NotificationTypes.NOTIFICATIONS_SUCCEDED_OFF_SCREEN:
      const {
        payload: notificationsFromServerOffScreen
      } = action as INotificationAction;
      return notificationsLoadSucceded(notificationsFromServerOffScreen, state, false)
    case NotificationTypes.NOTIFICATIONS_SUCCEDED_ON_SCREEN:
      const {
        payload: notificationsFromServerOnScreen
      } = action as INotificationAction;
      return notificationsLoadSucceded(notificationsFromServerOnScreen, state, true)
    case NotificationTypes.MARK_NOTIFICATIONS_AS_READ:
      var newRenderedList: NotificationItemDTO[] = [];
      var newList: NotificationItemDTO[] = [];
      state.list.map(a => {
          newRenderedList.push({
              ...a,
              isRead: true,
              utcDateTimeWhenRead: a.utcDateTimeWhenRead ? a.utcDateTimeWhenRead : Date.now(),
          });
          newList.push({
            ...a,
            isRead: true,
            utcDateTimeWhenRead: a.utcDateTimeWhenRead ? a.utcDateTimeWhenRead : Date.now(),
        });
      })
      return {
        ...state,
        list: newList,
        renderedList: newRenderedList,
        anyNotificationPendingToRead: false
      }
    case NotificationTypes.DELETE_OLD_NOTIFICATIONS:
      newRenderedList = state.renderedList.filter(a => 
        !(a.utcDateTimeWhenRead != undefined && daysElapsedUntilNow(a.utcDateTimeWhenRead) >= 30));
        newList = state.list.filter(a => 
        !(a.utcDateTimeWhenRead != undefined && daysElapsedUntilNow(a.utcDateTimeWhenRead) >= 30));
    return {
      ...state,
      list: newList,
      renderedList: newRenderedList
    };
    default:
      return state;
  }
};
const daysElapsedUntilNow = (date: number): number => {
  return Math.floor((Date.now() - date)/(1000 * 60 * 60 * 24))
}
const notificationsLoadSucceded = (notificationsFromServer: NotificationItemDTO[], state: INotificationState, doneOnScreen: boolean) => {
  const syncedNotifications = notificationsFromServer ? notificationsFromServer.map(x => pushNewNotificationToNotification(x)).reduce((a, b) => b.concat(a), []) : []
  const lastNotificationReadId = syncedNotifications.length != 0 && syncedNotifications[0].id > state.lastNotificationReadId ? syncedNotifications[0].id : state.lastNotificationReadId
  let notificationStateSucceded = {
    ...state,
    list: [...syncedNotifications, ...state.list],
    renderedList: [...syncedNotifications, ...state.renderedList],
    lastNotificationReadId: lastNotificationReadId,
    anyNotificationPendingToRead: state.anyNotificationPendingToRead || syncedNotifications.length > 0,
    status: doneOnScreen ? NotificationStatus.LOADED_ON_SCREEN : NotificationStatus.LOADED_OFF_SCREEN
  }
  return notificationStateSucceded
}
const pushNewNotificationToNotification = (newNotification: NotificationItemDTO): NotificationItemDTO[] => {
  const notifications: NotificationItemDTO[] = [];
  notifications.push({
    id: newNotification.id,
    title: newNotification.title,
    description: newNotification.description,
    category: newNotification.category,
    utcDateTime: newNotification.utcDateTime,
    isRead: false,
    utcDateTimeWhenRead: undefined,
  })
  scheduleNotificationAsync({
    content: {
      title: newNotification.title,
      body: newNotification.description,
    },
    trigger: null,
  });
  return notifications;
};

export default notifications;
