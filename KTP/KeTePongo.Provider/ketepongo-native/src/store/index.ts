import { combineReducers } from "redux";
import consumptionReducer, { IConsumptionState } from "./consumption";
import providerCatalogProductsReducer, { IProviderCatalogProductsState } from "./providerCatalogProducts";
import filterCatalogReducer from "./filterCatalog";
import filterCatalogCarteReducer, {IFilterCatalogCarteState} from "./filterCatalogCarte";
import orderReducer, { IOrderState } from "./order";
import filterOrderReducer from "./filterOrder";
import {IAuthState, authenticationReducer} from "./authentication";
import employeeReducer from "./employee";
import { NavigationParams, NavigationState, NavigationScreenProp } from 'react-navigation';
import OrdersReducer from './orders';
import ClientsReducer from './clients';
import NotificationsReducer, { INotificationState } from './notifications';
export interface AppState {
  consumption: IConsumptionState;
  filterCatalog: any;
  order: IOrderState;
  filterOrder: any;
  authentication: IAuthState;
  employees: any;
  providerCatalogProducts: IProviderCatalogProductsState;
  filterCatalogCarte: IFilterCatalogCarteState;
  notifications: INotificationState;
}

export class ErrorDetail{
  constructor(status: string | number, description: string, validationErrors? : { [key: string]: string }){
    this.status = status.toString();
    this.description = description;
    this.validationErrors = validationErrors?transformErrorKeysToLowerCase(validationErrors): undefined;
  }
  status: string;
  description: string;
  validationErrors: { [key: string]: string } | undefined;
}

function transformErrorKeysToLowerCase (obj){
  let key, keys = Object.keys(obj);
  var n = keys.length;
  let newobj={}
  while (n--) {
    key = keys[n];
    newobj[key.toLowerCase()] = obj[key];
  }
  return newobj;
}

export interface NavigationProps{
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const rootReducer = combineReducers<AppState>({
  consumption: consumptionReducer,
  filterCatalog: filterCatalogReducer,
  order: orderReducer,
  filterOrder: filterOrderReducer,
  authentication: authenticationReducer,
  employees: employeeReducer,
  providerCatalogProducts: providerCatalogProductsReducer,
  filterCatalogCarte: filterCatalogCarteReducer,
  orders: OrdersReducer,
  clients: ClientsReducer,
  notifications: NotificationsReducer
});

export default rootReducer;
