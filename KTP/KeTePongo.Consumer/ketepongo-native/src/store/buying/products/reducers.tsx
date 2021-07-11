import { Reducer } from 'redux'
import { ProductTypes, IProductAction, IProductState } from './types'
import { BuyingTypes } from '../types'
import * as actions from './actionTypes'

const { RELOAD_PRODUCTS_DATA } = BuyingTypes;

const {
    ADD_PRODUCT_TO_CATALOG_REQUESTED,
    ADD_PRODUCT_TO_CATALOG_SUCCEEDED,
    ADD_PRODUCT_TO_CATALOG_FAILED,
    UPDATE_PRODUCT_REQUESTED,
    UPDATE_PRODUCT_SUCCEEDED,
    UPDATE_PRODUCT_FAILED,
    DELETE_PRODUCT_FROM_CATALOG_REQUESTED,
    DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED,
    DELETE_PRODUCT_FROM_CATALOG_FAILED,
    CLEAR_PRODUCT_ERROR,
} = ProductTypes


const initialState: IProductState = {
    list: [],
}

const products: Reducer<IProductState, IProductAction> = (state = initialState, action: any) => {
    if (!action) return state;
    switch (action.type) {
        case ADD_PRODUCT_TO_CATALOG_REQUESTED: return { ...state };
        case ADD_PRODUCT_TO_CATALOG_SUCCEEDED: return { ...state };
        case ADD_PRODUCT_TO_CATALOG_FAILED: return { ...state };
        case UPDATE_PRODUCT_REQUESTED: return { ...state };
        case UPDATE_PRODUCT_SUCCEEDED: return { ...state };
        case UPDATE_PRODUCT_FAILED: return { ...state };
        case DELETE_PRODUCT_FROM_CATALOG_REQUESTED: return { ...state };
        case DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED: return { ...state };
        case DELETE_PRODUCT_FROM_CATALOG_FAILED: return { ...state };
        case CLEAR_PRODUCT_ERROR: return { ...state };
        default: return state;
    }
}


export default products;