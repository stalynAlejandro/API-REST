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
export const loadProviderCatalogCarte = (providerOID: number, providerId:number) => async (dispatch: Dispatch, getState: () => AppState) => {
  await reloadAccessToken(false)(dispatch, getState)
  let urlToCall = `ProviderCatalogProductsForConsumer?providerOID=${providerOID}`;
  await simpleAsycnActionCreator(STRINGS.GET, "apiProviders", urlToCall,
    STRINGS.appJson,
    RELOAD_ALL_DATA_REQUESTED,
    null,
    RELOAD_ALL_DATA_FAILED,
    {},
    async (data: ProviderCatalogProductsDTO) => {
      if (data === "") {
          dispatch({ type: NOTHING_TO_UPDATE });
          return;
      }
      await updateProviderCatalogProducts(data, false, providerOID, providerId)(dispatch,getState)
    },
    null,
  )(dispatch, getState);
}

const updateProviderCatalogProducts = (data: ProviderCatalogProductsDTO, isLoadedFromMemory: boolean, providerOID:number, providerId:number) => async (dispatch: Dispatch, getState: ()=>AppState) => {
  
  var consumptionProductsDictionary = getState().consumption.products.dictionaryByProvider[providerOID];
  
  const { sections, catalogProducts, allergens, changeVersion } = data;
  for (let index = 0; index < catalogProducts.length; index++) {
    const element = catalogProducts[index];
    
    element.isInConsumption = (consumptionProductsDictionary && consumptionProductsDictionary[element.erpId])? true:false;
    element.providerId =  providerId;
    element.keTePongoProviderOID= providerOID;
  }
  
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
const createDictionaryByERPId = (array: Array<any>) => {
  let dictionary: Dictionary = {};

  array.map((item) => {
    if (!dictionary[item.erpId]) {
      dictionary[item.erpId] = item;
    }
  });

  return dictionary;
};
