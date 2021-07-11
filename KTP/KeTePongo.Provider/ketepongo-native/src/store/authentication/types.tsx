import { Action } from 'redux';
import { ErrorDetail } from "store"

// ***** Reducer
export interface IAuthState {
  error: ErrorDetail | undefined,
  isWaitingAnswerFromServer: boolean,
  isInitialAuthenticationStateRetrieved: boolean,
  accessToken: string,
  refreshToken: string,
  isUserLogged: boolean,
  tokenProvider: string,
  isSplashScreenActive: boolean,
  isAppUpdated: boolean,
  apiVersions: APIVersions | null,
  appVersion: string,
  hasConnectionWithServer: false,
  googlePlayAppUrl: string,
  appleAppStoreUrl: string,
  changeNameState: boolean | undefined,
  changeEmailState: boolean | undefined,
  changePhoneState: boolean | undefined,
  resendCodeState: boolean | undefined,
  pendingToConfirmPhoneWithCodeState: boolean | undefined,
  pendingToConfirmEmailWithCodeState: boolean | undefined,
}

export interface IAuthAction {
  type: string,
  payload: IAuthActionPayload
}

export type IAuthActionPayload = (
  IAuthInitialState | ErrorDetail
)

export interface APIVersions {
  provider: string;
  consumer: string;
  users: string;
};

// ***** Actions
export interface IAuthInitialState {
  accessToken: string | null,
  refreshToken: string | null,
  tokenProvider: string | null,
  isUserLogged: boolean,
  isInitialAuthenticationStateRetrieved: boolean
}

interface IfinishEditCallBack { (userData: string): void }
export interface IProfileData {
  userData: string,
  title: string,
  heading: string,
  finishEditCallBack: IfinishEditCallBack
}

interface IAlertPhoneChange { (phone: string): void }
export interface IChangePhoneData {
  phone: string,
  renderAlertPhoneVerification: IAlertPhoneChange
}

export interface IChangeEmailData {
  email: string,
}
export interface IChangeUserNameData {
  userName: string,
}
interface IAlertUserPasswordChange { (): void }
export interface IChangeUserPasswordData {
  oldPassword: string,
  newPassword: string,
  renderAlertUserPasswordChanged: IAlertUserPasswordChange
}

export interface IHash {
  [details: string]: ILoginProviderData
}

export interface ILoginProviderData {
  client_id: string,
  grant_type: string,
  response_type: string,
  scope: string,
  redirect_uri: string,
  authorization_endpoint: string
}

export interface ILoginData {
  email: string,
  password: string,
  name: string
}

export interface IImpersonationRequest {
  userEmail: string,
}

export interface IBusinessData {
  businessName: string,
  cif: string,
  tradeName: string,
  address: string,
  town: string,
  postalCode: number,
  stateOrProvince: string,
  id: number,
  imageFile: object,
  welcomeMessage: string
}
export interface IBusinessDataWithImage {
  businessData: IBusinessData,
  imageFile: object
  sanitaryMeasures: string[]
}
export interface INewEmail {
  newEmail: string,
}
export interface INewEmail {
  newEmail: string,
}

export interface IInvitationsData {
  email1: string,
  email2: string,
  email3: string,
}

interface IInitializeAuthenticationState extends Action<AuthenticationTypes.AUTHENTICATION_STATE_INITIALIZED> {
  type: AuthenticationTypes.AUTHENTICATION_STATE_INITIALIZED,
  payload: IAuthInitialState
}

interface IHideSplash extends Action<AuthenticationTypes.SPLASH_SCREEN_HIDDEN> {
  type: AuthenticationTypes.SPLASH_SCREEN_HIDDEN,
}

interface IUpdateError extends Action<AuthenticationTypes.UPDATE_ERROR> {
  type: AuthenticationTypes.UPDATE_ERROR,
  payload: ErrorDetail
}

interface IUpdateError extends Action<AuthenticationTypes.UPDATE_ERROR> {
  type: AuthenticationTypes.UPDATE_ERROR,
  payload: ErrorDetail
}

type ChangePhoneAction = {
  apiPhoneChangeState: (
    AuthenticationTypes.REQUEST_PHONE_CHANGE_REQUESTED |
    AuthenticationTypes.REQUEST_PHONE_CHANGE_SUCCEDED |
    AuthenticationTypes.REQUEST_PHONE_CHANGE_FAILED
  )
}
interface IChangePhoneRequested extends Action<ChangePhoneAction> {
  phone: ChangePhoneAction,
  payload: number
}

type ChangeEmailAction = {
  apiPhoneChangeState: (
    AuthenticationTypes.REQUEST_EMAIL_CHANGE_REQUESTED |
    AuthenticationTypes.REQUEST_EMAIL_CHANGE_SUCCEDED |
    AuthenticationTypes.REQUEST_EMAIL_CHANGE_FAILED
  )
}
interface IChangeEmailRequested extends Action<ChangeEmailAction> {
  phone: ChangeEmailAction,
  payload: number
}

type InvitationsAction = {
  apiPhoneChangeState: (
    AuthenticationTypes.REQUEST_INVITATIONS_REQUESTED |
    AuthenticationTypes.REQUEST_INVITATIONS_SUCCEDED |
    AuthenticationTypes.REQUEST_INVITATIONS_FAILED
  )
}
interface IInvitationsRequested extends Action<InvitationsAction> {
  type: InvitationsAction,
  payload: number
}

type ChangeRegisterAction = {
  apiPhoneChangeState: (
    AuthenticationTypes.REQUEST_REGISTER_REQUESTED |
    AuthenticationTypes.REQUEST_REGISTER_SUCCEDED |
    AuthenticationTypes.REQUEST_REGISTER_FAILED
  )
}
interface IChangeRegisterRequested extends Action<ChangeRegisterAction> {
  type: ChangeRegisterAction,
  payload: number
}

type ConfirmUserCodeAction = {
  apiPhoneChangeState: (
    AuthenticationTypes.REQUEST_CONFIRM_USER_CODE_REQUESTED |
    AuthenticationTypes.REQUEST_CONFIRM_USER_CODE_SUCCEDED |
    AuthenticationTypes.REQUEST_CONFIRM_USER_CODE_FAILED
  )
}
interface IConfirmUserCodeRequested extends Action<ConfirmUserCodeAction> {
  type: ConfirmUserCodeAction,
  payload: number
}

export type AuthenticationActions = (
  IInitializeAuthenticationState |
  IHideSplash |
  IUpdateError |
  IChangePhoneRequested |
  IChangeEmailRequested |
  IChangeRegisterRequested |
  IInvitationsRequested |
  IConfirmUserCodeRequested
);
