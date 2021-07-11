import Config from "react-native-config";

const {NOTIFICATIONS_TASK_MINIMUM_INTERVAL, NOTIFICATIONS_TASK_START_ON_BOOT, NOTIFICATIONS_TASK_STOP_ON_TERMINATE} = Config;
const NOTIFICATIONS = {
    Register: "RegisterUserForNotificationsAsync",
    Signal: "NewNotificationSignal",
    ConsumerHub: "consumerNotifications",
    NotificationsStorage: "notifications",
    LastUserLoggedStorage: "lastUserLogged",
    MinimumInterval: NOTIFICATIONS_TASK_MINIMUM_INTERVAL,
    StartOnBoot: NOTIFICATIONS_TASK_START_ON_BOOT,
    StopOnTerminate: NOTIFICATIONS_TASK_STOP_ON_TERMINATE
  };
  
  export { NOTIFICATIONS };