import { Dispatch } from 'redux';
import { ProviderCatalogProductsTypes } from './types';
import NavigationService from '../../navigation/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import { ROUTES } from '../../constants';
const {
  NAVIGATE,
  REMOVE_ERROR,
  ADD_ERROR
} = ProviderCatalogProductsTypes

const navigate = (route: string, dispatch: Dispatch): void => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route);
}

export const addError = (error) => (dispatch: Dispatch) => dispatch({type: ADD_ERROR, payload:{error}})
export const removeError = () => (dispatch: Dispatch) => dispatch({type: REMOVE_ERROR})
export const navigateToEmployeeList = () => (dispatch: Dispatch) => navigate(ROUTES.EmployeeListScreen, dispatch);
export const navigateToProfile = () => (dispatch: Dispatch) => navigate(ROUTES.ProfileScreen, dispatch);
export const navigateToCatalog = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCarteCatalogScreen, dispatch);
export const navigateToAuthScreen = () => (dispatch: Dispatch) => navigate(ROUTES.AuthScreen, dispatch);
export const navigateToLogIn = () => (dispatch: Dispatch) => navigate(ROUTES.AuthLogInScreen, dispatch);
export const navigateToOnBoarding1Screen = () => (dispatch: Dispatch) => navigate(ROUTES.OnBoarding1Screen, dispatch);
export const navigateToOnBoarding2Screen = () => (dispatch: Dispatch) => navigate(ROUTES.OnBoarding2Screen, dispatch);
export const navigateToOnBoarding3Screen = () => (dispatch: Dispatch) => navigate(ROUTES.OnBoarding3Screen, dispatch);
export const navigateToOnBoarding4Screen = () => (dispatch: Dispatch) => navigate(ROUTES.OnBoarding4Screen, dispatch);
export const navigateToBusinessRegistration = () => (dispatch: Dispatch) => navigate(ROUTES.AuthBusinessRegistrationScreen, dispatch);
export const navigateToEditBusinessProfile = () => (dispatch: Dispatch) => navigate(ROUTES.EditBusinessProfileScreen, dispatch);
export const navigateToAddUsers = () => (dispatch: Dispatch) => navigate(ROUTES.AuthAddUserScreen, dispatch);
export const navigateToCatalogProductsCarte = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCarteCatalogScreen, dispatch);
export const navigateToQRForm = () => (dispatch: Dispatch) => navigate(ROUTES.QRCarteScreen, dispatch);
export const navigateToShareQRForm = () => (dispatch: Dispatch) => navigate(ROUTES.ShareQRCarteScreen, dispatch);
export const navigateToCatalogIfBussinessExists = () => async (dispatch: Dispatch) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    var token: any;
    token = decode(accessToken)
    if (token) {
      if (token.role.includes("NO")) {
        navigateToBusinessRegistration()(dispatch);
      }
      else
        navigateToCatalog()(dispatch);
    }
  }
}

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigateBack();
};
