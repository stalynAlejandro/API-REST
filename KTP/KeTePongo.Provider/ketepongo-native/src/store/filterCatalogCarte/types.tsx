import { IProviderCatalogProductsPayload } from "../providerCatalogProducts";
import { CatalogProductDTO, SectionDTO, ProviderCatalogProductsDTO } from "../../model/DTOs";

// ***** Types
export enum FilterCatalogCarteTypes {
  FILTER_CATALOGCARTE_REQUEST = 'FILTER_CATALOGCARTE_REQUEST',
  FILTER_CATALOGCARTE_SUCCESS = 'FILTER_CATALOGCARTE_SUCCESS',
  FILTER_CATALOGCARTE_RESPONSE = 'FILTER_CATALOGCARTE_RESPONSE',
  UPDATE_SELECTED_PRODUCTS = 'UPDATE_SELECTED_PRODUCTS',
  PROVIDER_CATALOG_PRODUCTS_UPDATED = 'PROVIDER_CATALOG_PRODUCTS_UPDATED',
  NAVIGATE = 'NAVIGATE',
  PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED = 'PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED',
  SEND_PRODUCT_CARTE_DISPLAY_ORDER_UPDATED = 'SEND_PRODUCT_CARTE_DISPLAY_ORDER_UPDATED',
  SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED = 'SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED'
};

// ***** Reducer
export interface ISearchCatalogCarte {
  keyword: string
}

export interface ISearchCatalog {
  keyword: string,
  selectedSections: number[],
  selectedAllergens: number[],
  selectedKindsOfFood : number[]
}

export interface IFilterCatalogCarteState {
  sections: SectionWithProducts[],
  search: ISearchCatalog,
  loading: boolean,
  isInitialized: boolean,
  productDisplayOrderChanging:ChangedDisplayOrder
  productDisplayOrderChanged:ChangedDisplayOrder,
  sectionsDisplayedOrderChanged: SectionsDisplayOrder
}
export interface ChangedDisplayOrder{
  productsChanged:ProductDictionary,
}
export interface ProductDictionary{
  [id: string] : CatalogProductDTO
}

export interface SectionsDisplayOrder{
  productsChanged:ProductDictionary,
}
export interface SectionDictionary{
  [id: string] : SectionDTO
}

export interface IFilterCatalogCarteActions {
  type: string,
  payload: IFilterCatalogCartePayload
}

export type IFilterCatalogCartePayload = (
  IFilterCatalogCarteState |
  IProviderCatalogProductsPayload |
  ICarteProductsPayload
)

export interface ICarteProductsPayload {
  providerCatalogProducts: ProviderCatalogProductsDTO;
}

// ***** Actions
export interface IFilterCatalogCarteData {
  keyword: string,
  sectionId: number
}

export interface SectionWithProducts{
  id: number;
  section: SectionDTO;
  data: CatalogProductDTO[];
}
