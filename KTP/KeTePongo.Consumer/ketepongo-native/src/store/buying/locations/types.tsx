import { ErrorDetail } from "store"

//Types
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

//Reducer
export interface ILocationsState {
    list: ILocation[],
    displayList: string[],
    loading: boolean,
    error: ErrorDetail | boolean | undefined
}

export interface ILocation {
    changeVersion: number,
    id: number,
    name: string
}

export interface ILocationAction {
    type: string,
    payload: any
}