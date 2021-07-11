import { ConsumptionTypes } from '../consumption';
import { ProductTypes, IProduct, IProductsState } from '../consumption/products';
import { LocationTypes } from '../consumption/locations';
import { ProviderTypes } from '../consumption/providers';
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
  UPDATE_PRODUCT_SUCCEEDED,
  // CREATE_PRODUCT_SUCCEEDED,
  DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED,
} = ProductTypes;
const { DELETE_LOCATION_SUCCEEDED } = LocationTypes;
const { DELETE_PROVIDER_SUCCEEDED } = ProviderTypes;
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
    // case UPDATE_PRODUCT_SUCCEEDED:
    //   let products = state.products.map((prod) => {
    //     if(prod.id === action.payload.id) {
    //       return action.payload;
    //     }
    //     return prod;
    //   })
    //   return {
    //     ...state,
    //     products
    //   }
    case DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED:
      return {
        ...state,
        // products: state.products.filter((prod) => prod.id !== action.payload)
      };
    // case CREATE_PRODUCT_SUCCEEDED:
    //   return {
    //     ...state,
    //     products: [...state.products, action.payload]
    //   }
    case DELETE_PROVIDER_SUCCEEDED:
      return {
        ...state,
        // products: state.products.map((prod) => {
        //   if (prod.providerId === action.payload) {
        //     return {
        //       ...prod,
        //       providerId: undefined
        //     }
        //   }
        // })
      }
    // case DELETE_LOCATION_SUCCEEDED:
    //     products = state.products.map((prod) => {
    //       if (prod.locationsIds.indexOf(action.payload) !== -1) {
    //         return {
    //           ...prod,
    //           locationsIds: prod.locationsIds.filter((loc) => loc !== action.payload)
    //         }
    //       }
    //       return prod;
    //     })
    //     return {
    //       ...state,
    //       products
    //     }
    default:
      return state
  }
};

export default filterCatalogReducer;
