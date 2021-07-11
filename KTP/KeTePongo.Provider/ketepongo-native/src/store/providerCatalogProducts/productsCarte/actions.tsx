import NavigationService from '../../../navigation/NavigationService';
import { Dispatch } from "redux";
import { ROUTES } from '../../../constants';
import rootReducer from '../..';
import {
  ProductCarteTypes,
  IProductCarteParam,
  IProductCarteMultiParams
} from './types';
import { ProviderCatalogProductsTypes } from '../types';
const { RELOAD_ALL_DATA_SUCCEEDED } = ProviderCatalogProductsTypes

type AppState = ReturnType<typeof rootReducer>

const { CLEAR_PRODUCTCARTE_ERROR, NAVIGATE, REMOVE_ERROR } = ProductCarteTypes;

const navigate = (route: string, dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route);
}

export const navigateToProductCarteCatalog = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCarteCatalogScreen, dispatch);
// export const navigateToCreateProductCarte = () => (dispatch: Dispatch) => navigate(ROUTES.ProductSelectProviderScreen, dispatch);

const navigateWithMultipleParams = (route: string, params: IProductCarteMultiParams, dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route, params);
};

export const navigateToAddProductCarteToCatalog = (productCarteId: number) => (dispatch: Dispatch) => {
  const params = {
    target: String(productCarteId),
    editProductCarteId: false
  }
  return navigateWithMultipleParams(ROUTES.ProductCarteCreateScreen, params, dispatch);
};

export const navigateToEditProductCarte = (productCarteId: number) => (dispatch: Dispatch) => {
  const params = {
    target: String(productCarteId),
    editProductCarteId: true
  }
  return navigateWithMultipleParams(ROUTES.ProductCarteEditScreen, params, dispatch);
}

export const navigateToCreateProductCarte = () => (dispatch: Dispatch) => {
  const params = {
    editProductCarteId: false
  }
  return navigateWithMultipleParams(ROUTES.ProductCarteCreateScreen, params, dispatch);
};

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_PRODUCTCARTE_ERROR });
  return NavigationService.navigateBack();
};
export const reloadAllData = () => async (dispatch: Dispatch, getState: () => AppState) => {

  const productsCarte = getState().providerCatalogProducts.productsCarte;

  let payload = { productsCarte };
  dispatch({ type: RELOAD_ALL_DATA_SUCCEEDED, payload })
}
