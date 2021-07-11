import moment from "moment";
import { AsyncStorage } from "react-native";
import { Dispatch } from "redux";
import {
  OrderTypes,
  ICurrentIndexOrderLine,
  IOrderProviderDetail
} from "./types";
import { simpleAsycnActionCreator } from "../actionCreatorMethods";
import { STRINGS } from "../../constants";
import rootReducer from "..";
import { NewConsumerOrderDTO } from "model/DTOs";

type AppState = ReturnType<typeof rootReducer>;

const {
  CREATE_ORDER_REQUESTED,
  CREATE_ORDER_SUCCEDED,
  CREATE_ORDER_FAILED,
  CREATE_ORDER_FOR_SINGLE_PROVIDER_REQUESTED,
  CREATE_ORDER_FOR_SINGLE_PROVIDER_SUCCEDED,
  CREATE_ORDER_FOR_SINGLE_PROVIDER_FAILED,
  LOAD_ORDERS_REQUESTED,
  LOAD_ORDERS_SUCCEDED
} = OrderTypes;

export const loadConsumerOrders = () => async (dispatch: Dispatch, getState) => {
  await simpleAsycnActionCreator(
    STRINGS.GET,
    "apiConsumers",
    "Order",
    STRINGS.appJson,
    LOAD_ORDERS_REQUESTED,
    LOAD_ORDERS_SUCCEDED,
    "",
    null,
    null,
    null
  )(dispatch, getState);
};

export const createOrderForAllProviders = () => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch({ type: CREATE_ORDER_REQUESTED });
  const order = getState().order.currentOrder;
  const { orderLines, providerDetail } = order;

  const data: NewConsumerOrderDTO = { subOrders: [] };

  Object.values(orderLines).map((line: ICurrentIndexOrderLine) => {
    let subOrder = data.subOrders.find(
      x => x.providerId === line.product.providerId
    );
    const subOrderLine = {
      productId: line.product.id,
      quantity: line.quantity,
      observation: line.observation,
      ERPId:line.product.erpId,
      ChangeVersion: line.product.changeVersion,
      Id: line.product.id,
      Name: line.product.name,
      KeTePongoProviderOID:line.product.keTePongoProviderOID,
      Description:line.product.description,
      IsVegan:line.product.isVegan,
      PVP: line.product.pvp
    };
    if (!subOrder) {
      const provider = providerDetail[
        line.product.providerId
      ] as IOrderProviderDetail;
      subOrder = {
        subOrderId: data.subOrders.length + 1,
        providerId: line.product.providerId,
        observation: provider.observation,
        utcMinimumDeliveryDateTime:
          provider.deliveryDate !== ""
            ? moment(provider.deliveryDate).toISOString()
            : null,
        orderLines: []
      };
      data.subOrders.push(subOrder);
    }
    subOrder.orderLines.push(subOrderLine);
  });

  return await simpleAsycnActionCreator(
    STRINGS.POST,
    "apiConsumers",
    "Order",
    STRINGS.appJson,
    CREATE_ORDER_REQUESTED,
    CREATE_ORDER_SUCCEDED,
    CREATE_ORDER_FAILED,
    data,
    async () => {
      await AsyncStorage.removeItem("@order");
    },
    null
  )(dispatch, getState);
};
export const createOrderForSingleProvider = (providerId:number) => async (
  dispatch: Dispatch,
  getState: () => AppState
) => {
  dispatch({ type: CREATE_ORDER_REQUESTED });
  const order = getState().order.currentOrder;
  let { orderLines, providerDetail } = order;
var orderLinesArray = Object.values(orderLines).filter(o=>o.product.providerId ===providerId);
  const data: NewConsumerOrderDTO = { subOrders: [] };

  orderLinesArray.map((line: ICurrentIndexOrderLine) => {
    let subOrder = data.subOrders.find(
      x => x.providerId === line.product.providerId
    );
    const subOrderLine = {
      productId: line.product.id,
      quantity: line.quantity,
      observation: line.observation,
      ERPId:line.product.erpId,
      ChangeVersion: line.product.changeVersion,
      Id: line.product.id,
      Name: line.product.name,
      KeTePongoProviderOID:line.product.keTePongoProviderOID,
      Description:line.product.description,
      IsVegan:line.product.isVegan,
      PVP: line.product.pvp
    };
    if (!subOrder) {
      const provider = providerDetail[
        line.product.providerId
      ] as IOrderProviderDetail;
      subOrder = {
        subOrderId: data.subOrders.length + 1,
        providerId: line.product.providerId,
        observation: provider.observation,
        utcMinimumDeliveryDateTime:
          provider.deliveryDate !== ""
            ? moment(provider.deliveryDate).toISOString()
            : null,
        orderLines: []
      };
      data.subOrders.push(subOrder);
    }
    subOrder.orderLines.push(subOrderLine);
  });

  return await simpleAsycnActionCreator(
    STRINGS.POST,
    "apiConsumers",
    "Order",
    STRINGS.appJson,
    CREATE_ORDER_FOR_SINGLE_PROVIDER_REQUESTED,
    CREATE_ORDER_FOR_SINGLE_PROVIDER_SUCCEDED,
    CREATE_ORDER_FOR_SINGLE_PROVIDER_FAILED,
    data,
    async () => {
      await AsyncStorage.removeItem("@order");
    },
    null
  )(dispatch, getState);
};
