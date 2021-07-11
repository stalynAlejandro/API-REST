import {
  ConsumptionTypes,
  IConsumptionState,
  IConsumptionAction
} from './types';

import productsReducer, { IProduct } from './products';
import locationsReducer from './locations';
import providersReducers from './providers';
import filterCatalogReducers from '../filterCatalog';
import {Action, Reducer} from "redux";

const {
  RELOAD_ALL_DATA_SUCCEEDED,
  RELOAD_ALL_DATA_REQUESTED,
  RELOAD_ALL_DATA_FAILED,
} = ConsumptionTypes


const initialState: IConsumptionState = {
  products: {
    list: [],
    dictionary: {},
    rejectedList: [],
    loading: false,
    error: null
  },
  locations: {
    list: [],
    dictionary: {},
    loading: false,
    error: null
  },
  providers: {
    list: [],
    dictionary: {},
    loading: false,
    error: null
  },
  error: null,
  loading: false
};

const consumptionReducer : Reducer<IConsumptionState,IConsumptionAction> = (state = initialState, action: any) => {
  let schemaState : IConsumptionState = {
    products: productsReducer(state.products, action),
    locations: locationsReducer(state.locations, action),
    providers: providersReducers(state.providers, action),
    error: state.error,
    loading: state.loading
  };

  switch (action.type) {
    case RELOAD_ALL_DATA_REQUESTED:
      return {
        ...schemaState,
        loading: true
      };
    case RELOAD_ALL_DATA_SUCCEEDED:
      return {
        ...schemaState,
        loading: false
      };
    case RELOAD_ALL_DATA_FAILED:
      return {
        ...schemaState,
        error: action.payload,
        loading: false
      };
    default:
      return {
        ...schemaState,
        loading: false
      };
  }
};

export default consumptionReducer;
