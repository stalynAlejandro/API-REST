import axios, { AxiosResponse } from 'axios';
import { ROUTES, compareVersion, BASEAPIMODULES} from 'constants';
import NavigationService from '../navigation/NavigationService';
import {errorStatusHandler} from './errorStatusHandler';
import AsyncStorage from "@react-native-community/async-storage";
import db from "./apis/db";

import { AuthenticationTypes, getAPIVersions, APIVersions } from "./authentication";
import { isAnyAPIVersionOutdated } from 'shared';

export const simpleAsycnActionCreator = (
  APICall,
  ApiModule,
  path,
  APIConfig,
  actionTypeRequest,
  actionTypeSuccess,
  actionTypeFailed,
  data,
  onSucessCallBack,
  routeNavigation,
  headers?
) => async (dispatch, getState) => {
  dispatch({ type: actionTypeRequest });
  let response;
  try {
    let apiCall = getAPICall(ApiModule, headers, APICall, path, data,getState);
    response = await apiCall();
  } catch (error) {
    if(error && error.request && (error.request.status !== 521 && error.request.status !== 426 )){
        dispatch({ type: actionTypeFailed, payload: {error: errorStatusHandler(error) }});
        return;
    }

    if(error.request.status === 521){
      const apiVersions = await getNewAPIVersions();
      const apiVersion = ApiModule === "apiConsumers" ? apiVersions.consumer : ApiModule === "apiProviders"?  apiVersions.provider : apiVersions.users;

      if(isAnyAPIVersionOutdated(apiVersions)){
        dispatch({ type: AuthenticationTypes.SET_APP_OUTDATED});
        return;
      }

      dispatch({ type: AuthenticationTypes.SET_API_VERSIONS, payload: {apiVersions}});
      let apiCall = getAPICall(ApiModule, {...headers,...{"api-version": apiVersion}}, APICall, path, data, getState);
      try{
        response = await apiCall();
      }catch(retryError){
        dispatch({ type: actionTypeFailed, payload: {error: errorStatusHandler(retryError) } });
        return;
      }
    }

    if(error.request.status === 426){
      dispatch({ type: AuthenticationTypes.SET_APP_OUTDATED});
      return;
    }
  }
  if(actionTypeSuccess){
      await dispatch({ type: actionTypeSuccess, payload: response.data });
  }

  if (onSucessCallBack) {
    await onSucessCallBack(response.data);
  }

  if (routeNavigation) {
    if (routeNavigation === ROUTES.NavigateBack) {
      return NavigationService.navigateBack();
    }

    return NavigationService.navigate(routeNavigation);
  }
};

const getNewAPIVersions = async() =>  {
  let apiVersions : APIVersions = {
    consumer: "",
    provider: "",
    users:"",
  };
  await Promise.all(getAPIVersions()).then((versions)=>{
    apiVersions ={
      consumer: versions[0].data,
      provider: versions[1].data,
      users: versions[2].data
    }
  }).catch((error)=>{
    throw error;
  });
  return apiVersions;
}

const getAPICall = (ApiModule, headers, APICall, path, data, getState) : () => Promise<AxiosResponse> => {
  if (APICall.toLowerCase() == "post" || APICall.toLowerCase() == "put"){
      return async()=>{ return await db[ApiModule](headers, getState)[APICall](path, data)};
  }
  return async()=>{ return await db[ApiModule](headers, getState)[APICall](path)};
}


export const simplestActionCreator = (type, payload) => ({type,payload})
