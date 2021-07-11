import {
  ProviderCatalogProductsTypes,
  IProviderCatalogProductsState,
  IProviderCatalogProductsAction
} from "./types";

import productsCarteReducer, {ProductCarteTypes} from "./productsCarte";
import sectionsReducer from "./sections";
import filterCatalogReducers from "../filterCatalog";
import { Action, Reducer } from "redux";
import { createSelector } from 'reselect'
import { SectionDTO, CatalogProductDTO } from "../../model/DTOs";
import { AppState } from "../../store";

const {
  RELOAD_ALL_DATA_SUCCEEDED,
  RELOAD_ALL_DATA_REQUESTED,
  RELOAD_ALL_DATA_FAILED,
  REMOVE_ERROR,
  ADD_ERROR,
  NOTHING_TO_UPDATE
} = ProviderCatalogProductsTypes;

const initialState: IProviderCatalogProductsState = {
  productsCarte: {
    list: [],
    dictionary: {},
    loading: false,
    error: null
  },
  sections: {
    list: [],
    dictionary: {},
    loading: false,
    error: null
  },
  error: null,
  loading: false,
  allergens: {},
  kindsOfFood: { 0: { id: 0, name: "Vegana", }, 1: { id: 1, name: "Oculto", } },
  changeVersion:0
};


const providerCatalogProductsReducer: Reducer<
  IProviderCatalogProductsState,
  IProviderCatalogProductsAction
> = (state = initialState, action: any) => {
  let schemaState: IProviderCatalogProductsState = {
    productsCarte: productsCarteReducer(state.productsCarte, action),
    sections: sectionsReducer(state.sections, action),
    error: state.error,
    loading: state.loading,
    allergens: state.allergens,
    kindsOfFood: state.kindsOfFood,
    changeVersion:action.payload?.changeVersion? action.payload?.changeVersion:state.changeVersion
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
        ...action.payload,
        loading: false
      };
      case NOTHING_TO_UPDATE:
        return{
          ...state,
          loading:false
        }
    case RELOAD_ALL_DATA_FAILED:
      return {
        ...schemaState,
        error: action.payload,
        loading: false
      };
    case "NAVIGATE":
    case REMOVE_ERROR:
      return{
        ...state,
        error: null
      }
    case ADD_ERROR:
      return{
        ...state,
        ...action.payload
      }
    case ProductCarteTypes.DELETE_PRODUCTCARTE_FROM_CATALOG_FAILED:
      return{
        ...state,
        error:{status:404, message: "No hemos podido realizar la acción en este momento. Inténtalo de nuevo más tarde."}
      }
    default:
      return {
        ...schemaState,
        loading: false
      };
  }
};

export default providerCatalogProductsReducer;
