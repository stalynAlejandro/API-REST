import { SectionWithProducts } from "../../store/filterCatalogCarte";

export interface IScrollReducerState {
    data: SectionWithProducts[],
    page: number,
    isDataCompletelyLoaded: boolean,
    isPageInitialized: boolean
}

export enum IScrollReducerActionType {
    MORE_DATA_LOADED = "MORE_DATA_LOADED",
    DATA_END_REACHED = "DATA_END_REACHED",
    REFRESH_DATA = "REFRESH_DATA",
    PAGE_INITIALIZED = "PAGE_INITIALIZED"
}

interface IScrollReducerAction {
    type: IScrollReducerActionType,
    payload?: any
}

export function setScrollInitialState(initialData : SectionWithProducts[], isPageInitialized: boolean): IScrollReducerState {
    return {
        data: initialData.slice(0, 2),
        page: 1,
        isDataCompletelyLoaded: initialData.length > 2 ? false: true,
        isPageInitialized
    }
}

function carteScrollReducer(state: IScrollReducerState, action: IScrollReducerAction): IScrollReducerState {
    switch (action.type) {
        case IScrollReducerActionType.MORE_DATA_LOADED:
            return {
                ...state,
                page: state.page + 1,
                data: [...state.data, action.payload],
            };

        case IScrollReducerActionType.DATA_END_REACHED:
            return {
                ...state,
                isDataCompletelyLoaded: true
            }
        case IScrollReducerActionType.REFRESH_DATA:
            return setScrollInitialState(action.payload, true);
        case IScrollReducerActionType.PAGE_INITIALIZED:
            return{
                ...state,
                isPageInitialized: true
            }
        default:
            return state;
    }
}
export default carteScrollReducer;