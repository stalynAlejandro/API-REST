import { connect } from "react-redux";

import {
  navigateBackToCatalog,
  addProductToOrderRequest,
  reduceProductFromOrderRequest,
  navigateToMyOrders,
  createOrder,
  updateObservationToProductOrder,
  ICurrentOrderLine,
  resetOrderServerStatus
} from "../../store/order";

import { AppState } from "store";
import { ICurrentOrder } from "store/order";
import { ILocationHash } from "store/consumption/locations";
import { IProviderHash, IProvider } from "store/consumption/providers";
import { CartScreenComponent } from "./CartScreen";
import { withAuthentication } from "../../HOC";

export interface IProps {
  locationDictionary: ILocationHash;
  currentOrderByLocation: OrderByParameter[];
  currentOrderByProvider: OrderByParameter[];
  numberOfSkus: number;
  numberOfProviders: number;
  navigateBackToCatalog: Function;
  navigateToMyOrders: Function;
  populateCurrentOrderDetails: Function;
  addProductToOrderRequest: Function;
  reduceProductFromOrderRequest: Function;
  updateObservationToProductOrder: Function;
  currentOrder: ICurrentOrder;
  createOrder: Function;
  isWaitingAnswerFromServer: boolean;
  hasSentNewOrderSuccesfullyToServer: boolean;
  hasErroredSendingOrder: boolean;
  resetOrderServerStatus: Function
}

interface RadioOption {
  label: string;
  value: number;
}

export interface IState {
  radioOptions: RadioOption[];
  orderListSelection: number;
  selectedProvider?: string;
  selectedLocation?: string;
  observationProductId?: number;
  productObservation: string;
}

interface IPropsFromState {
  locationDictionary: ILocationHash;
  providerDictionary: IProviderHash;
  currentOrder: ICurrentOrder;
  isWaitingAnswerFromServer: boolean;
  hasSentNewOrderSuccesfullyToServer: boolean;
  hasErroredSendingOrder: boolean;
}

export interface OrderByParameter {
  name: string;
  list: ICurrentOrderLine[];
}

interface OrderByParameterDictionary {
  [provider: string]: OrderByParameter;
}

const mapStateToProps = (state: AppState): IPropsFromState => {
  return {
    locationDictionary: state.consumption.locations.dictionary,
    providerDictionary: state.consumption.providers.dictionary,
    currentOrder: state.order.currentOrder,
    isWaitingAnswerFromServer: state.order.isSendingOrder,
    hasSentNewOrderSuccesfullyToServer: state.order.hasSentNewOrderSuccesfullyToServer,
    hasErroredSendingOrder: state.order.hasErroredSendingOrder
  };
};

const mapDispatchToProps = {
  navigateBackToCatalog,
  addProductToOrderRequest,
  reduceProductFromOrderRequest,
  navigateToMyOrders,
  updateObservationToProductOrder,
  createOrder,
  resetOrderServerStatus
};

const sortAlphabetically = (array, type: string | undefined) => {
  let nameA;
  let nameB;
  return array.sort((a, b) => {
    if (type) {
      a = a[type];
      b = b[type];
    }
    nameA = a.name.toUpperCase();
    nameB = b.name.toUpperCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};

const mergeProps = (
  propsFromState: IPropsFromState,
  propsFromDispatch,
  ownProps
) => {
  const {
    locationDictionary,
    providerDictionary,
    currentOrder
  } = propsFromState;
  const { productLines, orderLines } = currentOrder;
  let currentOrderByProviderObj: OrderByParameterDictionary = {};
  let currentOrderByLocationObl: OrderByParameterDictionary = {};
  //TODO this might be heavy. Memo or useCallBack on this
  if (productLines) {
    productLines.map(productId => {
      if (productId === null) {
        return null;
      }

      const orderLine = orderLines[productId];
      const { product, quantity } = orderLine;
      const { locationsIds, providerId } = product;

      const provider = providerDictionary[providerId] as IProvider;
      if (provider) {
        const tradeName = provider.tradeName.toString() as string;
        if (!currentOrderByProviderObj[tradeName]) {
          currentOrderByProviderObj[tradeName] = {
            name: tradeName,
            list: [{ product, quantity, observation: "" }]
          };
        } else {
          currentOrderByProviderObj[tradeName].list = sortAlphabetically(
            [
              ...currentOrderByProviderObj[tradeName].list,
              { product, quantity }
            ],
            "product"
          );
        }
      }

      locationsIds.map(loc => {
        if (!locationDictionary[loc]) {
          return;
        }

        let locationName = locationDictionary[loc].name.toString();
        if (!currentOrderByLocationObl[locationName]) {
          currentOrderByLocationObl[locationName] = {
            ...currentOrderByLocationObl,
            name: locationName,
            list: [{ product, quantity, observation: "" }]
          };
        } else {
          currentOrderByLocationObl[locationName].list = sortAlphabetically(
            [
              ...currentOrderByLocationObl[locationName].list,
              { product, quantity }
            ],
            "product"
          );
        }
      });
    });
  }
  const currentOrderByProvider: OrderByParameter[] = sortAlphabetically(
    Object.values(currentOrderByProviderObj),
    undefined
  );
  const currentOrderByLocation: OrderByParameter[] = sortAlphabetically(
    Object.values(currentOrderByLocationObl),
    undefined
  );

  return {
    ...propsFromState,
    ...propsFromDispatch,
    ...ownProps,
    currentOrderByProvider,
    currentOrderByLocation,
    numberOfSkus: Object.values(orderLines).length || 0,
    numberOfProviders: currentOrderByProvider.length || 0
  };
};

const CartScreen = withAuthentication((connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CartScreenComponent)));
export { CartScreen };
