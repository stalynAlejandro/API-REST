import { IProduct } from "../consumption/products";
import { IConsumptionPayload } from "../consumption";

// ***** Types
export enum FilterCatalogTypes {
  FILTER_CATALOG_REQUEST = 'FILTER_CATALOG_REQUEST',
  FILTER_CATALOG_SUCCESS = 'FILTER_CATALOG_SUCCESS',
  FILTER_CATALOG_RESPONSE = 'FILTER_CATALOG_RESPONSE',
  NAVIGATE = 'NAVIGATE'
};

// ***** Reducer
export interface ISearchCatalog {
  keyword: string,
  providerId: number,
  locationId: number,
  weekdays: number[] | number
}

export interface IFilterCatalogState {
  products: IProduct[],
  search: ISearchCatalog,
  loading: boolean
}

export interface IFilterCatalogActions {
  type: string,
  payload: IFilterCatalogPayload
}

export type IFilterCatalogPayload = (
  IFilterCatalogState |
  IConsumptionPayload
)

// ***** Actions
export interface IFilterCatalogData {
  keyword: string,
  locationId: number,
  providerId: number,
  weekdays: number[],
}
