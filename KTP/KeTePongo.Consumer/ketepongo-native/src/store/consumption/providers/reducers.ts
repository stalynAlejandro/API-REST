import { IProvidersState, IProvider } from './reducerTypes'
import { actionConsts } from './actionTypes'
import { IProviderRequestLinkDTO } from './operationTypes'
import { ConsumptionItemType } from '../types'

const initialState: IProvidersState = {
  listProviders: [],
  dictionary:{},
  displayListProviders: [],
  displayPendingToApproveList: [],
  pendingProvider: undefined,
  loading: false,
  error: undefined,
}

const providers = (state = initialState, action: any) => {
  if (!action) return state;
  switch (action.type) {
    case actionConsts.REQUEST_INFO_LINK_PROVIDER_REQUEST: return requestInfoForLinkProvider(state, action.payload);
    case actionConsts.REQUEST_INFO_LINK_PROVIDER_SUCCEEDED: return requestInfoForLinkProviderSucceded(state, action.payload);
    case actionConsts.REQUEST_INFO_LINK_PROVIDER_FAILED: return requestInfoForLinkProviderFailed(state, action.payload);
    case actionConsts.REQUEST_INFO_LINK_PROVIDER_CANCEL: return requestInfoForLinkProviderCancel(state);
    case actionConsts.REQUEST_LINK_PROVIDER_CONFIRM_REQUEST: return requestLinkProviderConfirm(state);
    case actionConsts.REQUEST_LINK_PROVIDER_CONFIRM_SUCCEEDED: return requestLinkProviderConfirmSucceded(state, action.payload);
    case actionConsts.REQUEST_LINK_PROVIDER_CONFIRM_FAILED: return requestLinkProviderConfirmFailed(state, action.payload);
    case actionConsts.REALOAD_DISPLAY_PROVIDERS: return updateDisplayProviders(state);
    case actionConsts.RELOAD_PROVIDERS_DATA: return updateProvidersData(state, action.payload);
    case actionConsts.SEARCH_BY_WORD: return updateSearchByWord(state, action.payload);
    default: return state;
  }
}

function requestInfoForLinkProvider(state: IProvidersState, name: string) {
  return {
    ...state,
    loading: true,
    error: undefined,
    pendingProvider: {
      tradeName: (name) ? name : state.pendingProvider?.tradeName
    }
  }
}

function requestInfoForLinkProviderSucceded(state: IProvidersState, pendingProvider: IProviderRequestLinkDTO) {
  return {
    ...state,
    loading: false,
    error: undefined,
    pendingProvider: {
      tradeName: state.pendingProvider?.tradeName,
      salesmanEmail: pendingProvider.salesmanEmail,
      salesmanName: pendingProvider.salesmanName,
      salesmanTelephone: pendingProvider.salesmanTelephone
    }
  }
}

function requestInfoForLinkProviderFailed(state: IProvidersState, errorDetail: any) {
  return {
    ...state,
    loading: false,
    error: errorDetail.error,
    pendingProvider: undefined
  }
}

function requestInfoForLinkProviderCancel(state: IProvidersState) {
  return {
    ...state,
    error: undefined,
    loading: false,
    pendingProvider: undefined
  }
}

function requestLinkProviderConfirm(state: IProvidersState) {
  return {
    ...state,
    pendingProvider: undefined,
  }
}

function requestLinkProviderConfirmSucceded(state: IProvidersState, responseProviderAdded: IProvider) {

  let providerAddedToConsumption: IProvider = {
    changeVersion: responseProviderAdded.changeVersion,
    id: responseProviderAdded.id,
    KeTePongoProviderOID: responseProviderAdded.KeTePongoProviderOID,
    orderWeekDays: responseProviderAdded.orderWeekDays,
    salesman: {
      email: responseProviderAdded.salesman.email,
      salesmanUserName: responseProviderAdded.salesman.salesmanUserName,
      telephone: responseProviderAdded.salesman.telephone
    },
    tradeName: responseProviderAdded.tradeName,
    isPendingToApprove: responseProviderAdded.isPendingToApprove,
  }

  return {
    ...state,
    listProviders: [...state.listProviders, providerAddedToConsumption]
  }
}

function requestLinkProviderConfirmFailed(state: IProvidersState, errorDetail: any) {
  return {
    ...state,
    loading: false,
    error: errorDetail.error,
  }
}

function updateDisplayProviders(state: IProvidersState) {
  return {
    ...state,
    displayListProviders: state.listProviders.filter((provider) => !provider.isPendingToApprove),
    displaypendingToApproveList: state.listProviders.filter((provider) => provider.isPendingToApprove)
  }
}

function updateProvidersData(state: IProvidersState, newState: any) {
  return {
    ...state,
    listProviders: newState.list,
    dictionary: createDictionary(newState.list),
    displayListProviders: newState.list.filter((provider) => !provider.isPendingToApprove),
    displaypendingToApproveList: newState.list.filter((provider) => provider.isPendingToApprove)
  }
}

function updateSearchByWord(state: IProvidersState, keyword: string) {
  return {
    ...state,
    displayListProviders: state.listProviders.filter((provider) => !provider.isPendingToApprove).filter((provider) => provider.tradeName.includes(keyword)),
    displaypendingToApproveList: state.listProviders.filter((provider) => provider.isPendingToApprove).filter((provider) => provider.tradeName.includes(keyword))
  }
}
interface Dictionary {
  [id: string]: ConsumptionItemType
}
const createDictionary = (array: Array<any>) => {
  let dictionary: Dictionary = {};

  array.map((item) => {
    if (!dictionary[item.id]) {
      dictionary[item.id] = item;
    }
  });

  return dictionary;
};
export default providers;
