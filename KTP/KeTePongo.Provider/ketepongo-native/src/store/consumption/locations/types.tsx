import { IConsumptionPayload } from '../types';
import { ErrorDetail } from "store"

// ***** types
export enum LocationTypes {
  ADD_LOCATION_REQUESTED = 'ADD_LOCATION_REQUESTED',
  ADD_LOCATION_SUCCEEDED = 'ADD_LOCATION_SUCCEEDED',
  ADD_LOCATION_FAILED = 'ADD_LOCATION_FAILED',
  DELETE_LOCATION_REQUESTED = 'DELETE_LOCATION_REQUESTED',
  DELETE_LOCATION_SUCCEEDED = 'DELETE_LOCATION_SUCCEEDED',
  DELETE_LOCATION_FAILED = 'DELETE_LOCATION_FAILED',
  UPDATE_LOCATION_REQUESTED = 'UPDATE_LOCATION_REQUESTED',
  UPDATE_LOCATION_SUCCEEDED = 'UPDATE_LOCATION_SUCCEEDED',
  UPDATE_LOCATION_FAILED = 'UPDATE_LOCATION_FAILED',
  CLEAR_LOCATION_ERROR = 'CLEAR_LOCATION_ERROR',
  NAVIGATE = 'NAVIGATE'
};

// ***** Reducer
export interface ILocationsState {
  list: ILocation[],
  dictionary: ILocationHash,
  loading: boolean,
  error: ErrorDetail | null
}

export interface ILocationAction {
  type: string,
  payload: IlocationPayload
}

export type IlocationPayload = (
  IConsumptionPayload |
  ILocation |
  INewLocation |
  ILocationError |
  number
)

// ***** Actions
export interface ILocation {
  changeVersion: number,
  id: number,
  [name: string] : string | number
}

export interface IIndexLocation {
  [name: string]: ILocation
}

export interface INewLocation {
  [name: string] : string
}

export interface ILocationError {
  error: ErrorDetail
}

export interface ILocationHash {
  [details: string] : ILocation
}
