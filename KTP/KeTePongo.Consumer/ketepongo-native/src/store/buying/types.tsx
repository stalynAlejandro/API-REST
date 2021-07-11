import { ILocationsState } from './locations/types';
import { IProvidersState } from './providers/types';
import { IProductState } from './products/types';
import { IFiltersState } from '../buying/filters/types';
import { ErrorDetail } from "store";


//Types
export enum BuyingTypes {
    RELOAD_ALL_DATA_REQUESTED = 'RELOAD_ALL_DATA_REQUESTED',
    RELOAD_ALL_DATA_SUCCEEDED = 'RELOAD_ALL_DATA_SUCCEEDED',
    RELOAD_ALL_DATA_FAILED = 'RELOAD_ALL_DATA_FAILED',
    RELOAD_PRODUCTS_DATA = 'RELOAD_PRODUCTS_DATA',
    RELOAD_LOCATIONS_DATA = 'RELOAD_LOCATIONS_DATA',
    RELOAD_PROVIDERS_DATA = 'RELOAD_PROVIDERS_DATA',
    NAVIGATE = 'NAVIGATE'
};

// **** Reducer
export interface IBuyingState {
    groups: string[],
    locations: ILocationsState,
    products: IProductState,
    filters: IFiltersState,
    error: ErrorDetail | null,
    loading: boolean
}

export interface IBuyingAction {
    type: string,
    payload: any
}