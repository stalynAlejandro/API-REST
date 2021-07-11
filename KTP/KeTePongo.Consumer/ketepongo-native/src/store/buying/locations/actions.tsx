import * as actions from './actionTypes'
import { ILocationsState } from './types'

export const searchByWordRequest = (keyword: string) => ({
    type: actions.LOCATIONS_SEARCH_BY_WORD,
    payload: keyword
})

export const reloadLocationsData = (data: ILocationsState[]) => ({
    type: actions.LOCATIONS_RELOAD_DATA,
    payload: data
})

export const reloadDisplayLocations = () => ({
    type: actions.LOCATIONS_RELOAD_DISPLAY_DATA,
    payload: undefined
})