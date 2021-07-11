import { HubConnectionState } from "@microsoft/signalr";
import AsyncStorage from "@react-native-community/async-storage";
import { Dispatch } from "redux";
import { NotificationsHub } from "../signalr/NotificationsHub";
import { NotificationTypes } from "./actionTypes";
import { retryLoadNotifications } from "./operations";
import { NotificationStatus } from "./types";

export const markNotificationsAsRead = () => async (dispatch: Dispatch, getState) => {
    dispatch({type: NotificationTypes.MARK_NOTIFICATIONS_AS_READ})
    const postState = getState().notifications;
    await AsyncStorage.setItem("notifications", JSON.stringify(postState.list))
};

export const deleteOldNotifications = () => async (dispatch: Dispatch, getState) => {
    dispatch({type: NotificationTypes.DELETE_OLD_NOTIFICATIONS})
    const postState = getState().notifications;
    await AsyncStorage.setItem("notifications", JSON.stringify(postState.list))
}
export const switchNotificationsTimer = () => async (dispatch: Dispatch, getState) => {
    var notifications = getState().notifications;
    if(!notifications.isTimerForRetryingToGetNotificationsSet && notifications.isNotificationsScreen 
      && notifications.status !== NotificationStatus.LOADED_ON_SCREEN 
      && notifications.status !== NotificationStatus.LOADED_OFF_SCREEN){
      dispatch({type: NotificationTypes.SET_TIMER})
      const timer = setTimeout(() => { 
        var notifications = getState().notifications;
        dispatch({type: NotificationTypes.UNSET_TIMER})
        if(notifications.isNotificationsScreen && notifications.status != NotificationStatus.LOADED_ON_SCREEN && notifications.status != NotificationStatus.LOADED_OFF_SCREEN){
          retryLoadNotifications()(dispatch, getState)
          switchNotificationsTimer()(dispatch, getState); 
        }
      }, 5000)
    }
  }
  export const IsOnBackgroundOrStarted = (notifications) => {
  if(!notifications.isLoadingNotificationsOnBackground){
    if(NotificationsHub.connection.state != HubConnectionState.Connected
    && NotificationsHub.connection.state != HubConnectionState.Connecting ){
      return false;
    }else{
      return true;
    }
  }else{
    return true;
  }
}