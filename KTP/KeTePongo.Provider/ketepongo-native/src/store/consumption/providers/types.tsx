import { IConsumptionPayload } from '../types';
import {ErrorDetail} from "store";

// **** Types
export enum ProviderTypes {
  ADD_PROVIDER_REQUESTED = "ADD_PROVIDER_REQUESTED",
  ADD_PROVIDER_SUCCEEDED = "ADD_PROVIDER_SUCCEEDED",
  ADD_PROVIDER_FAILED = "ADD_PROVIDER_FAILED",
  DELETE_PROVIDER_CHOICE = "DELETE_PROVIDER_CHOICE",
  DELETE_PROVIDER_REQUESTED = "DELETE_PROVIDER_REQUESTED",
  DELETE_PROVIDER_SUCCEEDED = "DELETE_PROVIDER_SUCCEEDED",
  DELETE_PROVIDER_FAILED = "DELETE_PROVIDER_FAILED",
  UPDATE_PROVIDER_REQUESTED = "UPDATE_PROVIDER_REQUESTED",
  UPDATE_PROVIDER_SUCCEEDED = "UPDATE_PROVIDER_SUCCEEDED",
  UPDATE_PROVIDER_FAILED = "UPDATE_PROVIDER_FAILED",
  CLEAR_PROVIDER_ERROR = "CLEAR_PROVIDER_ERROR",
  NAVIGATE = "NAVIGATE"
}

/// **** Reducer
export interface IProvidersState {
  list: IProvider[],
  dictionary: IProviderHash,
  loading: boolean,
  error: ErrorDetail | null
}

export interface IProviderAction {
  type: string,
  payload: any
}

export type IProviderPayload = (
  IProvider |
  INewProvider |
  IConsumptionPayload |
  number
);

// ***** Actions
export interface IProvider {
  tradeName: string | number | number[] | IProviderSales,
  changeVersion: number,
  id: number,
  salesman: IProviderSales,
  orderWeekDays: number[],
}

export interface INewProvider {
  tradeName: string,
  salesman: IProviderSales,
  orderWeekDays: Array<number>
}

export interface IProviderSales {
  name: string,
  email: string,
  telephone: string
}

export interface IProviderHash {
  [details: string]: IProvider
}
