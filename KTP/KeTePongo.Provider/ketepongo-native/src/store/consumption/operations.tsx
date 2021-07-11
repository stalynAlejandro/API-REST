import { Dispatch } from 'redux';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';
import db from '../apis/db';
import {
  ConsumptionTypes,
  ConsumptionItemType,
} from './types';
import { IProduct } from './products/types';
// import { LOAD_PREVIOUS_ORDER } from '../order';

import { navigateToCatalog, navigateToCatalogIfBussinessExists } from '../consumption';
import { errorStatusHandler } from '../errorStatusHandler';
import { hideSplashScreen, reloadAccessToken } from '../authentication';
import { simpleAsycnActionCreator } from '../actionCreatorMethods';
import SplashScreen from 'react-native-splash-screen';
import { STRINGS } from "constants";

const {
  RELOAD_ALL_DATA_REQUESTED,
  RELOAD_ALL_DATA_SUCCEEDED,
  RELOAD_ALL_DATA_FAILED,
  RELOAD_PRODUCTS_DATA,
  RELOAD_PROVIDERS_DATA,
  RELOAD_LOCATIONS_DATA
} = ConsumptionTypes;


export const reloadAllDataRequested = () => async (dispatch: Dispatch, getState) => {
    await reloadAccessToken()(dispatch,getState)
    navigateToCatalogIfBussinessExists()(dispatch)
    await simpleAsycnActionCreator(STRINGS.GET, "apiConsumers", 'Consumption',
      STRINGS.appJson,
      RELOAD_ALL_DATA_REQUESTED,
      null,
      RELOAD_ALL_DATA_FAILED,
      null,
      async ( data ) => await upDateConsumption(data)(dispatch),
      null
    )(dispatch, getState);
}

const upDateConsumption = (data: any) => async (dispatch: Dispatch) => {
  const { locations, products, providers } = data;
  const payload = {
    locations: {
      list: sortAlphabetically(locations, 'name'),
      dictionary: createDictionary(locations),
      rejectedList: [],
      loading: false,
      error: null
    },
    products: {
      list: sortAlphabetically(products, 'name'),
      dictionary: createDictionary(products),
      loading: false,
      error: null
    },
    providers: {
      list: sortAlphabetically(providers, 'tradeName'),
      dictionary: createDictionary(providers),
      loading: false,
      error: null
    }
  };

  await Promise.all([
    dispatch({ type: RELOAD_PRODUCTS_DATA, payload: payload.products }),
    dispatch({ type: RELOAD_LOCATIONS_DATA, payload: payload.locations }),
    dispatch({ type: RELOAD_PROVIDERS_DATA, payload: payload.providers }),
    dispatch({ type: RELOAD_ALL_DATA_SUCCEEDED, payload }),
  ])

  let order;
  try {
    order = await AsyncStorage.getItem('@order');
  } catch (error) {
    // eslint-disable-next-line no-undef
    console.log('**********error******', error);
  }

  if (order && order !== '') {
    order = JSON.parse(order);
    if (moment(order.deliveryDate).isBefore(new Date())) {
      order.deliveryDate = new Date();
    }
  }
}

interface Dictionary {
  [id: string]: ConsumptionItemType
}

const createDictionary = (array: Array<any>) => {
  let dictionary: Dictionary = {};

  array.map((item) => {
    if (!dictionary[item.id]) {
      dictionary[item.id] = item;
    }
  });

  return dictionary;
};

export const sortAlphabetically = (array: Array<any>, type: string) => {
  let nameA: string;
  let nameB: string;
  return array.sort((a, b) => {
    nameA = String(a[type]).toUpperCase();
    nameB = String(b[type]).toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};
