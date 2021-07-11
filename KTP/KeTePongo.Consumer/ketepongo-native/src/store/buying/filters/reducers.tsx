import * as actions from './actionTypes'
import { IFiltersState, IGroupByRequest, IFilterRequest } from './types'
import { IProduct } from 'store/buying/products/types'

const initialState: IFiltersState = {
    search: {
        keyword: undefined,
        selectedProvider: '',
        selectedLocation: '',
        providerTags: [],
        locationTags: [],
        selectedGroup: '',
    },
    displayProducts: [],
}

const filters = (state = initialState, action: any, products: IProduct[]) => {

    if (!action) return state;

    switch (action.type) {
        case actions.GROUP_BY_REQUEST:
            return updateProductsGroupBy(state, products, action.payload.request)
        case actions.SEARCH_BY_WORD:
            return updateSearchByWord(state, products, action.payload)
        case actions.FILTER_REQUEST:
            return updateFilterRequest(state, products, action.payload.request)
        case actions.REMOVE_LOCATION_TAG:
            return updateRemoveLocationTag(state, products, action.payload)
        case actions.REMOVE_PROVIDER_TAG:
            return updateRemoveProviderTag(state, products, action.payload)
        default:
            return {
                ...state,
                displayProducts: products,
            }
    }
}

function updateProductsGroupBy(state: IFiltersState, products: IProduct[], actions: IGroupByRequest) {

    let responseProducts: IProduct[] = []

    if (actions.group === 'Proveedor') {
        responseProducts = products.filter((p) => p.providers.includes(actions.provider))
        if (state.search.locationTags.length > 0) responseProducts = products.filter((p) => ((p.providers.includes(actions.provider)) && ((p.locations.some((p) => state.search.locationTags.includes(p))))))
    }

    if (actions.group === 'Ubicación') {
        responseProducts = products.filter((p) => p.locations.includes(actions.location))
        if (state.search.providerTags.length > 0) responseProducts = products.filter((p) => (p.locations.includes(actions.location) && (p.providers.some((p) => state.search.providerTags.includes(p)))))
    }

    if (actions.group === 'Sin Agrupar') {
        responseProducts = products
        if (state.search.providerTags.length > 0) responseProducts = responseProducts.filter((p) => (p.providers.some((p) => state.search.providerTags.includes(p))))
        if (state.search.locationTags.length > 0) responseProducts = responseProducts.filter((p) => (p.locations.some((p) => state.search.locationTags.includes(p))))
    }

    return {
        ...state,
        search: {
            keyword: state.search.keyword,
            selectedProvider: actions.provider,
            selectedLocation: actions.location,
            selectedGroup: actions.group,
            providerTags: state.search.providerTags,
            locationTags: state.search.locationTags
        },
        displayProducts: responseProducts
    }
}

function updateSearchByWord(state: IFiltersState, products: IProduct[], keyword: string) {

    let responseProducts: IProduct[] = products.filter((p) => p.name.includes(keyword.trim()))

    return {
        ...state,
        search: {
            keyword: keyword,
            selectedProvider: state.search.selectedProvider,
            selectedLocation: state.search.selectedLocation,
            selectedGroup: state.search.selectedGroup,
            providerTags: state.search.providerTags,
            locationTags: state.search.locationTags
        },
        displayProducts: responseProducts
    }
}

function updateFilterRequest(state: IFiltersState, products: IProduct[], actions: IFilterRequest) {

    return {
        ...state,
        search: {
            providerTags: actions.providerTags,
            locationTags: actions.locationTags
        }
    }
}

function updateRemoveLocationTag(state: IFiltersState, products: IProduct[], locationTag: string) {

    let updatedLocationTags: string[] = state.search.locationTags.filter((p) => p !== locationTag)
    let responseProducts: IProduct[] = []

    if ((updatedLocationTags.length === 0) && (state.search.providerTags.length === 0)) { //Ya no quedan tags
        if (state.search.selectedGroup === "Proveedor") responseProducts = products.filter((p) => p.providers.includes(state.search.selectedProvider))
        if (state.search.selectedGroup === "Ubicación") responseProducts = products.filter((p) => p.locations.includes(state.search.selectedLocation))
        if (state.search.selectedGroup === 'Sin Agrupar') responseProducts = products
    }
    else responseProducts = updateDisplayProducts(state, updatedLocationTags, [], products)

    return {
        ...state,
        search: {
            keyword: state.search.keyword,
            selectedProvider: state.search.selectedProvider,
            selectedLocation: state.search.selectedLocation,
            selectedGroup: state.search.selectedGroup,
            providerTags: state.search.providerTags,
            locationTags: updatedLocationTags,
        },
        displayProducts: responseProducts
    }
}

function updateRemoveProviderTag(state: IFiltersState, products: IProduct[], providerTag: string) {

    let updatedProviderTags: string[] = state.search.providerTags.filter((p) => p !== providerTag)
    let responseProducts: IProduct[] = []

    if ((updatedProviderTags.length === 0) && (state.search.locationTags.length === 0)) { //Ya no quedan tags
        if (state.search.selectedGroup === "Proveedor") responseProducts = products.filter((p) => p.providers.includes(state.search.selectedProvider))
        if (state.search.selectedGroup === "Ubicación") responseProducts = products.filter((p) => p.locations.includes(state.search.selectedLocation))
        if (state.search.selectedGroup === 'Sin Agrupar') responseProducts = products
    }
    else responseProducts = updateDisplayProducts(state, [], updatedProviderTags, products)

    return {
        ...state,
        search: {
            keyword: state.search.keyword,
            selectedProvider: state.search.selectedProvider,
            selectedLocation: state.search.selectedLocation,
            selectedGroup: state.search.selectedGroup,
            providerTags: state.search.providerTags.filter((p) => p !== providerTag),
            locationTags: state.search.locationTags
        },
        displayProducts: responseProducts

    }
}


function updateDisplayProducts(state: IFiltersState, locationsTags: string[], providersTags: string[], products: IProduct[]) {

    const applyLocations = (locationsTags.length > 0) ? locationsTags : state.search.locationTags;
    const applyProviders = (providersTags.length > 0) ? providersTags : state.search.providerTags;

    var responseProducts: IProduct[] = []

    if (state.search.selectedGroup === "Proveedor") responseProducts = products.filter((p) => p.providers.includes(state.search.selectedProvider))
    if (applyLocations.length > 0) responseProducts = products.filter((p) => (p.providers.includes(state.search.selectedProvider)) && (p.locations.some((p) => applyLocations.includes(p))))

    if (state.search.selectedGroup === "Ubicación") responseProducts = products.filter((p) => p.locations.includes(state.search.selectedLocation))
    if (applyProviders.length > 0) responseProducts = products.filter((p) => p.locations.includes(state.search.selectedLocation) && (p.providers.some((p) => applyProviders.includes(p))))

    if (state.search.selectedGroup === 'Sin Agrupar') responseProducts = products.filter((p) => ((p.locations.some((p) => applyLocations.includes(p)) && (p.providers.some((p) => applyProviders.includes(p))))))

    return responseProducts;
}

export default filters;

