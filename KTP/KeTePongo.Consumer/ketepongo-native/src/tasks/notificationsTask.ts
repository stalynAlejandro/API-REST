import { defineTask, isTaskRegisteredAsync } from 'expo-task-manager';
import { registerTaskAsync } from "expo-background-fetch";
import {reloadAccessToken} from '../store/authentication/operations'
import {loadNotificationOnBackgroundTask} from '../store/notifications/operations'
import {store} from '../App';
import { NotificationTypes } from '../store/notifications';
import { NOTIFICATIONS } from '../constants';
export const createAndExecuteNotificationsBackgroundTask = async () => {
    defineTask(NotificationTypes.PULL_NOTIFICATIONS.valueOf(), async () => {
        await store.dispatch({type: NotificationTypes.STARTED_LOADING_ON_BACKGROUND})
        await store.dispatch(reloadAccessToken(false));
        if(await store.getState().authentication.isUserLogged){
            await store.dispatch(loadNotificationOnBackgroundTask());
        }
        await store.dispatch({type: NotificationTypes.FINISHED_LOADING_ON_BACKGROUND})
    })
    if(!(await isTaskRegisteredAsync(NotificationTypes.PULL_NOTIFICATIONS.valueOf()))){
        registerTaskAsync(NotificationTypes.PULL_NOTIFICATIONS.valueOf(), {
            minimumInterval: parseInt(NOTIFICATIONS.MinimumInterval),
            startOnBoot: NOTIFICATIONS.StartOnBoot === "true",
            stopOnTerminate: NOTIFICATIONS.StopOnTerminate === "true"})
    }
}
