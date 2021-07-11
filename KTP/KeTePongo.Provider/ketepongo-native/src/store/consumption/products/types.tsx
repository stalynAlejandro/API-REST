import { IConsumptionPayload } from '../types';
import {ErrorDetail} from "store";

// ***** Types
export enum ProductTypes {
  UPDATE_PRODUCT_REQUESTED = 'UPDATE_PRODUCT_REQUESTED',
  UPDATE_PRODUCT_SUCCEEDED = 'UPDATE_PRODUCT_SUCCEEDED',
  UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED',
  ADD_PRODUCT_TO_CATALOG_REQUESTED = 'ADD_PRODUCT_TO_CATALOG_REQUESTED',
  ADD_PRODUCT_TO_CATALOG_SUCCEEDED = 'ADD_PRODUCT_TO_CATALOG_SUCCEEDED ',
  ADD_PRODUCT_TO_CATALOG_FAILED = 'ADD_PRODUCT_TO_CATALOG_FAILED',
  DELETE_PRODUCT_FROM_CATALOG_REQUESTED = 'DELETE_PRODUCT_FROM_CATALOG_REQUESTED',
  DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED = 'DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED',
  DELETE_PRODUCT_FROM_CATALOG_FAILED = 'DELETE_PRODUCT_FROM_CATALOG_FAILED',
  CLEAR_PRODUCT_ERROR = 'CLEAR_PRODUCT_ERROR',
  NAVIGATE = 'NAVIGATE'
};

// ***** Reducer
export interface IProductsState {
  list: IProduct[],
  dictionary: IProductHash,
  rejectedList: IProduct[],
  loading: boolean,
  error: ErrorDetail | null
}

export interface IProductAction {
  type: string,
  payload: IProductPayload
}

export type IProductPayload = (
  IConsumptionPayload |
  IProduct |
  INewProduct |
  number
);

// ***** Actions
export interface IProduct {
  changeVersion: number,
  id: number,
  name: string | number | number[] | boolean | undefined,
  imageUrl: string,
  productRef: string,
  locationsIds: number[],
  providerId: number | undefined,
  isRejected: boolean,
}

export interface INewProduct {
  name: string,
  imageUrl: string,
  productRef: number | undefined,
  locationsIds: number[],
  providerId: number
}

export interface IProductParam {
  target?: string,
  providerId:  number
}

export type IProductMultiParams = {
  target?: string,
  providerId?:  number,
  editProductId: boolean,
}

export interface IProductHash {
  [details: string]: IProduct
}
