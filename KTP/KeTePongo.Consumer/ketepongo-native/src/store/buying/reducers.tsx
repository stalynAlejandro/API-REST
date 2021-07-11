import { BuyingTypes, IBuyingState, IBuyingAction } from './types'
import locationsReducer from './locations/reducers'

import productsReducer from './products/reducers'
import filtersReducer from './filters/reducers'
import { Reducer } from "redux"

const {
    RELOAD_ALL_DATA_SUCCEEDED,
    RELOAD_ALL_DATA_REQUESTED,
    RELOAD_ALL_DATA_FAILED,
} = BuyingTypes

const initialState: IBuyingState = {
    groups: ['Sin Agrupar', 'Proveedor', 'Ubicación'],
    locations: {
        list: [],
        displayList: [],
        loading: false,
        error: undefined
    },
    products: {
        list: [],
    },
    filters: {
        search: {
            keyword: undefined,
            selectedProvider: '',
            selectedLocation: '',
            providerTags: [],
            locationTags: [],
            selectedGroup: '',
        },
        displayProducts: [],
    },
    error: null,
    loading: false
};

const buyingReducer: Reducer<IBuyingState, IBuyingAction> = (state = initialState, action: any) => {

    let schemaState: IBuyingState = {
        groups: initialState.groups,
        locations: locationsReducer(state.locations, action),
        products: productsReducer(state.products, action),
        filters: filtersReducer(state.filters, action, initialState.products.list),
        error: state.error,
        loading: state.loading
    };

    switch (action.type) {
        case RELOAD_ALL_DATA_SUCCEEDED: return { ...schemaState }
        case RELOAD_ALL_DATA_REQUESTED: return { ...schemaState }
        case RELOAD_ALL_DATA_FAILED: return { ...schemaState }
        default:
            return {
                ...schemaState,
                loading: false
            };
    }
};

export default buyingReducer;