import { ErrorDetail } from "store";
import { IProviderRequestLinkDTO } from './operationTypes'

export interface IProvidersState {
  listProviders: IProvider[],
  dictionary:{},
  displayListProviders: IProvider[],
  displayPendingToApproveList: string[],
  pendingProvider: IProviderRequestLinkDTO | undefined,
  loading: boolean,
  error: ErrorDetail | undefined,
}

export interface IProvider {
  changeVersion: number | undefined,
  id: number,
  keTePongoProviderOID: number | undefined,
  orderWeekDays: number[] | undefined,
  salesman: ISalesman,
  tradeName: string,
  isPendingToApprove: boolean
}

export interface ISalesman {
  salesmanUserName: string | undefined,
  email: string,
  telephone: string,
}

export interface IProviderHash {
  [details: string]: IProvider
}
