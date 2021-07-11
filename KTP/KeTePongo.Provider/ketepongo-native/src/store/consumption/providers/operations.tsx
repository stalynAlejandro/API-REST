import {
  ProviderTypes,
  INewProvider,
  IProvider
} from './types';

const {
  ADD_PROVIDER_REQUESTED,
  ADD_PROVIDER_SUCCEEDED,
  ADD_PROVIDER_FAILED,
  UPDATE_PROVIDER_REQUESTED,
  UPDATE_PROVIDER_SUCCEEDED,
  UPDATE_PROVIDER_FAILED,
  DELETE_PROVIDER_REQUESTED,
  DELETE_PROVIDER_SUCCEEDED,
  DELETE_PROVIDER_FAILED,
} = ProviderTypes;

import { STRINGS, ROUTES } from '../../../constants';
import { simpleAsycnActionCreator } from '../../actionCreatorMethods';
import { Dispatch } from "redux";

export const addProviderRequested = (provider: INewProvider, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.POST, "apiConsumers", 'Provider',
    STRINGS.appJson,
    ADD_PROVIDER_REQUESTED,
    ADD_PROVIDER_SUCCEEDED,
    ADD_PROVIDER_FAILED,
    provider,
    undefined,
    route
  )(dispatch, getState);
}

export const updateProviderRequested = (provider: IProvider, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.PUT, "apiConsumers", 'Provider',
    STRINGS.appJson,
    UPDATE_PROVIDER_REQUESTED,
    UPDATE_PROVIDER_SUCCEEDED,
    UPDATE_PROVIDER_FAILED,
    provider,
    undefined,
    route
  )(dispatch, getState);
}

export const deleteProviderRequested = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.DELETE, "apiConsumers", `Provider/${id}`,
    STRINGS.appJson,
    DELETE_PROVIDER_REQUESTED,
    DELETE_PROVIDER_SUCCEEDED,
    DELETE_PROVIDER_FAILED,
    { "Id": id },
    undefined,
    route
  )(dispatch, getState);
}
