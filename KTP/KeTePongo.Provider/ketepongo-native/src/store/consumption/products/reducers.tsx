import { ConsumptionTypes } from '../types';
import {
  IProductsState,
  IProductAction,
  ProductTypes,
  IProduct
} from './types';
import { ProviderTypes } from '../providers';
import { LocationTypes } from '../locations';
import {Action, Reducer} from "redux";

const { DELETE_LOCATION_SUCCEEDED } = LocationTypes;
const { DELETE_PROVIDER_SUCCEEDED } = ProviderTypes;
const { RELOAD_PRODUCTS_DATA } = ConsumptionTypes;
const {
  ADD_PRODUCT_TO_CATALOG_REQUESTED,
  ADD_PRODUCT_TO_CATALOG_SUCCEEDED,
  ADD_PRODUCT_TO_CATALOG_FAILED,
  UPDATE_PRODUCT_REQUESTED,
  UPDATE_PRODUCT_SUCCEEDED,
  UPDATE_PRODUCT_FAILED,
  DELETE_PRODUCT_FROM_CATALOG_REQUESTED,
  DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED,
  DELETE_PRODUCT_FROM_CATALOG_FAILED,
  CLEAR_PRODUCT_ERROR
} = ProductTypes

const initialState: IProductsState = {
  list: [],
  dictionary: {},
  rejectedList: [],
  loading: false,
  error: null
};

const productReducer : Reducer<IProductsState,IProductAction> = (state = initialState, action: any) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case RELOAD_PRODUCTS_DATA:
      return {
        ...state,
        ...action.payload as IProduct,
      };
      case ADD_PRODUCT_TO_CATALOG_SUCCEEDED:
        return {
          ...state,
          list: [...state.list, action.payload],
          dictionary: {
            ...state.dictionary,
            [(action.payload as IProduct).id]: action.payload
          },
          loading: false,
          error: null
        };
      case UPDATE_PRODUCT_SUCCEEDED:
        let list_updated = state.list.map(item => {
          if (item.id == (action.payload as IProduct).id) {
            return action.payload
          } else {
            return item;
          }
      });
        return {
          ...state,
          list: list_updated,
          dictionary: {
            ...state.dictionary,
            [(action.payload as IProduct).id]: action.payload as IProduct
          },
          loading: false,
          error: null
        };
      case DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED:
        let dictionary = Object.assign({}, state.dictionary);
        delete dictionary[action.payload as number];
        let newList = state.list.filter((item) => item.id !== action.payload as number);
        return {
          ...state,
          list: newList,
          dictionary,
          loading: false,
          error: null
        };
      case ADD_PRODUCT_TO_CATALOG_REQUESTED:
      case DELETE_PRODUCT_FROM_CATALOG_REQUESTED:
      case UPDATE_PRODUCT_REQUESTED:
        return {
          ...state,
          loading: true,
          error: null
        };
      case ADD_PRODUCT_TO_CATALOG_FAILED:
      case DELETE_PRODUCT_FROM_CATALOG_FAILED:
      case UPDATE_PRODUCT_FAILED:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
    default:
      return state;
  }
};

export default productReducer;
