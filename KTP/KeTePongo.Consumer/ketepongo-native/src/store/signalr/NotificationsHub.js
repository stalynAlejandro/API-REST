import { HubConnectionBuilder, JsonHubProtocol } from "@microsoft/signalr";
import { loadNotificationsBySignalR } from "../notifications/operations";
import { BASEURL, NOTIFICATIONS } from "../../constants";
import { store } from "../../App"

export var NotificationsHub = {
    _connection: undefined,
    get connection() {
      if (!this._connection) {
        this._connection = new HubConnectionBuilder()
        .withUrl(BASEURL+NOTIFICATIONS.ConsumerHub,{
          withCredentials: false
        }).withHubProtocol(new JsonHubProtocol()).withAutomaticReconnect()
        .build();
        this._connection.on(NOTIFICATIONS.Signal,() => {
          store.dispatch(loadNotificationsBySignalR());
        });
      }
      return this._connection;
    }
  };