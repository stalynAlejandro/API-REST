import { STRINGS, ROUTES } from '../../../constants';
import { simpleAsycnActionCreator } from '../../actionCreatorMethods';
import { Dispatch } from "redux";
import { reloadAllDataRequested } from '../operations'
import { actionConsts } from './actionTypes'
import { INewProviderDTO } from './operationTypes'
import { IProvider } from './reducerTypes';

export const requestToLinkProvider = (email?: string, phone?: string) => async (dispatch: Dispatch, getState) => {
  await simpleAsycnActionCreator(
    STRINGS.GET,
    "apiProviders",
    `ProviderRequestLink?email=${email}&phone=${phone}`,
    STRINGS.appJson,
    actionConsts.REQUEST_INFO_LINK_PROVIDER_REQUEST,
    actionConsts.REQUEST_INFO_LINK_PROVIDER_SUCCEEDED,
    actionConsts.REQUEST_INFO_LINK_PROVIDER_FAILED,
    "",
    null,
    null,
  )(dispatch, getState);
}

export const confirmToLinkProvider = (provider: INewProviderDTO, route = ROUTES.MyProvidersScreen) => async (dispatch: Dispatch, getState) => {

  const formdata = new FormData();
  formdata.append("provider", JSON.stringify(provider))

  await simpleAsycnActionCreator(
    STRINGS.POST,
    "apiConsumers",
    "Provider",
    STRINGS.appJson,
    actionConsts.REQUEST_LINK_PROVIDER_CONFIRM_REQUEST,
    actionConsts.REQUEST_LINK_PROVIDER_CONFIRM_SUCCEEDED,
    actionConsts.REQUEST_LINK_PROVIDER_CONFIRM_FAILED,
    provider,
    async () => await reloadAllDataRequested(true)(dispatch, getState),
    route,
  )(dispatch, getState);
}

export const updateProviderRequested = (provider: IProvider, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.PUT, "apiConsumers", 'Provider',
    STRINGS.appJson,
    actionConsts.UPDATE_PROVIDER_REQUESTED,
    actionConsts.UPDATE_PROVIDER_SUCCEEDED,
    actionConsts.UPDATE_PROVIDER_FAILED,
    provider,
    undefined,
    route
  )(dispatch, getState);
}

export const deleteProviderRequested = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState) => {
  return await simpleAsycnActionCreator(STRINGS.DELETE, "apiConsumers", `Provider/${id}`,
    STRINGS.appJson,
    actionConsts.DELETE_PROVIDER_REQUESTED,
    actionConsts.DELETE_PROVIDER_SUCCEEDED,
    actionConsts.DELETE_PROVIDER_FAILED,
    { "Id": id },
    async () => await reloadAllDataRequested(true)(dispatch, getState),
    route
  )(dispatch, getState);
}