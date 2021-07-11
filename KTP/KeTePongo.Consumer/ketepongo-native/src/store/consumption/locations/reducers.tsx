import { ConsumptionTypes } from '../types';
import {
  ILocationsState,
  LocationTypes,
  ILocationAction,
  ILocation
} from './types';
import {Action, Reducer} from "redux";

const { RELOAD_LOCATIONS_DATA } = ConsumptionTypes;
const {
  ADD_LOCATION_REQUESTED,
  ADD_LOCATION_SUCCEEDED,
  ADD_LOCATION_FAILED,
  DELETE_LOCATION_REQUESTED,
  DELETE_LOCATION_SUCCEEDED,
  DELETE_LOCATION_FAILED,
  UPDATE_LOCATION_REQUESTED,
  UPDATE_LOCATION_SUCCEEDED,
  UPDATE_LOCATION_FAILED,
  CLEAR_LOCATION_ERROR
} = LocationTypes;

const initialState: ILocationsState = {
  list: [],
  dictionary: {},
  loading: false,
  error: null
};

const locations : Reducer<ILocationsState,ILocationAction> = (state = initialState, action: any) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case RELOAD_LOCATIONS_DATA:
      return {
        ...state,
        ...action.payload as ILocation,
      };
    case ADD_LOCATION_SUCCEEDED:
      return {
        ...state,
        list: [...state.list, action.payload],
        dictionary: {
          ...state.dictionary,
          [(action.payload as ILocation).id]: action.payload
        },
        loading: false,
        error: null
      };
    case UPDATE_LOCATION_SUCCEEDED:
      let list_updated = state.list.map(item => {
        if (item.id == (action.payload as ILocation).id) {
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
          [(action.payload as ILocation).id]: action.payload as ILocation
        },
        loading: false,
        error: null
      };
    case DELETE_LOCATION_SUCCEEDED:
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
    case ADD_LOCATION_REQUESTED:
    case DELETE_LOCATION_REQUESTED:
    case UPDATE_LOCATION_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_LOCATION_FAILED:
    case DELETE_LOCATION_FAILED:
    case UPDATE_LOCATION_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_LOCATION_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default locations;
