import { ConsumptionTypes } from '../types';
import {
  IProvidersState,
  IProviderAction,
  ProviderTypes,
  IProviderPayload,
  IProvider
} from './types';
import {Action, Reducer} from "redux";

const { RELOAD_PROVIDERS_DATA } = ConsumptionTypes;
const {
  ADD_PROVIDER_REQUESTED,
  ADD_PROVIDER_SUCCEEDED,
  ADD_PROVIDER_FAILED,
  DELETE_PROVIDER_REQUESTED,
  DELETE_PROVIDER_SUCCEEDED,
  DELETE_PROVIDER_FAILED,
  UPDATE_PROVIDER_REQUESTED,
  UPDATE_PROVIDER_SUCCEEDED,
  UPDATE_PROVIDER_FAILED,
  CLEAR_PROVIDER_ERROR
} = ProviderTypes;

const initialState: IProvidersState = {
  list: [],
  dictionary: {},
  loading: false,
  error: null
};

const providers : Reducer<IProvidersState,IProviderAction> = (state = initialState, action: IProviderAction) => {
  if (!action) {
    return state;
  }

  switch (action.type) {
    case RELOAD_PROVIDERS_DATA:
      return {
        ...state,
        ...action.payload as IProvider,
      };
    case ADD_PROVIDER_SUCCEEDED:
      return {
        ...state,
        list: [...state.list, action.payload],
        dictionary: {
          ...state.dictionary,
          [(action.payload as IProvider).id]: action.payload
        },
        loading: false,
        error: null
      };
    case DELETE_PROVIDER_SUCCEEDED:
       let dictionary = Object.assign({}, state.dictionary);
       delete dictionary[action.payload as number];
       let list = state.list.filter((pro) => pro.id !== action.payload as number);
       return {
         ...state,
         list,
         dictionary,
         loading: false,
         error: null
       };
    case UPDATE_PROVIDER_SUCCEEDED:
      let list_updated = state.list.map((pro) => {
        if (pro.id === (action.payload as IProvider).id) {
          return action.payload;
        }
        return pro;
      });
      return {
        ...state,
        list:list_updated,
        dictionary: {
          ...state.dictionary,
          [(action.payload as IProvider).id]: action.payload as IProvider
        },
        loading: false,
        error: null
      };
    case ADD_PROVIDER_REQUESTED:
    case DELETE_PROVIDER_REQUESTED:
    case UPDATE_PROVIDER_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null
      };
    case ADD_PROVIDER_FAILED:
    case DELETE_PROVIDER_FAILED:
    case UPDATE_PROVIDER_FAILED:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_PROVIDER_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default providers;
