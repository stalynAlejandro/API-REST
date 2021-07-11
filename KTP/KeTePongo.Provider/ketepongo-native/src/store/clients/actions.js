import NavigationService from '../../navigation/NavigationService';
import { ROUTES } from 'constants';
import { 
  LOAD_CLIENT_REQUEST
} from './types';
import { LOAD_VALIDATION_ORDER } from '../orders';

export const navigateToClientsScreen = () => (dispatch) => {
  dispatch({ type: ''});
  return NavigationService.navigate(ROUTES.ClientsScreen);
};

export const navigateToLinkClient = ({ client, linkClientCallBack }) => (dispatch) => {
  dispatch({ type: LOAD_CLIENT_REQUEST, payload: client });
  return NavigationService.navigate(ROUTES.ClientLinkScreen, {
    linkClientCallBack
  });
};

export const navigateBack = () => (dispatch) => {
  dispatch({ type: ''});
  return NavigationService.navigateBack();
};

export const inspectClientRequest = (client) => (dispatch) => {
  dispatch({ type: LOAD_CLIENT_REQUEST, payload: client });
  return NavigationService.navigate(ROUTES.ClientCardScreen);
};

export const navigateToClientProducts = () => (dispatch) => {
  dispatch({ type: ''});
  return NavigationService.navigate(ROUTES.ClientProductListScreen);
};

export const navigateToClientsOrders = () => (dispatch) => {
  dispatch({ type: ''});
  return NavigationService.navigate(ROUTES.ClientOrderListScreen);
};

export const navigateToClientOrderValidation = (order) => (dispatch) => {
  dispatch({ type: LOAD_VALIDATION_ORDER, payload: order });
  return NavigationService.navigate(ROUTES.ClientValidationScreen);
};