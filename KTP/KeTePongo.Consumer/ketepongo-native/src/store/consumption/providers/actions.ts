import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux'
import NavigationService from '../../../navigation/NavigationService';
import { simplestActionCreator } from '../../actionCreatorMethods';
import { IProvider, IProvidersState } from './reducerTypes'
import { actionConsts } from './actionTypes'
import { IProviderRequestLinkDTO, INewProviderDTO } from './index'
import { IFormNewValue } from '../index'
import { confirmToLinkProvider, requestToLinkProvider } from './operations'
import { ROUTES } from 'constants';
import { loadProviderCatalogCarte } from '../../providerCatalogProducts';

export const searchByWordRequest = (keyword: string) => (dispatch: Dispatch) => dispatch({ type: actionConsts.SEARCH_BY_WORD, payload: keyword })
export const navigateToMyProviders = () => (dispatch: Dispatch) => navigate(ROUTES.MyProvidersScreen, dispatch)
export const navigateToRequest = () => (dispatch: Dispatch) => navigate(ROUTES.Buy, dispatch)
export const navigateToAddNewProvider = () => (dispatch: Dispatch) => navigate(ROUTES.AddNewProviderScreen, dispatch)
export const navigateToProviderCatalogCarte = (provider:IProvider) => (dispatch: Dispatch) => navigateWithParams(ROUTES.ProductCarteCatalogScreen, provider, dispatch)
export const clearProviderError = () => simplestActionCreator(actionConsts.CLEAR_PROVIDER_ERROR, '');

export const navigate = (route: string, dispatch: Dispatch) => {
  dispatch({ type: 'NAVIGATE' })
  return NavigationService.navigate(route)
}
const navigateWithParams = (route: string, params: any, dispatch: Dispatch) => {
  dispatch({ type: 'NAVIGATE' });
  return NavigationService.navigate(route, params);
}
export const navigateToSelectedProviderCatalogCarte = (provider: IProvider) => async (dispatch: Dispatch, getState) => {

  loadProviderCatalogCarte(provider.keTePongoProviderOID, provider.id)(dispatch,getState);
  navigateToProviderCatalogCarte(provider)(dispatch);
}

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.CLEAR_PROVIDER_ERROR });
  return NavigationService.navigateBack();
};

export const navigateTo = (route: string) => (dispatch: Dispatch) => {
  dispatch({ type: 'NAVIGATE' });
  return NavigationService.navigate(route);
};

export const reloadProvidersData = (data: IProvidersState) => ({
  type: actionConsts.RELOAD_PROVIDERS_DATA,
  payload: data
})

export function reloadDisplayProviders() {
  const dispatch = useDispatch()
  const action = () => dispatch({ type: actionConsts.REALOAD_DISPLAY_PROVIDERS, payload: undefined })
  return action
}

export function reloadRequestInfoLinkProviderRequest() {
  const dispatch = useDispatch()
  const action = () => dispatch({ type: actionConsts.REQUEST_INFO_LINK_PROVIDER_REQUEST })
  return action
}

export function addProviderToConsumption(pendingProviderInfo: IProviderRequestLinkDTO) {
  const dispatch = useDispatch()
  const newProvider: INewProviderDTO = {
    TradeName: pendingProviderInfo?.tradeName,
    Salesman: {
      SalesmanUserName: pendingProviderInfo?.salesmanName,
      Email: pendingProviderInfo?.salesmanEmail,
      Telephone: pendingProviderInfo?.salesmanTelephone
    }
  }
  const action = () => dispatch(confirmToLinkProvider(newProvider, ROUTES.MyProviders))
  return action
}

export function requestInfoForLinkProvider(name: IFormNewValue, email: IFormNewValue, phone: IFormNewValue) {
  const dispatch = useDispatch()
  const action = () => {
    if (phone.isValid || email.isValid) {
      dispatch({ type: actionConsts.REQUEST_INFO_LINK_PROVIDER_REQUEST, payload: name.value })
      dispatch(requestToLinkProvider(email.value, phone.value))
      return;
    }
  }
  return action
}