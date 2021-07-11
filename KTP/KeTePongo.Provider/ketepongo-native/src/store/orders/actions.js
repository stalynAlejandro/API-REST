import NavigationService from '../../navigation/NavigationService';
import { ROUTES } from 'constants';
import {
  LOAD_VALIDATION_ORDER
} from './types';

export const navigateToLinkProductSelection = (product) => (dispatch) => {
  dispatch({ type: ' ' });
  return NavigationService.navigate(ROUTES.ProductSelectionScreen, {
    product
  });
};

export const navigateToValidationScreen = (order) => (dispatch) => {
  dispatch({ type: LOAD_VALIDATION_ORDER, payload: order });
  return NavigationService.navigate(ROUTES.ValidationScreen);
};

export const navigateBack = () => (dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigateBack({});
};