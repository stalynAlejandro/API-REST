import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import decode from 'jwt-decode';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux'
import { ActionSheetIOS, Linking } from 'react-native';
import {
  AuthenticationActions,
  IAuthInitialState,
  IProfileData,
  APIVersions
} from './types';
import { actionConsts } from './actionTypes'
import { ROUTES } from '../../constants';
import NavigationService from '../../navigation/NavigationService';
import { getAccessTokenUsingExternalProvider, getAPIVersions, checkAppVersionIsSupported, getAppInstallingUrls } from './operations';
import { ErrorDetail } from "store";
import { reloadAllDataRequested } from '../consumption'
import DeviceInfo from 'react-native-device-info';
import { isAnyAPIVersionOutdated } from "shared/Version";
import { store } from '../../App';
import db from '../../store/apis/db';
import AuthConfirmationScreenComponentStyles from 'containers/Auth/AuthConfirmationScreen/AuthConfirmationScreen.component.styles';


const updateInitAuthState = (payload: IAuthInitialState): AuthenticationActions => (
  { type: actionConsts.AUTHENTICATION_STATE_INITIALIZED, payload }
);
export const initializeAuthenticationState = () => async (dispatch: Dispatch, getState) => {
  let hasConnectionWithServer = true;
  const appVersion = DeviceInfo.getVersion();

  await checkAppVersionIsSupported(appVersion).catch((error) => {
    if (error.request.status === 426) {
      dispatch({ type: actionConsts.SET_APP_OUTDATED });
      hideSplashScreen()(dispatch);
    }
    return;
  })

  let areAPIVersionsUpdated = true;
  await AsyncStorage.multiGet(["accessToken", "refreshToken", "tokenProvider"]).then(
    async data => {
      let apiVersions: APIVersions = null;

      let appInstallingUrls = null;
      await getAppInstallingUrls().then((response) => {
        appInstallingUrls = response.data
      }).catch(() => { })

      await Promise.all(getAPIVersions()).then((data) => {
        apiVersions = {
          consumer: data[0].data,
          provider: data[1].data,
          users: data[2].data
        }

        if (isAnyAPIVersionOutdated(apiVersions)) {
          areAPIVersionsUpdated = false;
        }

      }).catch((error) => {
        if (error && error.request && error.request.status === 521) {
          areAPIVersionsUpdated = false;
        } else {
          hasConnectionWithServer = false;
          dispatch(updateInitAuthState({
            hasConnectionWithServer: false,
            isUserLogged: accessToken ? true : false,
            isInitialAuthenticationStateRetrieved: true,
            googlePlayAppUrl: appInstallingUrls ? appInstallingUrls.googlePlayUrl : "",
            appStoreAppUrl: appInstallingUrls ? appInstallingUrls.appleAppStoreUrl : ""
          }));
          hideSplashScreen()(dispatch);
        }
      });


      if (!areAPIVersionsUpdated) {
        dispatch({ type: actionConsts.SET_APP_OUTDATED, payload: appInstallingUrls });
        hideSplashScreen()(dispatch);
      }

      const accessToken = data[0][1] as string;
      if (!hasConnectionWithServer && !accessToken) {
        return;
      }

      const payload = {
        accessToken,
        refreshToken: data[1][1],
        tokenProvider: data[1][1],
        isUserLogged: accessToken ? true : false,
        isInitialAuthenticationStateRetrieved: true,
        apiVersions,
        appVersion,
        hasConnectionWithServer,
        googlePlayAppUrl: appInstallingUrls.googlePlayUrl,
        appStoreAppUrl: appInstallingUrls.appleAppStoreUrl
      };
      dispatch(updateInitAuthState(payload));
      navigateToCatalogCarteIfUserLogged()(dispatch, getState);
      hideSplashScreen()(dispatch);
    });
  Linking.addEventListener("url", (answer: { url: any; }) => getAccessTokenUsingExternalProvider(answer.url)(dispatch, getState));
  Linking.getInitialURL()
    .then((url) => {
      if (url) {
        getAccessTokenUsingExternalProvider(url)(dispatch, getState)
      }
    });
};

const updateSplashState = (): AuthenticationActions => { return { type: actionConsts.SPLASH_SCREEN_HIDDEN } };
const hideSplash = (): void => SplashScreen.hide();
export const hideSplashScreen = () => async (dispatch: Dispatch) => {
  hideSplash();
  dispatch(updateSplashState());
};

export const displaySplashScreen = () => async (dispatch: Dispatch) => {
  SplashScreen.show();
  dispatch({ type: actionConsts.SPLASH_SCREEN_DISPLAYED })
}

const updateErrorState = (payload: ErrorDetail): AuthenticationActions => ({ type: actionConsts.UPDATE_ERROR, payload: payload });
export const updateError = (error: ErrorDetail) => async (dispatch: Dispatch) => {
  dispatch(updateErrorState(error));
};

const navigateWithParams = (profileData: IProfileData): void => NavigationService.navigate(ROUTES.EditProfileScreen, profileData);
export const navigateToEditProfile = ({ userData, title, heading, finishEditCallBack }: IProfileData) =>
  (dispatch: Dispatch) => {
    dispatch({ type: actionConsts.NAVIGATE });
    const profileData = {
      userData,
      title,
      heading,
      finishEditCallBack
    };
    navigateWithParams(profileData);
  };
const navigateToAUthWithParams = (parameters: any): void => NavigationService.navigate(ROUTES.AuthScreen, parameters);
const navigateToCatalogCarteWithParams = (parameters: any) => NavigationService.navigate(ROUTES.ProductCarteCatalogScreen, parameters)
export const navigateToClosedSessionAuthScreen = () =>
  (dispatch: Dispatch) => {
    dispatch({ type: actionConsts.NAVIGATE });
    const parameters = {
      isSessionClosed: true,
    };
    navigateToAUthWithParams(parameters);
  };

export const navigate = (route: string, dispatch: Dispatch): void => {
  dispatch({ type: actionConsts.NAVIGATE });
  return NavigationService.navigate(route);
}

export const navigateToImpersonate = () => (dispatch: Dispatch) => navigate(ROUTES.ImpersonateScreen, dispatch);
export const navigateToCatalog = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCatalogScreen, dispatch);
export const navigateToCatalogCarte = () => (dispatch: Dispatch) => navigate(ROUTES.ProductCarteCatalogScreen, dispatch);
export const navigateToShareQRCarteScreen = () => (dispatch: Dispatch) => navigate(ROUTES.ShareQRCarteScreen, dispatch);
export const navigateToAuthScreen = () => (dispatch: Dispatch) => navigate(ROUTES.AuthScreen, dispatch);

export const navigateToRegisterUser = () => (dispatch: Dispatch) => {
  return navigate(ROUTES.AuthRegisterScreen, dispatch);
}
export const navigateToUpgradeScreen = () => (dispatch: Dispatch) => navigate(ROUTES.UpgradeAppScreen, dispatch);
export const navigateToLogIn = () => (dispatch: Dispatch) => navigate(ROUTES.AuthLogInScreen, dispatch);
export const navigateToAuthConfirmation = () => (dispatch: Dispatch) => navigate(ROUTES.AuthConfirmationScreen, dispatch);
export const navigateToAuthChangeEmailConfirmation = () => (dispatch: Dispatch) => navigate(ROUTES.AuthChangeEmailConfirmationScreen, dispatch);
export const navigateToBusinessRegistration = (consumerType: number) => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.NAVIGATE })
  return NavigationService.navigate(ROUTES.AuthBusinessRegistrationScreen, { consumerType });
}
export const navigateToSelectModeConsumerRegistration = () => (dispatch: Dispatch) => navigate(ROUTES.AuthSelectConsumerTypeScreen, dispatch);
export const navigateToAddUsers = () => (dispatch: Dispatch) => navigate(ROUTES.AuthAddUserScreen, dispatch);

export const navigateToMyAccount = () => (dispatch: Dispatch) => navigate(ROUTES.MyAccountScreen, dispatch);
export const navigateToMyProducts = () => (dispatch: Dispatch) => navigate(ROUTES.MyProductsScreen, dispatch);
export const navigateBackToMyProducts = () => (dispatch: Dispatch, getState) => {
  reloadAllDataRequested()(dispatch, getState);
  navigate(ROUTES.MyProductsScreen, dispatch);
};

export const resetNavigation = () => () => {
  return NavigationService.resetNavigation();
};
export const navigateToAuthConfirmationWithData = (dataToSubmit) => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.NAVIGATE });
  return NavigationService.navigate(ROUTES.AuthConfirmationScreen, { dataToSubmit });
}
export const navigateToCatalogCarteIfUserLogged = () => async (dispatch: Dispatch, getState) => {
  const accessToken = await AsyncStorage.getItem('accessToken');
  if (accessToken) {
    token = decode(accessToken)
    var token: any;
    if (token) {
      if (token.role === "PROVIDER ADMIN USER") {
        return
      }
      if (token.role === "PROVIDER USER") {
        return
      }
      if (token.Permission.includes("IMPERSONATEOTHERUSERS") && token.role.includes("CONSUMER ADMIN USER")) {
        const parameters = { isAuthorizedToImpersonate: true }
        reloadAllDataRequested()(dispatch, getState);
        // navigateToCatalogCarteWithParams(parameters);
        navigateToMyProducts()(dispatch);
        return
      }
      if (token.Permission.includes("IMPERSONATEOTHERUSERS")) {
        navigateToImpersonate()(dispatch);
        return
      }

      if (token.role.includes("PENDING CONSUMER USER") || (!token.email_verified)) {
        navigateToSelectModeConsumerRegistration()(dispatch);
      } else {
        if (token.role.includes("CONSUMER ADMIN USER") || token.role.includes("CONSUMER USER")) {
          reloadAllDataRequested()(dispatch, getState);
          navigateToMyProducts()(dispatch);
        }
        if (token.role.includes("NO CONSUMER USER")) {
          navigateToSelectModeConsumerRegistration()(dispatch);
        }
      }
      /**/
    }

  }
}

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.NAVIGATE });
  return NavigationService.navigateBack();
};

export const reloadConfirmationCodeRequest = () => (dispatch: Dispatch) => (
  dispatch({ type: actionConsts.NAVIGATE })
)

export const reloadNameChangeRequested = () => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.REQUEST_NAME_CHANGE_REQUESTED })
}

export const reloadEmailChangeRequested = () => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.REQUEST_EMAIL_CHANGE_REQUESTED })
}

export const reloadPhoneChangeRequested = () => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.REQUEST_PHONE_CHANGE_REQUESTED })
}

export const reloadResendCodeChangeRequested = () => (dispatch: Dispatch) => {
  dispatch({ type: actionConsts.REQUEST_SEND_EMAIL_CODE_REQUESTED })
}

export async function GetConsumerData(setConsumerData: Function, dispatch: Dispatch) {
  try {
    const result = await (await db.apiConsumers({}, store.getState)).get("Consumer")
    setConsumerData(result.data)
  } catch (retryError) {
    dispatch({ type: actionConsts.REQUEST_CONSUMER_DATA_FAILED, payload: { error: retryError } });
    return;
  }
}