import { ProviderCatalogProductsTypes } from '../types';
import {
  IProductsCarteState,
  ICatalogProductAction,
  ProductCarteTypes,
  
} from './types';
import { SectionTypes } from '../sections';
import {Action, Reducer} from "redux";
import {sortByDisplayOrderAndName} from "../sections/reducers"
import { CatalogProductDTO } from '../../../model/DTOs';

const { RELOAD_PRODUCTSCARTE_DATA } = ProviderCatalogProductsTypes;
const {
  ADD_PRODUCTCARTE_TO_CATALOG_REQUESTED,
  ADD_PRODUCTCARTE_TO_CATALOG_SUCCEEDED,
  ADD_PRODUCTCARTE_TO_CATALOG_FAILED,
  UPDATE_PRODUCTCARTE_REQUESTED,
  UPDATE_PRODUCTCARTE_SUCCEEDED,
  UPDATE_PRODUCTCARTE_FAILED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_REQUESTED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_SUCCEEDED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_FAILED,
  CLEAR_PRODUCTCARTE_ERROR,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_SUCCEEDED,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_REQUESTED,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_FAILED
} = ProductCarteTypes


const initialState: IProductsCarteState = {
  list: [],
  dictionary: {},
  loading: false,
  error: null
};

const productCarteReducer : Reducer<IProductsCarteState,ICatalogProductAction> = (state = initialState, action: any) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case RELOAD_PRODUCTSCARTE_DATA:
      return {
        ...state,
        ...action.payload as CatalogProductDTO,
      };
      case ADD_PRODUCTCARTE_TO_CATALOG_SUCCEEDED:
        return {
          ...state,
          list: [...state.list, action.payload],
          dictionary: {
            ...state.dictionary,
            [(action.payload as CatalogProductDTO).id]: action.payload
          },
          loading: false,
          error: null
        };
        case UPDATE_PRODUCTCARTE_DISPLAY_ORDER_SUCCEEDED:
          return {
            ...state,
            loading: false,
            error: null
          };
        case UPDATE_PRODUCTCARTE_SUCCEEDED:
        let list_updated = state.list.map(item => {
          if (item.id == (action.payload as CatalogProductDTO).id) {
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
            [(action.payload as CatalogProductDTO).id]: action.payload as CatalogProductDTO
          },
          loading: false,
          error: null
        };
      case DELETE_PRODUCTCARTE_FROM_CATALOG_SUCCEEDED:
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
      case ADD_PRODUCTCARTE_TO_CATALOG_REQUESTED:
      case DELETE_PRODUCTCARTE_FROM_CATALOG_REQUESTED:
      case UPDATE_PRODUCTCARTE_REQUESTED:
      case UPDATE_PRODUCTCARTE_DISPLAY_ORDER_REQUESTED:
        return {
          ...state,
          loading: true,
          error: null
        };
      case ADD_PRODUCTCARTE_TO_CATALOG_FAILED:
      case DELETE_PRODUCTCARTE_FROM_CATALOG_FAILED:
      case UPDATE_PRODUCTCARTE_FAILED:
      case UPDATE_PRODUCTCARTE_DISPLAY_ORDER_FAILED:
        return {
          ...state,
          loading: false,
          error:action.payload.error
        };
      case "PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED":
        return updateProductPairCarteToDisplayedSections(state, action.payload);
      case "NAVIGATE":
        return{
          ...state,
          error: null
        }
    default:
      return state;
  }
};

function updateProductPairCarteToDisplayedSections(state: IProductsCarteState, productDisplayOrderChanging: ChangedDisplayOrder): IProductsCarteState {

  var products = Object.values(productDisplayOrderChanging);
  /*products.forEach(product => {
    sections.map(x => x.products = x.products.filter(x => x.id !== product.id || (x.id === -1 && product.sectionIds.length === 0)));
    sections.filter(x => product.sectionIds.some(k => k === x.id) || (x.id === -1 && product.sectionIds.length === 0))
      .map(x => x.products.push(product))
  });

  let productDisplayOrderChanged = state.productDisplayOrderChanged;
  Object.keys(productDisplayOrderChanging).forEach(productId => {
    productDisplayOrderChanged[productId] = productDisplayOrderChanging[productId];
    productDisplayOrderChanged[productId].sectionIds = productDisplayOrderChanging[productId].sectionIds[0] == -1 ? [] : productDisplayOrderChanging[productId].sectionIds;
  });*/

  let productsFromState = [...state.list];

  products.forEach(x=>{
    let index = productsFromState.findIndex(k=>k.id===x.id);
    productsFromState[index].sectionIds = x.sectionIds;
    productsFromState[index].displayOrder = x.displayOrder;
  })

  productsFromState = productsFromState.sort((a, b) => a.displayOrder - b.displayOrder);

 //var newProducts = [...state.list, ...products]; //TODO updatear diccionario tambien

  return {
    ...state,
    list: productsFromState
  }
}


export default productCarteReducer;
