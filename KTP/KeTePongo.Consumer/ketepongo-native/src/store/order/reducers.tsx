import {
  IOrderAction,
  IOrderState,
  OrderTypes,
  IOrderDetailAction,
  IOrderCreatedSuccessfullyInServerAction,
  IOrder,
  IOrderLine,
  IOrdersLoadedFromServerSuccessfully
} from "./types";
import { IProduct } from "../consumption/products/types";
import { Reducer } from "redux";
import { ConsumerOrderDTO } from "model/DTOs";
const {
  LOAD_DETAIL_ORDER,
  ADD_PRODUCT_TO_ORDER_REQUEST,
  REDUCE_PRODUCE_FROM_ORDER_REQUEST,
  REMOVE_PRODUCT_FROM_ORDER_REQUEST,
  CREATE_CURRENT_ORDER_DETAILS,
  UPDATE_ORDER_DELIVERY_DATES,
  UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST,
  CREATE_ORDER_REQUESTED,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_SUCCEDED,
  CREATE_ORDER_FOR_SINGLE_PROVIDER_REQUESTED,
  CREATE_ORDER_FOR_SINGLE_PROVIDER_FAILED,
  CREATE_ORDER_FOR_SINGLE_PROVIDER_SUCCEDED,
  UPDATE_ORDER_SERVERSTATUS,
  LOAD_ORDERS_SUCCEDED,
  UPDATE_ORDER_PROVIDERS_OBSERVATIONS
} = OrderTypes;

const initialState: IOrderState = {
  detailOrder: undefined,
  currentOrder: {
    productLines: [],
    providerDetail: {},
    orderLines: {}
  },
  list: [],
  pending: [],
  isSendingOrder: false,
  hasErroredSendingOrder: false,
  hasSentNewOrderSuccesfullyToServer: false
}; //TODO this should sync order from server
//TODO should be synced with consumption data ? in parallle? what to display while loading orders

const order: Reducer<IOrderState, IOrderAction> = (
  state = initialState,
  action: IOrderAction
) => {
  switch (action.type) {
    case UPDATE_ORDER_DELIVERY_DATES:
    case CREATE_CURRENT_ORDER_DETAILS:
      const orderDetailAction = action as IOrderDetailAction;
      return {
        ...state,
        currentOrder: {
          ...state.currentOrder,
          providerDetail: orderDetailAction.payload
        },
        hasSentNewOrderSuccesfullyToServer: false
      };
    case UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST:
    case REMOVE_PRODUCT_FROM_ORDER_REQUEST:
    case ADD_PRODUCT_TO_ORDER_REQUEST:
    case REDUCE_PRODUCE_FROM_ORDER_REQUEST:
    case UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST:
      return {
        ...state,
        ...action.payload
      };
    case LOAD_DETAIL_ORDER:
      return {
        ...state,
        detailOrder: action.payload
      };
      case CREATE_ORDER_FOR_SINGLE_PROVIDER_REQUESTED:
      case CREATE_ORDER_REQUESTED: {
      return {
        ...state,
        isSendingOrder: true
      };
    }
    case CREATE_ORDER_FOR_SINGLE_PROVIDER_FAILED:
    case CREATE_ORDER_FAILED: {
      return {
        ...state,
        hasErroredSendingOrder: true,
        hasSentNewOrderSuccesfullyToServer: false,
        isSendingOrder: false
      };
    }
    case CREATE_ORDER_SUCCEDED:{
      const { payload } = action as IOrderCreatedSuccessfullyInServerAction;
      const orders = mapNewOrderToOrder(payload);
      return {
        ...initialState,
        hasErroredSendingOrder: false, //TODO añadir a list y pending
        list: [...state.list, ...orders],
        pending: [...state.list, ...orders],
        hasSentNewOrderSuccesfullyToServer: true
      };
    }
      case CREATE_ORDER_FOR_SINGLE_PROVIDER_SUCCEDED:
      const { payload } = action as IOrderCreatedSuccessfullyInServerAction;
      const orders = mapNewOrderToOrder(payload);
      var providerId= orders[0].orderLines[0].providerId;
      var ketepongoProviderOID = orders[0].orderLines[0].ketepongoProviderOID;
      const productLines= state.currentOrder.productLines.filter(p=>!p.includes(ketepongoProviderOID+'-'));
      const orderLinesArray= Object.values(state.currentOrder.orderLines).filter(p=>p.product.providerId !== providerId && p.product.keTePongoProviderOID !==ketepongoProviderOID)
   
      const orderLines ={}
       orderLinesArray.map(line=>{
        const key = `${line.product.keTePongoProviderOID}-${line.product.id}`;
        orderLines[key] = line;
      });
      return {
        ...initialState,
        currentOrder: {
          ...state.currentOrder,
          productLines:productLines,
          orderLines: orderLines,

        },
        hasErroredSendingOrder: false, //TODO añadir a list y pending
        list: [...state.list, ...orders],
        pending: [...state.list, ...orders],
        hasSentNewOrderSuccesfullyToServer: true
      };
    case UPDATE_ORDER_SERVERSTATUS:
      return {
        ...state,
        hasErroredSendingOrder: false,
        hasSentNewOrderSuccesfullyToServer: false,
        isSendingOrder: false
      };
    case LOAD_ORDERS_SUCCEDED:
      const {
        payload: ordersFromServer
      } = action as IOrdersLoadedFromServerSuccessfully;
      const syncedOrders = ordersFromServer.map(x => mapNewOrderToOrder(x)).reduce((a, b) => a.concat(b), []);
      return {
        ...state,
        list: [...state.list, ...syncedOrders],
        pending: [...state.list, ...syncedOrders],
      };
    default:
      return state;
  }
};

const mapNewOrderToOrder = (newOrder: ConsumerOrderDTO): IOrder[] => {
  const orders: IOrder[] = [];
  newOrder.subOrders.map(subOrder => {
    const orderLines: IOrderLine[] = [];
    const productLines: IProduct[] = [];

    subOrder.orderLines.map(line => {
      orderLines.push({
        quantity: line.quantity,
        productId: line.product.id,
        providerId: subOrder.provider.id,
        ketepongoProviderOID: subOrder.provider.keTePongoProviderOID
      });
      productLines.push({
        changeVersion: line.product.changeVersion,
        name: line.product.name,
        imageUrl: line.product.imageUrl,
        locationIds: line.product.locationIds,
        isRejected: false,
        productRef: line.product.providerForeignReference,
        providerId: subOrder.provider.id,
        id: line.product.id,
        keTePongoProviderOID: line.product.keTePongoProviderOID,
        erpId:line.product.erpId,
        description:line.product.description,
        isVegan:line.product.isVegan,
        pvp:line.product.pvp
      });
    });

    orders.push({
      userId: newOrder.userId,
      consumerOID: newOrder.consumerOID,
      creationDate: new Date(newOrder.utcDateTime),
      id: `${newOrder.id}/${subOrder.subOrderId}`,
      isValidated: false,
      orderLines: orderLines,
      productLines: productLines,
      providerName: subOrder.provider.tradeName,
      hasError: newOrder.hasErrors && subOrder.processingError !== "",
      errorDescription: subOrder.processingError
    });
  });

  return orders;
};

export default order;
