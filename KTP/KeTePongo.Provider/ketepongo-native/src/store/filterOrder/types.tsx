import { IProduct } from "../consumption/products";
import { number } from "prop-types";
import { Provider } from "react-redux";

// ***** Types
export enum FilterOrderTypes {
  LOAD_FILTER_ORDER = 'LOAD_FILTER_ORDER',
  FILTER_ORDER_REQUEST = 'FILTER_ORDER_REQUEST',
  FILTER_ORDER_RESPONSE = 'FILTER_ORDER_RESPONSE',
  FILTER_ORDER_SUCCESS = 'FILTER_ORDER_SUCCESS',
}

// ***** Reducer
export interface IFilterOrderState {
  products: IProduct[],
  loading: boolean
}

export interface IFilterOrderActions {
  type: string,
  payload: IFilterOrderPayload
}

export type IFilterOrderPayload = IProduct[];

// ***** Actions

export interface IFilterOrderRquestData {
  locationId: number,
  providerId: number,
  weekdays: number[]
}
