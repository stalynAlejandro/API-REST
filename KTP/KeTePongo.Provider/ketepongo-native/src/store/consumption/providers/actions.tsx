import { Dispatch } from 'redux';
import {
  IProvider,
  ProviderTypes
} from './types';

import NavigationService from '../../../navigation/NavigationService';
import { ROUTES } from '../../../constants';
import { simplestActionCreator } from '../../actionCreatorMethods';

const { CLEAR_PROVIDER_ERROR, NAVIGATE } = ProviderTypes

export const clearProviderError = () => simplestActionCreator(CLEAR_PROVIDER_ERROR, '');

export const navigateToProviderSelect = () => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(ROUTES.ProductSelectProviderScreen);
};

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_PROVIDER_ERROR });
  return NavigationService.navigateBack();
};

export const navigateToEditProvider = (provider: IProvider) => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(ROUTES.ProviderCRUDScreen, {
    provider
  });
};
