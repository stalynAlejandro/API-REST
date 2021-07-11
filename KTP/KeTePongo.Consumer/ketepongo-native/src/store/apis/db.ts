import axios, { AxiosRequestConfig, AxiosInstance } from "axios";
import { BASEURL, STRINGS } from "../../constants";
import { BASEAPIMODULES } from "../../constants";
import AsyncStorage from "@react-native-community/async-storage";
import { AppState } from "store"

const apiProviders = (headers?: any, getState : () => AppState) =>
  withAuthHeaders(
    {
      baseURL: `${BASEURL}${BASEAPIMODULES.ProvidersAPI}`,
      timeout: 3500,
    },
    headers,
    getState,
    getState().authentication.apiVersions?.provider
  );

const apiUsers =  (headers?: any, getState : () => AppState) =>
  withAuthHeaders(
    {
      baseURL: `${BASEURL}${BASEAPIMODULES.UsersAPI}`,
      timeout: 3500,
    },
    headers,
    getState,
    getState().authentication.apiVersions?.users
  );

const apiAccessToken =  (headers?: any, getState : () => AppState) =>
  withAuthHeaders(
    {
      baseURL: `${BASEURL}${BASEAPIMODULES.KeTePongoOauth2API}`,
      timeout: 3500,
    },
    headers,
    getState,
    ""
  );

const apiConsumers =  (headers?: any, getState : () => AppState) =>
  withAuthHeaders(
    {
      baseURL: `${BASEURL}${BASEAPIMODULES.ConsumersAPI}`,
      timeout: 3500,
    },
    headers,
    getState,
    getState().authentication.apiVersions?.consumer
  );

  const apiNotifications = (headers?: any, getState : () => AppState) =>
  withAuthHeaders(
    {
      baseURL: `${BASEURL}${BASEAPIMODULES.NotificationsAPI}`,
      timeout: 3500,
    },
    headers,
    getState,
    ""
  );

const apiUsersWithoutAuthentication = (headers) => axios.create({
    baseURL: `${BASEURL}${BASEAPIMODULES.UsersAPI}`,
    timeout: 3500,
    headers
  });

const apiAccessTokenWithoutAuthentication = (headers?: any) =>
axios.create({
    baseURL: `${BASEURL}${BASEAPIMODULES.KeTePongoOauth2API}`,
    timeout: 3500,
    headers
  });


export default {
  apiProviders,
  apiUsers,
  apiAccessToken,
  apiConsumers,
  apiNotifications,
  apiUsersWithoutAuthentication,
  apiAccessTokenWithoutAuthentication
};

export function withAuthHeaders(
  config: AxiosRequestConfig,
  otherHeaders: any,
  getState : () => AppState,
  apiVersion: string
): AxiosInstance {
  const {accessToken, appVersion } = getState().authentication;

  const defaultHeaders = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": STRINGS.appJson,
    "api-version": apiVersion,
    "client-version": appVersion,
    "client-id": "KeTePongoConsumerApp"
  };
  const headers = { ...defaultHeaders, ...(otherHeaders ? otherHeaders : {}) };
  return axios.create({
    ...config,
    timeout: 3500,
    headers
  });
}
