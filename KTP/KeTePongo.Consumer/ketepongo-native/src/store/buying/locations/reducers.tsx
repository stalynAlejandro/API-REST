import { Reducer } from 'redux'
import { LocationTypes, ILocationAction, ILocationsState } from './types'
import * as actions from './actionTypes'

const {
    ADD_LOCATION_REQUESTED,
    ADD_LOCATION_SUCCEEDED,
    ADD_LOCATION_FAILED,
    DELETE_LOCATION_REQUESTED,
    DELETE_LOCATION_SUCCEEDED,
    DELETE_LOCATION_FAILED,
    UPDATE_LOCATION_REQUESTED,
    UPDATE_LOCATION_SUCCEEDED,
    UPDATE_LOCATION_FAILED,
    CLEAR_LOCATION_ERROR
} = LocationTypes;

const initialState: ILocationsState = {
    list: [],
    displayList: [],
    loading: false,
    error: undefined
}

const locations = (state = initialState, action: any) => {

    if (!action) return state;
    switch (action.type) {
        case ADD_LOCATION_REQUESTED: return { ...state };
        case ADD_LOCATION_SUCCEEDED: return { ...state };
        case ADD_LOCATION_FAILED: return { ...state };
        case DELETE_LOCATION_REQUESTED: return { ...state };
        case DELETE_LOCATION_SUCCEEDED: return { ...state };
        case DELETE_LOCATION_FAILED: return { ...state };
        case UPDATE_LOCATION_REQUESTED: return { ...state };
        case UPDATE_LOCATION_SUCCEEDED: return { ...state };
        case UPDATE_LOCATION_FAILED: return { ...state };
        case CLEAR_LOCATION_ERROR: return { ...state };
        case actions.LOCATIONS_RELOAD_DATA: return updateLocationsData(state, action.payload);
        case actions.LOCATIONS_RELOAD_DISPLAY_DATA: return updateDisplayLocations(state, action.payload);
        case actions.LOCATIONS_SEARCH_BY_WORD: return updateSearchByWord(state, action.payload);
        default: return state;
    }
}

function updateLocationsData(state: ILocationsState, newState: ILocationsState) {
    
    let responseLocations: string[] = newState.list.map((s) => s.name)
    return {
        ...state,
        list: newState.list,
        displayList: responseLocations
    }
}

function updateDisplayLocations(state: ILocationsState) {
    return {
        ...state,
        displayList: state.list.map((s) => s.name)
    }
}


function updateSearchByWord(state: ILocationsState, keyword: string) {
    let responseLocations: string[] = state.list.map((p) => p.name).filter((p) => p.includes(keyword))

    return {
        ...state,
        displayList: responseLocations
    }
}

export default locations;