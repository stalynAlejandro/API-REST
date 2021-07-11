import { Action } from 'redux';
import { ErrorDetail } from "store"
import { EnumType } from 'typescript';
import { actionConsts } from './actionTypes'
import { ConsumerType } from '../../model/DTOs/Consumer/ConsumerType'

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
  updateBussinesState: boolean | undefined,
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
}

interface IAlertEmailChange { (email: string): void }
export interface IChangeEmailData {
  email: string,
}
interface IAlertUserNameChange { (userName: string): void }
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
  tradeName: string | undefined,
  address: string,
  town: string,
  postalCode: number | undefined,
  stateOrProvince: string,
  id: number | undefined,
  imageFile: object | undefined,
  welcomeMessage: string | undefined,
  ConsumerType: ConsumerType
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

interface IInitializeAuthenticationState extends Action<actionConsts.AUTHENTICATION_STATE_INITIALIZED> {
  type: actionConsts.AUTHENTICATION_STATE_INITIALIZED,
  payload: IAuthInitialState
}

interface IHideSplash extends Action<actionConsts.SPLASH_SCREEN_HIDDEN> {
  type: actionConsts.SPLASH_SCREEN_HIDDEN,
}

interface IUpdateError extends Action<actionConsts.UPDATE_ERROR> {
  type: actionConsts.UPDATE_ERROR,
  payload: ErrorDetail
}

interface IUpdateError extends Action<actionConsts.UPDATE_ERROR> {
  type: actionConsts.UPDATE_ERROR,
  payload: ErrorDetail
}

type ChangePhoneAction = {
  apiPhoneChangeState: (
    actionConsts.REQUEST_PHONE_CHANGE_REQUESTED |
    actionConsts.REQUEST_PHONE_CHANGE_SUCCEEDED |
    actionConsts.REQUEST_PHONE_CHANGE_FAILED
  )
}
interface IChangePhoneRequested extends Action<ChangePhoneAction> {
  phone: ChangePhoneAction,
  payload: number
}

type ChangeEmailAction = {
  apiPhoneChangeState: (
    actionConsts.REQUEST_EMAIL_CHANGE_REQUESTED |
    actionConsts.REQUEST_EMAIL_CHANGE_SUCCEEDED |
    actionConsts.REQUEST_EMAIL_CHANGE_FAILED
  )
}
interface IChangeEmailRequested extends Action<ChangeEmailAction> {
  phone: ChangeEmailAction,
  payload: number
}

type InvitationsAction = {
  apiPhoneChangeState: (
    actionConsts.REQUEST_INVITATIONS_REQUESTED |
    actionConsts.REQUEST_INVITATIONS_SUCCEEDED |
    actionConsts.REQUEST_INVITATIONS_FAILED
  )
}
interface IInvitationsRequested extends Action<InvitationsAction> {
  type: InvitationsAction,
  payload: number
}

type ChangeRegisterAction = {
  apiPhoneChangeState: (
    actionConsts.REQUEST_REGISTER_REQUESTED |
    actionConsts.REQUEST_REGISTER_SUCCEEDED |
    actionConsts.REQUEST_REGISTER_FAILED
  )
}
interface IChangeRegisterRequested extends Action<ChangeRegisterAction> {
  type: ChangeRegisterAction,
  payload: number
}

type ConfirmUserCodeAction = {
  apiPhoneChangeState: (
    actionConsts.REQUEST_CONFIRM_USER_CODE_REQUESTED |
    actionConsts.REQUEST_CONFIRM_USER_CODE_SUCCEEDED |
    actionConsts.REQUEST_CONFIRM_USER_CODE_FAILED
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

export interface IConsumer {
  address: string;
  changeVersion: number;
  code: string;
  consumerType: number;
  enabled: boolean;
  imageUrl: string;
  oid: number;
  postalCode: number;
  porvideroOID: number;
  sanitaryMeasures: string[];
  stateOrProvince: string;
  telephone: string;
  town: string;
  businessName: string;
  tradeName: string;
  welcomeMessage: string;
}