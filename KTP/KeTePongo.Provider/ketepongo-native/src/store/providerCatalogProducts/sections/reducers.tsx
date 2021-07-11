import { ProviderCatalogProductsTypes } from '../types';
import {
  ISectionsState,
  SectionTypes,
  ISectionAction,
  ISection
} from './types';
import { Action, Reducer } from "redux";
import { SectionDTO, CatalogProductDTO } from "../../../model/DTOs";
import { FilterCatalogCarteTypes } from "../../filterCatalogCarte/types";

const { RELOAD_SECTIONS_DATA } = ProviderCatalogProductsTypes;
const {
  ADD_SECTION_REQUESTED,
  ADD_SECTION_SUCCEEDED,
  ADD_SECTION_FAILED,
  DELETE_SECTION_REQUESTED,
  DELETE_SECTION_SUCCEEDED,
  DELETE_SECTION_FAILED,
  UPDATE_SECTION_REQUESTED,
  UPDATE_SECTION_SUCCEEDED,
  UPDATE_SECTION_FAILED,
  CLEAR_SECTION_ERROR
} = SectionTypes;


const initialState: ISectionsState = {
  list: [],
  dictionary: {},
  loading: false,
  error: null
};


const sections: Reducer<ISectionsState, ISectionAction> = (state = initialState, action: any) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case RELOAD_SECTIONS_DATA:
      return {
        ...state,
        ...action.payload as ISection,
      };
    case ADD_SECTION_SUCCEEDED:
      let newlist = sortByDisplayOrderAndName([...state.list, action.payload]);
      return {
        ...state,
        list: newlist,
        dictionary: createDictionary(newlist),
        loading: false,
        error: null
      };
    case UPDATE_SECTION_SUCCEEDED:
      let list_updated = state.list.map(item => {
        if (item.id == (action.payload as ISection).id) {
          return action.payload
        } else {
          return item;
        }
      });
      let list_updatedOrdered = sortByDisplayOrderAndName(list_updated)
      return {
        ...state,
        list: list_updatedOrdered,
        dictionary: createDictionary(list_updatedOrdered),
        loading: false,
        error: null
      };
    case DELETE_SECTION_SUCCEEDED:
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
    case ADD_SECTION_REQUESTED:
    case DELETE_SECTION_REQUESTED:
    case UPDATE_SECTION_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_SECTION_FAILED:
    case DELETE_SECTION_FAILED:
    case UPDATE_SECTION_FAILED:
      return {
        ...state,
        loading: false,
        ...action.payload
      };
      case "SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED":       
      const listOrdered= action.payload.sections.map(s=>s.section).sort((a, b) => a.displayOrder - b.displayOrder);
      return{
        ...state,
        list: listOrdered,
        dictionary: createDictionary(listOrdered),
      } 
    case "NAVIGATE":
    case CLEAR_SECTION_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
};
interface Dictionary {
  [id: string]: any
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
export const sortByDisplayOrderAndName = (array: SectionDTO[] | CatalogProductDTO[]) => {
  return array.sort((a, b) => {
    const greaterDisplayOrderSort = a.displayOrder - b.displayOrder;
    return greaterDisplayOrderSort === 0 ? a.name.localeCompare(b.name) : greaterDisplayOrderSort;
  });
};
export default sections;
