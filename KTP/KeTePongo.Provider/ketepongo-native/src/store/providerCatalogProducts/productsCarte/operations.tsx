import {
  ProductCarteTypes
} from './types';
import NavigationService from '../../../navigation/NavigationService';
import { STRINGS, ROUTES } from '../../../constants';
import { simpleAsycnActionCreator } from '../../actionCreatorMethods';
import { Dispatch } from "redux";
import { reloadAllData } from './actions'
import rootReducer from '../..';
import { CatalogProductDTO } from "../../../model/DTOs";
import { addError } from "./../actions";
import { reloadAllDataRequested } from '../';
import { navigateToCatalogCarte } from "../../authentication";

type AppState = ReturnType<typeof rootReducer>

const {
  ADD_PRODUCTCARTE_TO_CATALOG_REQUESTED,
  ADD_PRODUCTCARTE_TO_CATALOG_SUCCEEDED,
  ADD_PRODUCTCARTE_TO_CATALOG_FAILED,
  UPDATE_PRODUCTCARTE_REQUESTED,
  UPDATE_PRODUCTCARTE_SUCCEEDED,
  UPDATE_PRODUCTCARTE_FAILED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_REQUESTED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_SUCCEEDED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_FAILED,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_SUCCEEDED,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_REQUESTED,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_FAILED
} = ProductCarteTypes;


export const addProductCarteToCatalog = (productCarte: CatalogProductDTO, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
  let displayOrder = 0;
  let productsInSection = [];
  if (productCarte.sectionIds && productCarte.sectionIds.length > 0) {
    productsInSection = getState().providerCatalogProducts.productsCarte?.list.filter((pro) => pro.sectionIds[0] === productCarte.sectionIds[0]);
  } else {
    productsInSection = getState().providerCatalogProducts.productsCarte?.list.filter((pro) => pro.sectionIds.length === 0);
  }
  if (productsInSection.length > 0) {
    displayOrder = Math.max(...productsInSection.map(p => p.displayOrder)) + 1;
  }
  const productToSend = {
    Name: productCarte.name,
    Description: productCarte.description,
    SectionIds: productCarte.sectionIds,
    PVP: productCarte.pvp,
    isVegan: productCarte.isVegan,
    allergenIds: productCarte.allergenIds,
    displayOrder: displayOrder,
    isHiddenInCarte: productCarte.isHiddenInCarte
  };

  await simpleAsycnActionCreator(STRINGS.POST, "apiProviders", 'CatalogProduct',
    STRINGS.appJson,
    ADD_PRODUCTCARTE_TO_CATALOG_REQUESTED,
    ADD_PRODUCTCARTE_TO_CATALOG_SUCCEEDED,
    ADD_PRODUCTCARTE_TO_CATALOG_FAILED,
    productToSend,
    async () => await reloadAllData()(dispatch, getState),
    route
  )(dispatch, getState);
};

export const updateProductCarteFromCatalog = (productCarte: CatalogProductDTO, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
  await simpleAsycnActionCreator(STRINGS.PUT, "apiProviders", 'CatalogProduct',
    STRINGS.appJson,
    UPDATE_PRODUCTCARTE_REQUESTED,
    UPDATE_PRODUCTCARTE_SUCCEEDED,
    UPDATE_PRODUCTCARTE_FAILED,
    {
      Id: productCarte.id,
      Name: productCarte.name,
      Description: productCarte.description,
      SectionIds: productCarte.sectionIds,
      PVP: productCarte.pvp,
      changeVersion: productCarte.changeVersion,
      isVegan: productCarte.isVegan,
      allergenIds: productCarte.allergenIds,
      displayOrder: productCarte.displayOrder,
      isHiddenInCarte: productCarte.isHiddenInCarte
    },
    async () => await reloadAllData()(dispatch, getState),
    route
  )(dispatch, getState);
};

export const sendProductDisplayOrderUpdate = () => async (dispatch: Dispatch, getState: () => AppState) => {
  let productsChanged = getState().filterCatalogCarte.productDisplayOrderChanged;
  let sectionsChanged = getState().filterCatalogCarte.sectionsDisplayedOrderChanged

  let operations = Object.values(productsChanged).map(obj => (
    {
      DTOTypeName: "UpdateCatalogProductDTO",
      DTO: JSON.stringify(obj)
    })
  )

  let sectionsOperations = Object.values(sectionsChanged).map(obj => (
    {
      DTOTypeName: "UpdateSectionDTO",
      DTO: JSON.stringify(obj)
    })
  )

  operations = [...operations, ...sectionsOperations];

  if (operations.length === 0) {
    navigateToCatalogCarte()(dispatch);
    return;
  }


  await simpleAsycnActionCreator(STRINGS.POST, "apiProviders", 'CatalogBulkChanges',
    STRINGS.appJson,
    UPDATE_PRODUCTCARTE_DISPLAY_ORDER_REQUESTED,
    UPDATE_PRODUCTCARTE_DISPLAY_ORDER_SUCCEEDED,
    UPDATE_PRODUCTCARTE_DISPLAY_ORDER_FAILED,
    {
      operations
    },
    async () => {
      await reloadAllData()(dispatch, getState)
      navigateToCatalogCarte()(dispatch);
    },
    null
  )(dispatch, getState);
};
export const cancelSendProductDisplayOrderUpdate = () => async (dispatch: Dispatch, getState: () => AppState) => {

  // async ()=>{ 
  await reloadAllDataRequested()(dispatch, getState);
  dispatch({ type: "EDIT_DISPLAY_ORDER_MODE_DISABLED" })
  // }
};

export const deleteProductCarteFromCatalog = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {

  await simpleAsycnActionCreator(STRINGS.DELETE, "apiProviders", `CatalogProduct/${id}`,
    STRINGS.appJson,
    DELETE_PRODUCTCARTE_FROM_CATALOG_REQUESTED,
    DELETE_PRODUCTCARTE_FROM_CATALOG_SUCCEEDED,
    DELETE_PRODUCTCARTE_FROM_CATALOG_FAILED,
    { "Id": id },
    async () => {
      await reloadAllData()(dispatch, getState);
    },
    route
  )(dispatch, getState);
};
