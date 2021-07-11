import { IAuthAction, IAuthState } from "./types";
import { actionConsts } from './actionTypes'


const initialState: IAuthState = {
  error: undefined,
  isWaitingAnswerFromServer: false,
  isInitialAuthenticationStateRetrieved: false,
  accessToken: "",
  refreshToken: "",
  isUserLogged: false,
  tokenProvider: "",
  isSplashScreenActive: true,
  isAppUpdated: true,
  apiVersions: null,
  hasConnectionWithServer: false,
  appVersion: "",
  googlePlayAppUrl: "",
  appleAppStoreUrl: "",
  updateBussinesState: undefined,
  changeNameState: undefined,
  changeEmailState: undefined,
  changePhoneState: undefined,
  pendingToConfirmEmailWithCodeState: undefined,
  pendingToConfirmPhoneWithCodeState: undefined,
  resendCodeState: undefined,
};

const authenticationReducer = (state = initialState, action: IAuthAction): IAuthState => {
  switch (action.type) {
    case actionConsts.NAVIGATE: return { ...state, error: undefined };
    case actionConsts.AUTHENTICATION_STATE_INITIALIZED: return { ...state, ...action.payload };
    case actionConsts.SPLASH_SCREEN_HIDDEN: return { ...state, isSplashScreenActive: false, isWaitingAnswerFromServer: false };
    case actionConsts.UPDATE_ERROR: return { ...state, error: action.payload.error };

    case actionConsts.REQUEST_TOKEN_REQUESTED: return { ...state, ...action.payload, isWaitingAnswerFromServer: true };
    case actionConsts.REQUEST_TOKEN_SUCCEEDED: return { ...state, ...action.payload, isWaitingAnswerFromServer: false };

    case actionConsts.REQUEST_CONFIRM_USER_CODE_FAILED:
    case actionConsts.REQUEST_TOKEN_FAILED:
    case actionConsts.REQUEST_INVITATIONS_FAILED:
    case actionConsts.REQUEST_REGISTER_FAILED:
    case actionConsts.REQUEST_UPDATE_FAILED:
    case actionConsts.LOAD_BUSINESS_FAILED:
    case actionConsts.REQUEST_USER_DATA_FAILED:
    case actionConsts.REQUEST_SEND_NEW_USER_CODE_FAILED:
    case actionConsts.REQUEST_SEND_PHONE_CODE_FAILED:
    case actionConsts.REQUEST_SEND_EMAIL_CODE_FAILED:
    case actionConsts.REQUEST_PHONE_CHANGE_FAILED:
    case actionConsts.REQUEST_EMAIL_CHANGE_FAILED:
    case actionConsts.REQUEST_CONSUMER_DATA_FAILED: return { ...state, error: action.payload.error, isWaitingAnswerFromServer: false };

    case actionConsts.REQUEST_NAME_CHANGE_REQUESTED: return { ...state, changeNameState: undefined }
    case actionConsts.REQUEST_NAME_CHANGE_SUCCEEDED: return { ...state, error: undefined, changeNameState: true }
    case actionConsts.REQUEST_NAME_CHANGE_FAILED: return { ...state, error: action.payload.error }

    case actionConsts.REQUEST_EMAIL_CHANGE_REQUESTED: return { ...state, error: undefined, changeEmailState: undefined, pendingToConfirmEmailWithCodeState: false, resendCodeState: false };
    case actionConsts.REQUEST_EMAIL_CHANGE_SUCCEEDED: return { ...state, error: undefined, pendingToConfirmEmailWithCodeState: true };

    case actionConsts.REQUEST_CONFIRM_EMAIL_CODE_REQUESTED: return { ...state, error: undefined }
    case actionConsts.REQUEST_CONFIRM_EMAIL_CODE_SUCCEEDED: return { ...state, error: undefined, changeEmailState: true, pendingToConfirmEmailWithCodeState: false }
    case actionConsts.REQUEST_CONFIRM_EMAIL_CODE_FAILED: return { ...state, error: "El código introducido no es el correcto", pendingToConfirmEmailWithCode: true }

    case actionConsts.REQUEST_PHONE_CHANGE_REQUESTED: return { ...state, error: undefined, changePhoneState: undefined, pendingToConfirmPhoneWithCodeState: false, resendCodeState: false }
    case actionConsts.REQUEST_PHONE_CHANGE_SUCCEEDED: return { ...state, error: undefined, pendingToConfirmPhoneWithCodeState: true }

    case actionConsts.REQUEST_CONFIRM_PHONE_CODE_REQUESTED: return { ...state, error: undefined }
    case actionConsts.REQUEST_CONFIRM_PHONE_CODE_SUCCEEDED: return { ...state, error: undefined, changePhoneState: true, pendingToConfirmPhoneWithCodeState: false }
    case actionConsts.REQUEST_CONFIRM_PHONE_CODE_FAILED: return { ...state, error: "El código introducido no es el correcto", pendingToConfirmPhoneWithCodeState: true }

    case actionConsts.REQUEST_SEND_PHONE_CODE_REQUESTED: return { ...state, resendCodeState: undefined }
    case actionConsts.REQUEST_SEND_PHONE_CODE_SUCCEEDED: return { ...state, resendCodeState: true }

    case actionConsts.REQUEST_SEND_EMAIL_CODE_REQUESTED: return { ...state, resendCodeState: undefined }
    case actionConsts.REQUEST_SEND_EMAIL_CODE_SUCCEEDED: return { ...state, resendCodeState: true }

    case actionConsts.REQUEST_CONFIRM_USER_CODE_REQUESTED:
    case actionConsts.REQUEST_REGISTER_REQUESTED: return { ...state, error: undefined, isWaitingAnswerFromServer: true }

    case actionConsts.REQUEST_UPDATE_REQUESTED: return { ...state, updateBussinesState: undefined }
    case actionConsts.REQUEST_UPDATE_SUCCEEDED: return { ...state, updateBussinesState: true }

    case actionConsts.REQUEST_CONFIRM_USER_CODE_SUCCEEDED:
    case actionConsts.REQUEST_INVITATIONS_REQUESTED:
    case actionConsts.LOAD_BUSINESS_REQUESTED:
    case actionConsts.REQUEST_INVITATIONS_SUCCEEDED:
    case actionConsts.REQUEST_REGISTER_SUCCEEDED:
    case actionConsts.LOAD_BUSINESS_SUCCEEDED:
    case actionConsts.REQUEST_SEND_NEW_USER_CODE_SUCCEEDED: return { ...state, error: undefined, isWaitingAnswerFromServer: false, };
    case actionConsts.SIGNOUT:
      return {
        ...state,
        error: undefined,
        isWaitingAnswerFromServer: false,
        accessToken: "",
        refreshToken: "",
        isUserLogged: false,
        tokenProvider: ""
      };
    case actionConsts.SPLASH_SCREEN_DISPLAYED:
      return {
        ...state,
        isSplashScreenActive: true
      }
    case actionConsts.SET_APP_OUTDATED:
      return {
        ...state,
        isAppUpdated: false,
        isInitialAuthenticationStateRetrieved: true,
        googlePlayAppUrl: action.payload ? action.payload.googlePlayUrl : state.googlePlayAppUrl,
        appleAppStoreUrl: action.payload ? action.payload.appleAppStoreUrl : state.appleAppStoreUrl,
      }
    case actionConsts.SET_API_VERSIONS:
      return {
        ...state,
        apiVersions: action.payload
      }
    case actionConsts.HIDE_SPINNER:
      return {
        ...state,
        isWaitingAnswerFromServer: false
      }
    default:
      return state;
  }
};

export default authenticationReducer;