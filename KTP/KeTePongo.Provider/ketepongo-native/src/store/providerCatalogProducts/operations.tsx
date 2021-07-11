import { Dispatch } from 'redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import db from '../apis/db';
import {
  ProviderCatalogProductsTypes,
  ProviderCatalogProductsItemType,
} from './types';
import { STRINGS } from "constants";
import { navigateToCatalogIfBussinessExists } from '../providerCatalogProducts';
import { errorStatusHandler } from '../errorStatusHandler';
import { hideSplashScreen, reloadAccessToken } from '../authentication';
import { FilterCatalogCarteTypes, navigateBackToCatalogCarte, filterCatalogCartRequest } from "../filterCatalogCarte";
import { simpleAsycnActionCreator } from '../actionCreatorMethods';
import { ProviderCatalogProductsDTO } from "../../model/DTOs";
import { AppState } from "store";
import { addError } from "./actions";
import { sortByDisplayOrderAndName } from "./sections/reducers";
import { reloadAllNotifications } from '../notifications/operations'
const {
  RELOAD_ALL_DATA_REQUESTED,
  RELOAD_ALL_DATA_SUCCEEDED,
  RELOAD_ALL_DATA_FAILED,
  RELOAD_PRODUCTSCARTE_DATA,
  RELOAD_SECTIONS_DATA,
  NOTHING_TO_UPDATE
} = ProviderCatalogProductsTypes;

export const refreshProviderCatalogProductsFromServer = () => async (dispatch: Dispatch, getState: () => AppState) =>
  reloadAllDataRequested(true)(dispatch, getState);

export const refreshProviderCatalogProductsFromServerAndFilter = ({ sectionsSelected, allergensSelected, kindsOfFoodSelected }) => async (dispatch: Dispatch, getState: () => AppState) => {
  await reloadAllDataRequested(true)(dispatch, getState);
  navigateBackToCatalogCarte()(dispatch);
  return filterCatalogCartRequest({ sectionsSelected, allergensSelected, kindsOfFoodSelected })(dispatch, getState);
}


export const reloadAllDataRequested = (isRefresh: boolean) => async (dispatch: Dispatch, getState: () => AppState) => {
  await reloadAccessToken()(dispatch, getState)
  if (!getState().authentication.hasConnectionWithServer && !getState().filterCatalogCarte.isInitialized) {
    const carteFromMemory = await AsyncStorage.getItem("carte");
    if (carteFromMemory) {
      upDateProviderCatalogProducts(JSON.parse(carteFromMemory), true)(dispatch);
    }
    return;
  }
  
  reloadAllNotifications()(dispatch, getState)

  let changeVersion = await AsyncStorage.getItem("carteChangeVersion");
  let urlToCall = "ProviderCatalogProducts";
  if (changeVersion !== null) {
    urlToCall = `ProviderCatalogProducts?changeVersion=${changeVersion}`;
  }
  await simpleAsycnActionCreator(STRINGS.GET, "apiProviders", urlToCall,
    STRINGS.appJson,
    RELOAD_ALL_DATA_REQUESTED,
    null,
    RELOAD_ALL_DATA_FAILED,
    { changeVersion: Number(changeVersion) },
    async (data: ProviderCatalogProductsDTO) => {
      if (data === "") {
        if (isRefresh === true) {
          dispatch({ type: NOTHING_TO_UPDATE });
          return;
        }
        data = JSON.parse(await AsyncStorage.getItem("carte"));
      }
      await upDateProviderCatalogProducts(data, false)(dispatch)
    },
    null,
  )(dispatch, getState);
}

const upDateProviderCatalogProducts = (data: ProviderCatalogProductsDTO, isLoadedFromMemory: boolean) => async (dispatch: Dispatch) => {
  const { sections, catalogProducts, allergens, changeVersion } = data;
  const payload = {
    sections: {
      list: sortByDisplayOrderAndName(sections),
      dictionary: createDictionary(sections),
      rejectedList: [],
      loading: false,
      error: null
    },
    productsCarte: {
      list: sortByDisplayOrderAndName(catalogProducts),
      dictionary: createDictionary(catalogProducts),
      loading: false,
      error: null
    },
    allergens: createDictionary(allergens),
    changeVersion: changeVersion
  };

  AsyncStorage.setItem("carte", JSON.stringify(data));
  AsyncStorage.setItem("carteChangeVersion", JSON.stringify(data.changeVersion));

  await Promise.all([
    dispatch({ type: RELOAD_PRODUCTSCARTE_DATA, payload: payload.productsCarte }),
    dispatch({ type: RELOAD_SECTIONS_DATA, payload: payload.sections }),
    dispatch({ type: RELOAD_ALL_DATA_SUCCEEDED, payload: payload }),
    dispatch({ type: FilterCatalogCarteTypes.PROVIDER_CATALOG_PRODUCTS_UPDATED, payload: { providerCatalogProducts: data } }),
  ])

  if (isLoadedFromMemory) {
    addError({ status: 404, message: "No hemos podido obtener datos actualizados. Comprueba tu conexión e inténtalo de nuevo" })(dispatch)
  }
}

interface Dictionary {
  [id: string]: ProviderCatalogProductsItemType
}

export const createDictionary = (array: Array<any>) => {
  let dictionary: Dictionary = {};

  array.map((item) => {
    if (!dictionary[item.id]) {
      dictionary[item.id] = item;
    }
  });

  return dictionary;
};
