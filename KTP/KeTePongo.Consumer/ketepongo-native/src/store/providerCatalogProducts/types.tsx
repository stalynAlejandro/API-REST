import { ISection, ISectionsState } from "./sections/types";
import {
  IProductCarte,
  IProductsCarteState,
  IProductCarteHash
} from "./productsCarte/types";
import { ErrorDetail } from "store";
import { AllergenDTO } from "model/DTOs";
// **** Types
export enum ProviderCatalogProductsTypes {
  RELOAD_ALL_DATA_REQUESTED = "RELOAD_ALL_DATA_REQUESTED",
  RELOAD_ALL_DATA_SUCCEEDED = "RELOAD_ALL_DATA_SUCCEEDED",
  RELOAD_ALL_DATA_FAILED = "RELOAD_ALL_DATA_FAILED",
  RELOAD_PRODUCTSCARTE_DATA = "RELOAD_PRODUCTSCARTE_DATA",
  RELOAD_SECTIONS_DATA = "RELOAD_SECTIONS_DATA",
  REMOVE_ERROR = "REMOVE_ERROR",
  NAVIGATE = "NAVIGATE",
  ADD_ERROR = "ADD_ERROR",
  NOTHING_TO_UPDATE = "NOTHING_TO_UPDATE"
}

// **** Reducer
export interface IProviderCatalogProductsState {
  productsCarte: IProductsCarteState;
  sections: ISectionsState;
  error: ErrorDetail | null;
  loading: boolean;
  allergens: { [id: number]: AllergenDTO };
  kindsOfFood: { [id: number]: KindOfFood };
  changeVersion: number;
}

export interface IProviderCatalogProductsAction {
  type: string;
  payload: IProviderCatalogProductsPayload;
}

export interface KindOfFood {
  id: number;
  name: string;
}

export interface IProviderCatalogProductsPayload {
  productsCarte: IProductsCarteState;
  sections: ISectionsState;
  filterCatalog: IProductCarte[];
  changeVersion:number;
}

// ***** Actions
export type ProviderCatalogProductsItemType = ISection | IProductCarte;
