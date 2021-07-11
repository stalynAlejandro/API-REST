import {
  OrderTypes,
  IUpdateCommentProductOrder,
  IOrder,
  IRemoveProductLineData,
  IRemoveOrderLineData,
  IOrderProvidersDetail
} from './types';
import NavigationService from '../../navigation/NavigationService';
import { ROUTES } from '../../constants';
import { Dispatch } from 'redux';
import { IProduct } from '../consumption/products';
import rootReducer from '..';
import { ICurrentIndexOrderLine, ICurrentOrder, ICurrentIndexOrder, IOrderProviderDetail } from "./types";
import {IProviderHash} from "store/consumption/providers"
type AppState = ReturnType<typeof rootReducer>

const {
  LOAD_DETAIL_ORDER,
  ADD_PRODUCT_TO_ORDER_REQUEST,
  REDUCE_PRODUCE_FROM_ORDER_REQUEST,
  REMOVE_PRODUCT_FROM_ORDER_REQUEST,
  CREATE_CURRENT_ORDER_DETAILS,
  UPDATE_ORDER_DELIVERY_DATES,
  UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST,
  UPDATE_ORDER_SERVERSTATUS,
  NAVIGATE,
  UPDATE_ORDER_PROVIDERS_OBSERVATIONS
} = OrderTypes;
export const navigateToCart = () => (dispatch: Dispatch) => navigate(ROUTES.CartScreen, dispatch);
export const updateObservationToProductOrder = ({
  productId,
  keTePongoProviderOID,
  productObservation,
  closeCommentbox
}: IUpdateCommentProductOrder) => async (dispatch: Dispatch, getState: () => AppState) => {
  const currentOrder = getState().order.currentOrder;
  const payload : { currentOrder: ICurrentOrder } = {
    currentOrder: {
      ...currentOrder,
      orderLines: {
        ...currentOrder.orderLines,
        [`${keTePongoProviderOID}-${productId}`]: {
          ...currentOrder.orderLines[`${keTePongoProviderOID}-${productId}`],
          observation: productObservation
        }
      }
    }
  }

  dispatch({ type: UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST, payload });
  closeCommentbox();
};

const populateProviderDetails = (currentOrder: ICurrentOrder, providerDictionary: IProviderHash) : IOrderProvidersDetail => {
  let currentOrderDetails: IOrderProvidersDetail = {}
   Object.values(currentOrder.orderLines).map((item : ICurrentIndexOrderLine) => {
      // @TODO - replace providersIds for providerId
      const { providerId } = item.product;
      if (!providerId) {
        return;
      }
      currentOrderDetails[providerId] = {
        id: providerId,
        tradeName: providerDictionary[providerId].tradeName,
        details: '',
        observation: '',
        deliveryDate: '' //TODO implement orderWeekDays and get next day compared to this
      }
    });
    return currentOrderDetails;
}

const removeProductFromOrderLines = ({ orderLines, product }: IRemoveOrderLineData) : ICurrentIndexOrder => {
  let newOrderLines = Object.assign({}, orderLines);
  delete newOrderLines[`${product.keTePongoProviderOID}-${product.id}`];
  return newOrderLines;
}

const removeProductFromProductLines = ({ productLines, index }: IRemoveProductLineData) : string[] => {
  let newProductLines = [...productLines];
  newProductLines[index] = null;
  return newProductLines;
}

export const removeProductFromOrderRequest = (product: IProduct) => async (dispatch: Dispatch, getState: () => AppState) => {
  const currentOrder = getState().order.currentOrder;
  const { productLines, orderLines } = currentOrder;
  const index = orderLines[`${product.keTePongoProviderOID}-${product.id}`].index;

  const payload : { currentOrder: ICurrentOrder } = {
    currentOrder: {
      ...currentOrder,
      productLines: removeProductFromProductLines({productLines, index}),
      orderLines: removeProductFromOrderLines({orderLines, product})
    }
  }

  dispatch({ type: REMOVE_PRODUCT_FROM_ORDER_REQUEST, payload });
};

export const reduceProductFromOrderRequest = (product: IProduct) => async (dispatch: Dispatch, getState: () => AppState) => {
  const currentOrder = getState().order.currentOrder;
  const { productLines, orderLines } = currentOrder
  const targetOrderLine = orderLines[`${product.keTePongoProviderOID}-${product.id}`];
  let payload : { currentOrder: ICurrentOrder };

  if (!targetOrderLine || !targetOrderLine.quantity) {
    return;
  }

  if (targetOrderLine.quantity === 1) {
    const index = targetOrderLine.index;
    payload  = {
      currentOrder: {
        ...currentOrder,
        productLines: removeProductFromProductLines({productLines, index}),
        orderLines: removeProductFromOrderLines({orderLines, product}),
      }
    }
  } else {
    payload = {
      currentOrder: {
        ...currentOrder,
        orderLines: {
          ...orderLines,
          [`${product.keTePongoProviderOID}-${product.id}`] : {
            ...orderLines[`${product.keTePongoProviderOID}-${product.id}`],
            quantity: orderLines[`${product.keTePongoProviderOID}-${product.id}`].quantity - 1
          }
        }
      },
    }
  }

  dispatch({ type: REDUCE_PRODUCE_FROM_ORDER_REQUEST, payload });
};

export const addProductToOrderRequest = (product: IProduct) => async (dispatch: Dispatch, getState: () => AppState) => {
  const currentOrder = getState().order.currentOrder;
  const { productLines, orderLines } = currentOrder;
  const targetOrderLine = orderLines[`${product.keTePongoProviderOID}-${product.id}`];
  let payload  : { currentOrder: ICurrentOrder };

  if (targetOrderLine) {
    payload = {
      currentOrder: {
        ...currentOrder,
        orderLines: {
          ...orderLines,
          [`${product.keTePongoProviderOID}-${product.id}`]: {
            ...orderLines[`${product.keTePongoProviderOID}-${product.id}`],
            quantity: targetOrderLine.quantity + 1
          }
        }
      }
    }
  } else {
    const providerDictionary = getState().consumption.providers.dictionary;
    payload = {
      currentOrder: {
        ...currentOrder,
        productLines: [...productLines, `${product.keTePongoProviderOID}-${product.id}`],
        orderLines: {
          ...orderLines,
          [`${product.keTePongoProviderOID}-${product.id}`]: {
            product,
            observation: '',
            ...orderLines[`${product.keTePongoProviderOID}-${product.id}`],
            quantity: 1,
            index: productLines.length
          }
        }
      }
    }
    payload.currentOrder.providerDetail  = populateProviderDetails(payload.currentOrder, providerDictionary);
  }

  dispatch({ type: ADD_PRODUCT_TO_ORDER_REQUEST, payload });
};

const navigate = (route: String, dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE})
  NavigationService.navigate(route)
};//TODO should be in a generic place

export const navigateToMyOrders = () => (dispatch: Dispatch) => navigate(ROUTES.OrderScreen, dispatch);
export const navigateBackToCatalog = () => (dispatch: Dispatch) => navigate(ROUTES.MyProductsScreen, dispatch);
export const navigateToCurrentOrder = () => (dispatch: Dispatch) => navigate(ROUTES.CartScreen, dispatch);
export const navigateToDetailScreen = (title: string)=> (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE})
  NavigationService.navigate(ROUTES.CartDetailScreen, {title});
}
export const navigateBack = (params: any) => (dispatch: Dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigateBack(params);
};

export const loadSingleOrder = (order: IOrder) => (dispatch: Dispatch) => {
  dispatch({ type: LOAD_DETAIL_ORDER, payload: order });
  return NavigationService.navigate(ROUTES.DetailOrderScreen);
};

export const resetOrderServerStatus = () => (dispatch: Dispatch) => dispatch({ type: UPDATE_ORDER_SERVERSTATUS });

export const updateOrderProvidersObservations = (providerList: IOrderProviderDetail[]) => async (dispatch: Dispatch, getState: () => AppState) => {
  const { currentOrder } = getState().order;

  let providerDetail: IOrderProvidersDetail = {};
   providerList.map(provider => {
      providerDetail[provider.id] = {
        id: provider.id,
        tradeName: provider.tradeName,
        details: provider.details,
        observation: provider.observation,
        deliveryDate: provider.deliveryDate
      }
    });

  const payload : { currentOrder: ICurrentOrder } = {
    currentOrder: {
      ...currentOrder,
      providerDetail
    }
  }

  dispatch({ type: UPDATE_OBSERVATION_TO_PRODUCT_ORDER_REQUEST, payload });
};
