import NavigationService from '../../../navigation/NavigationService';
import { Dispatch } from "redux";
import { ROUTES } from '../../../constants';
import rootReducer from '../..';
import {
  ProductTypes,
  IProduct,
  IProductParam,
  IProductMultiParams
} from './types';
import { ConsumptionTypes } from '../types';
const { RELOAD_ALL_DATA_SUCCEEDED } = ConsumptionTypes

type AppState = ReturnType<typeof rootReducer>

const { CLEAR_PRODUCT_ERROR, NAVIGATE } = ProductTypes;

const navigate = (route: string, dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route);
}

export const navigateToRejectedProduct = () => (dispatch: Dispatch) => navigate(ROUTES.RejectedProductScreen, dispatch);
export const navigateToProviderSelect = () => (dispatch: Dispatch) => navigate(ROUTES.ProductSelectProviderScreen, dispatch);
export const navigateToProductCatalog = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCatalogScreen, dispatch);

const navigateWithParams = (route: string, params: IProductParam, dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route, params);
}

export const navigateToProviderCatalogProducts = (providerId: number) => (dispatch: Dispatch) => {
  const params = { providerId: providerId };
  return navigateWithParams(ROUTES.ProviderProductCatalogScreen, params, dispatch);
};

const navigateWithMultipleParams = (route: string, params: IProductMultiParams, dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route, params);
};

export const navigateToAddProductToCatalog = (productId: number) => (dispatch: Dispatch) => {
  const params = {
    target: String(productId),
    editProductId: false
  }
  return navigateWithMultipleParams(ROUTES.ProductCreateScreen, params, dispatch);
};

export const navigateToEditProduct = (productId: number) => (dispatch: Dispatch) => {
  const params = {
    target: String(productId),
    editProductId: true
  }
  return navigateWithMultipleParams(ROUTES.ProductEditScreen, params, dispatch);
}

export const navigateToCreateProduct = (providerId: number) => (dispatch: Dispatch) => {
  const params = {
    providerId: providerId,
    editProductId: false
  }
  return navigateWithMultipleParams(ROUTES.ProductCreateScreen, params, dispatch);
};

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_PRODUCT_ERROR });
  return NavigationService.navigateBack();
};
export const reloadAllData = () => async (dispatch: Dispatch, getState: () => AppState) => {

  const products = getState().consumption.products;

  let payload = { products };
  dispatch({ type: RELOAD_ALL_DATA_SUCCEEDED, payload })
}
