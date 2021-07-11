import { AsyncStorage } from "react-native";
import { Dispatch } from "redux";
import decode from "jwt-decode";
import { simpleAsycnActionCreator } from "../actionCreatorMethods";
import { NotificationTypes } from "./actionTypes"
import { STRINGS, BASEURL, NOTIFICATIONS } from "../../constants";
import { HubConnectionBuilder, HubConnectionState, JsonHubProtocol } from "@microsoft/signalr";
import { IsOnBackgroundOrStarted } from "./actions";
import { NotificationsHub } from "../signalr/NotificationsHub";

const getNotifications = (loadFromMemory: boolean = true, deleteOldNotifications: boolean = true, isNotificationsScreen: boolean = false) => async (dispatch: Dispatch, getState) => {
  if(loadFromMemory){
    try{
      const token = decode(getState().authentication.accessToken)
      const lastUserLogged = await AsyncStorage.getItem(NOTIFICATIONS.LastUserLoggedStorage);
      if(lastUserLogged != null){
        if(lastUserLogged != token.unique_name){
          await AsyncStorage.removeItem(NOTIFICATIONS.NotificationsStorage)
          await AsyncStorage.setItem(NOTIFICATIONS.LastUserLoggedStorage, token.unique_name)
        }
        var notificationsList = await AsyncStorage.getItem(NOTIFICATIONS.NotificationsStorage)
        if(notificationsList != null){
          dispatch({type: NotificationTypes.UPDATE_FROM_STORAGE, payload: JSON.parse(notificationsList)})
        }
      }
      else{
        await AsyncStorage.setItem(NOTIFICATIONS.LastUserLoggedStorage, token.unique_name)
      }
    }catch(_){}
  }
  await simpleAsycnActionCreator(
    STRINGS.GET,
    "apiNotifications",
    `ProviderNotifications/${getState().notifications.lastNotificationReadId ? getState().notifications.lastNotificationReadId : 0}`, 
    STRINGS.appJson,
    isNotificationsScreen ? NotificationTypes.NOTIFICATIONS_REQUESTED_ON_SCREEN : NotificationTypes.NOTIFICATIONS_REQUESTED_OFF_SCREEN,
    isNotificationsScreen ? NotificationTypes.NOTIFICATIONS_SUCCEDED_ON_SCREEN : NotificationTypes.NOTIFICATIONS_SUCCEDED_OFF_SCREEN,
    isNotificationsScreen ? NotificationTypes.NOTIFICATIONS_FAILED_ON_SCREEN : NotificationTypes.NOTIFICATIONS_FAILED_OFF_SCREEN,
    null,
    null,
    null
  )(dispatch, getState);
  if(deleteOldNotifications){
    dispatch({type: NotificationTypes.DELETE_OLD_NOTIFICATIONS})
  }
  const postState = getState().notifications;
  await AsyncStorage.setItem(NOTIFICATIONS.NotificationsStorage, JSON.stringify(postState.list))
};

export const reloadAllNotifications = () => async (dispatch: Dispatch, getState) => {
  await getNotifications(true, true, false)(dispatch, getState)
}

export const retryLoadNotifications = () => async (dispatch: Dispatch, getState) => {
  await getNotifications(false, false, true)(dispatch, getState)
}

export const loadNotificationsBySignalR = () => async (dispatch: Dispatch, getState) => {
  await getNotifications(true, false, false)(dispatch, getState)
}

export const loadNotificationOnBackgroundTask = () => async (dispatch: Dispatch, getState) => {
  await getNotifications(true, false, false)(dispatch, getState)
}

export const connectToSignalR = () => async (dispatch: Dispatch, getState) => {
  if(!IsOnBackgroundOrStarted(getState().notifications)){
    await NotificationsHub.connection.start();
    const token = decode(getState().authentication.accessToken)
    if(NotificationsHub.connection.state === HubConnectionState.Connected){
      NotificationsHub.connection.invoke(NOTIFICATIONS.Register, token.unique_name, parseInt(token.provider_oid));
    }
  }
};