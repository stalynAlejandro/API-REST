
import * as actions from './actionTypes'
import { IGroupByRequest } from './types'

export const groupByRequest = (GroupByRequest: IGroupByRequest) => ({
    type: actions.GROUP_BY_REQUEST,
    payload: {
        request: GroupByRequest
    }
})

export const searchByWordRequest = (keyword: string) => ({
    type: actions.SEARCH_BY_WORD,
    payload: keyword
})

export const filterRequest = (FilterRequest: IFilterState) => ({
    type: actions.FILTER_REQUEST,
    payload: {
        request: FilterRequest
    }
})

export const removeProviderTag = (providerTag: string) => ({
    type: actions.REMOVE_PROVIDER_TAG,
    payload: providerTag
})

export const removeLocationTag = (locationTag: string) => ({
    type: actions.REMOVE_LOCATION_TAG,
    payload: locationTag
})

export const updateProductsRequest = () => ({
    type: actions.UPDATE_DISPLAY_PRODUCTS,
    payload: undefined
})
