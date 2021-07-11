import {
  IProduct,
  ProductTypes
} from './types';
import NavigationService from '../../../navigation/NavigationService';
import { STRINGS, ROUTES } from '../../../constants';
import { simpleAsycnActionCreator } from '../../actionCreatorMethods';
import { Dispatch } from "redux";
import { reloadAllData } from './actions'
import rootReducer from '../..';
import {NewProductDTOWithImage} from "model/DTOs";

type AppState = ReturnType<typeof rootReducer>

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
} = ProductTypes;


export const addProductToCatalog = (product: IProduct, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
  const data: NewProductDTOWithImage ={
     product: {
       name: product.name,
       locationIds: product.locationIds,
       providerId: product.providerId,
       imageFile: product.imageUrl
      //  formatId:product.format,
      //  providerFormatDescription:"",
      //  providerProductId: product.id,
      //  providerForeignReference:"2"
     },
//imageFile: product.imageUrl
   }
    const formdata = new FormData();
     formdata.append("product",JSON.stringify(data.product))
    //  formdata.append("imageFile",{
    //     uri: product.imageUrl,
    //     type: "image/jpeg",
    //     name: "image.jpg",
    //   })
   await simpleAsycnActionCreator(STRINGS.POST, "apiConsumers", 'Product',
     STRINGS.appFormEncoded,
     ADD_PRODUCT_TO_CATALOG_REQUESTED,
     ADD_PRODUCT_TO_CATALOG_SUCCEEDED,
     ADD_PRODUCT_TO_CATALOG_FAILED,
     formdata,
     async ()=>await reloadAllData()(dispatch, getState),
     route
   )(dispatch, getState);
};

export const updateProductFromCatalog = (product: IProduct, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
  await simpleAsycnActionCreator(STRINGS.PUT, "apiConsumers", 'Product',
    STRINGS.appJson,
    UPDATE_PRODUCT_REQUESTED,
    UPDATE_PRODUCT_SUCCEEDED,
    UPDATE_PRODUCT_FAILED,
    {
      Product: {
        Id: product.id,
        Name: product.name,
        LocationsIds: product.locationIds,
        changeVersion: product.changeVersion,
        ProviderId: product.providerId
      },
      ImageFile: product.imageUrl
    },
    async ()=>await reloadAllData()(dispatch, getState),
    route
  )(dispatch, getState);
};

export const deleteProductFromCatalog = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {

  await simpleAsycnActionCreator(STRINGS.DELETE, "apiConsumers", `Product/${id}`,
    STRINGS.appJson,
    DELETE_PRODUCT_FROM_CATALOG_REQUESTED,
    DELETE_PRODUCT_FROM_CATALOG_SUCCEEDED,
    DELETE_PRODUCT_FROM_CATALOG_FAILED,
    { "Id": id },
    async ()=>await reloadAllData()(dispatch, getState),
    route
  )(dispatch, getState);
};
