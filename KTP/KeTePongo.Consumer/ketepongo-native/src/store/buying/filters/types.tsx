import { IProduct } from "../products";

export enum FiltersTypes {
    FILTER_REQUEST = 'FILTER_REQUEST',
    FILTER_SUCCESS = 'FILTER_SUCCESS',
    FILTER_RESPONSE = 'FILTER_RESPONSE',
    NAVIGATE = 'NAVIGATE'
}

//Reducer
export interface IFiltersState {
    search: {
        keyword: string | undefined,
        selectedProvider: string,
        selectedLocation: string,
        providerTags: string[],
        locationTags: string[],
        selectedGroup: string,
    }
    displayProducts: IProduct[]
}

export interface IFiltersAction {
    type: string,
    payload: any,
}

export interface IFilterRequest {
    providerTags: string[],
    locationTags: string[]
}

export interface IGroupByRequest{
    group: string,
    provider: string,
    location: string,
}