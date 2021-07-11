import { ConsumptionTypes } from '../consumption';
import { ProductTypes, IProduct, IProductsState } from '../consumption/products';
import {
  IFilterCatalogState,
  IFilterCatalogActions,
  FilterCatalogTypes
} from './types';

const {
  FILTER_CATALOG_REQUEST,
  FILTER_CATALOG_RESPONSE,
  FILTER_CATALOG_SUCCESS
} = FilterCatalogTypes
const {
  DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED,
} = ProductTypes;
const { RELOAD_ALL_DATA_SUCCEEDED } = ConsumptionTypes
const initialState: IFilterCatalogState = {
  products: [],
  search: {
    keyword: '',
    providerId: -1,
    locationId: -1,
    weekdays: [-1]
  },
  loading: false,
};

const filterCatalogReducer = (state = initialState, action: IFilterCatalogActions) => {
  switch (action.type) {
    case RELOAD_ALL_DATA_SUCCEEDED:
      let list: IProduct[] = action.payload.products ? (action.payload.products as IProductsState).list : [];
      return {
        ...state,
        products: list,
        loading: false
      };
    case FILTER_CATALOG_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FILTER_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case FILTER_CATALOG_RESPONSE:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED:
      return {
        ...state,
      }
    default:
      return state
  }
};

export default filterCatalogReducer;
