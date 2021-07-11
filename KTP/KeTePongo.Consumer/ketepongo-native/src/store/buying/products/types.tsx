import { ErrorDetail } from 'store'

//Types
export enum ProductTypes {
    UPDATE_PRODUCT_REQUESTED = 'UPDATE_PRODUCT_REQUESTED',
    UPDATE_PRODUCT_SUCCEEDED = 'UPDATE_PRODUCT_SUCCEEDED',
    UPDATE_PRODUCT_FAILED = 'UPDATE_PRODUCT_FAILED',
    ADD_PRODUCT_TO_CATALOG_REQUESTED = 'ADD_PRODUCT_TO_CATALOG_REQUESTED',
    ADD_PRODUCT_TO_CATALOG_SUCCEEDED = 'ADD_PRODUCT_TO_CATALOG_SUCCEEDED ',
    ADD_PRODUCT_TO_CATALOG_FAILED = 'ADD_PRODUCT_TO_CATALOG_FAILED',
    DELETE_PRODUCT_FROM_CATALOG_REQUESTED = 'DELETE_PRODUCT_FROM_CATALOG_REQUESTED',
    DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED = 'DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED',
    DELETE_PRODUCT_FROM_CATALOG_FAILED = 'DELETE_PRODUCT_FROM_CATALOG_FAILED',
    CLEAR_PRODUCT_ERROR = 'CLEAR_PRODUCT_ERROR',
    NAVIGATE = 'NAVIGATE'
};

//Reducer
export interface IProductState {
    list: IProduct[],
}

export interface IProductAction {
    type: String,
    payload: any,
}

//Actions
export interface IProduct {
    id: number | undefined,
    name: string,
    price: number,
    vegan: boolean,
    alergens: string[],
    locations: string[],
    providers: string[],
}

