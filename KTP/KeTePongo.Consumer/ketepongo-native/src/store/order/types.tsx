import { IProduct } from "../consumption/products";
import { ConsumerOrderDTO } from "model/DTOs";
// ***** types
export enum OrderTypes {
  LOAD_DETAIL_ORDER = "LOAD_DETAIL_ORDER",
  ADD_PRODUCT_TO_ORDER_REQUEST = "ADD_PRODUCT_TO_ORDER_REQUEST",
  REDUCE_PRODUCE_FROM_ORDER_REQUEST = "REDUCE_PRODUCE_FROM_ORDER_REQUEST",
  REMOVE_PRODUCT_FROM_ORDER_REQUEST = "REMOVE_PRODUCT_FROM_ORDER_REQUEST",
  CREATE_CURRENT_ORDER_DETAILS = "CREATE_CURRENT_ORDER_DETAILS",
  UPDATE_ORDER_DELIVERY_DATES = "UPDATE_ORDER_DELIVERY_DATES",
  UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST = "UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST",
  CREATE_ORDER_REQUESTED = "CREATE_ORDER_REQUESTED",
  CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED",
  CREATE_ORDER_SUCCEDED = "CREATE_ORDER_SUCCEDED",
  CREATE_ORDER_FOR_SINGLE_PROVIDER_REQUESTED = "CREATE_ORDER_FOR_SINGLE_PROVIDER_REQUESTED",
  CREATE_ORDER_FOR_SINGLE_PROVIDER_FAILED = "CREATE_ORDER_FOR_SINGLE_PROVIDER_FAILED",
  CREATE_ORDER_FOR_SINGLE_PROVIDER_SUCCEDED = "CREATE_ORDER_FOR_SINGLE_PROVIDER_SUCCEDED",
  NAVIGATE = "NAVIGATE",
  UPDATE_ORDER_SERVERSTATUS = "UPDATE_ORDER_SERVERSTATUS",
  LOAD_ORDERS_REQUESTED = "LOAD_ORDERS_REQUESTED",
  LOAD_ORDERS_SUCCEDED = "LOAD_ORDERS_SUCCEDED",
  UPDATE_ORDER_PROVIDERS_OBSERVATIONS = "UPDATE_ORDER_PROVIDERS_OBSERVATIONS"
}

// ***** Rducer
export interface IOrderState {
  detailOrder: IOrder | undefined;
  currentOrder: ICurrentOrder;
  list: IOrder[];
  pending: IOrder[];
  isSendingOrder: boolean;
  hasErroredSendingOrder: boolean;
  hasSentNewOrderSuccesfullyToServer: boolean;
}

export interface ICurrentOrder {
  productLines: Array<string>;
  providerDetail: IOrderProvidersDetail;
  orderLines: ICurrentIndexOrder;
}

export interface IOrderAction {
  type: string;
  payload: any;
}

export interface IOrderDetailAction {
  type: string;
  payload: IOrderProvidersDetail;
}

export type IOrderPayload = IOrder;

export interface IOrderProviderDetail {
  id: number;
  tradeName: string;
  details: string;
  observation: string;
  deliveryDate: string;
}

export interface IOrderProvidersDetail {
  [consumerOID: string]: IOrderProviderDetail;
}

export type ICurrentOrderLine = {
  product: IProduct;
  quantity: number;
  observation: string;
};

export interface ICurrentIndexOrderLine {
  product: IProduct;
  quantity: number;
  observation: string;
  index: number;
}

export interface ICurrentIndexOrder {
  [productId: string]: ICurrentIndexOrderLine;
}

// ***** Actions
export interface IOrderLine {
  productId: number;
  providerId: number;
  ketepongoProviderOID:number;
  quantity: number;
}

export interface INewOrder {
  orderLines: IOrderLine[];
}

export interface IOrder {
  id: string;
  userId: number;
  consumerOID: number | string; // @TODO -  to remove string type
  creationDate: Date;
  productLines: IProduct[];
  orderLines: IOrderLine[];
  isValidated: boolean;
  providerName: string;
  hasError: boolean;
  errorDescription: string;
}

export interface IUpdateCommentProductOrder {
  productId: number;
  keTePongoProviderOID: number;
  productObservation: string;
  closeCommentbox: () => void;
}

export interface IRemoveProductLineData {
  productLines: Array<any>;
  index: number;
}

export interface IRemoveOrderLineData {
  orderLines: ICurrentIndexOrder;
  product: IProduct;
}

export interface IOrderCreatedSuccessfullyInServerAction {
  type: string;
  payload: ConsumerOrderDTO;
}

export interface IOrdersLoadedFromServerSuccessfully{
  type: string;
  payload: ConsumerOrderDTO[];
}
