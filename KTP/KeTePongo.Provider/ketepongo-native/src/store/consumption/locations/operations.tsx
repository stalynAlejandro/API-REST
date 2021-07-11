import {
  LocationTypes,
  ILocation
} from './types';
import { STRINGS, ROUTES } from '../../../constants';
import { simpleAsycnActionCreator } from '../../actionCreatorMethods';
import { Dispatch } from "redux";
const {
  ADD_LOCATION_REQUESTED,
  ADD_LOCATION_SUCCEEDED,
  ADD_LOCATION_FAILED,
  UPDATE_LOCATION_REQUESTED,
  UPDATE_LOCATION_SUCCEEDED,
  UPDATE_LOCATION_FAILED,
  DELETE_LOCATION_REQUESTED,
  DELETE_LOCATION_SUCCEEDED,
  DELETE_LOCATION_FAILED,
} = LocationTypes;

export const addLocationRequested = (name: string, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.POST, "apiConsumers", 'Location',
    STRINGS.appJson,
    ADD_LOCATION_REQUESTED,
    ADD_LOCATION_SUCCEEDED,
    ADD_LOCATION_FAILED,
    { "Name": name },
    undefined,
    route
  )(dispatch, getState);
};

export const updateLocationRequested = (location: ILocation, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.PUT, "apiConsumers", 'Location',
    STRINGS.appJson,
    UPDATE_LOCATION_REQUESTED,
    UPDATE_LOCATION_SUCCEEDED,
    UPDATE_LOCATION_FAILED,
    location,
    undefined,
    route
  )(dispatch, getState);
};

export const deleteLocationRequested = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {

  return await simpleAsycnActionCreator(STRINGS.DELETE, "apiConsumers", `Location/${id}`,
    STRINGS.appJson,
    DELETE_LOCATION_REQUESTED,
    DELETE_LOCATION_SUCCEEDED,
    DELETE_LOCATION_FAILED,
    { "Id": id },
    undefined,
    route
  )(dispatch, getState);

};
