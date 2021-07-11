import { Dispatch } from 'redux';
import { ConsumptionTypes } from './types';
import NavigationService from '../../navigation/NavigationService';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import { ROUTES } from '../../constants';
const {
  NAVIGATE
} = ConsumptionTypes

const navigate = (route: string, dispatch: Dispatch): void => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(route);
}
export const navigateToEmployeeList = () => (dispatch: Dispatch) => navigate(ROUTES.EmployeeListScreen, dispatch);
export const navigateToProfile = () => (dispatch: Dispatch) => navigate(ROUTES.ProfileScreen, dispatch);

export const navigateToCatalog = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCatalogScreen, dispatch);
export const navigateToAuthScreen = () => (dispatch: Dispatch) => navigate(ROUTES.AuthScreen, dispatch);
export const navigateToLogIn = () => (dispatch: Dispatch) => navigate(ROUTES.AuthLogInScreen, dispatch);
export const navigateToBusinessRegistration = () => (dispatch: Dispatch) => navigate(ROUTES.AuthBusinessRegistrationScreen, dispatch);
export const navigateToAddUsers = () => (dispatch: Dispatch) => navigate(ROUTES.AuthAddUserScreen, dispatch);


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
