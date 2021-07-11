import { NotificationItemDTO, NotificationCategory } from "model/DTOs";
import { HubConnection } from "@microsoft/signalr"
// ***** Rducer
export enum NotificationStatus{
  LOADED_OFF_SCREEN = "LOADED_OFF_SCREEN",
  LOADING_OFF_SCREEN = "LOADING_OFF_SCREEN",
  LOADING_FAILED_OFF_SCREEN = "LOADING_FAILED_OFF_SCREEN",
  LOADED_ON_SCREEN = "LOADED_ON_SCREEN",
  LOADING_ON_SCREEN = "LOADING_ON_SCREEN",
  LOADING_FAILED_ON_SCREEN = "LOADING_FAILED_ON_SCREEN",
}
export interface INotificationState {
  lastNotificationReadId: number;
  list: NotificationItemDTO[];
  renderedList: NotificationItemDTO[];
  status: NotificationStatus;
  anyNotificationPendingToRead: boolean;
  isNotificationsScreen: boolean,
  isTimerForRetryingToGetNotificationsSet: boolean,
  isLoadingNotificationsOnBackground: boolean
}

export interface INotificationAction {
  type: string;
  payload: NotificationItemDTO[];
}

export interface INotificationCardProps {
  title: string;
  firstText: string;
  highlightText?: string;
  secondText?: string;
  category : NotificationCategory;
  isRead: boolean;
}