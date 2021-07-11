
import { ILocation, ILocationsState } from './locations/types';
import { IProduct, IProductsState, IProductHash } from './products/types';
import { IProvider } from './providers/reducerTypes';
import { IProvidersState } from './providers/reducerTypes'
import { IFilterCatalogState } from '../filterCatalog';
import { ErrorDetail} from "store";
// **** Types
export enum ConsumptionTypes {
  RELOAD_ALL_DATA_REQUESTED = 'RELOAD_ALL_DATA_REQUESTED',
  RELOAD_ALL_DATA_SUCCEEDED = 'RELOAD_ALL_DATA_SUCCEEDED',
  RELOAD_ALL_DATA_FAILED = 'RELOAD_ALL_DATA_FAILED',
  RELOAD_PRODUCTS_DATA = 'RELOAD_PRODUCTS_DATA',
  RELOAD_LOCATIONS_DATA = 'RELOAD_LOCATIONS_DATA',
  RELOAD_PROVIDERS_DATA = 'RELOAD_PROVIDERS_DATA',
  NAVIGATE = 'NAVIGATE'
};

// **** Reducer
export interface IConsumptionState {
  products: IProductsState,
  locations: ILocationsState,
  providers: IProvidersState,
  error: ErrorDetail | null,
  loading: boolean
}

export interface IConsumptionAction {
  type: string,
  payload: IConsumptionPayload
}

export interface IConsumptionPayload {
  products: IProductsState,
  locations: ILocationsState,
  providers: IProvidersState,
  filterCatalog: IProduct[]
}

// ***** Actions
export type ConsumptionItemType = (
  ILocation |
  IProduct |
  IProvider
)


export interface IFormNewValue {
  value: string | undefined,
  isValid: boolean
}

export const spainTelephoneProfile: string = "34"
export const regularExpressionEmail = /\S+@\S+\.\S+/;
export const regularExpressionPhone = /^[0-9]{11,12}$/;