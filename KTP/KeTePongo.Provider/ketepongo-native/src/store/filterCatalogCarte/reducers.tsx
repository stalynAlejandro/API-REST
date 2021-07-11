
import { ProductCarteTypes } from '../providerCatalogProducts/productsCarte';
import { SectionTypes } from '../providerCatalogProducts/sections';
import { CatalogProductDTO, SectionDTO } from "model/DTOs";

import {
  IFilterCatalogCarteState,
  IFilterCatalogCarteActions,
  FilterCatalogCarteTypes,
  ICarteProductsPayload,
  ChangedDisplayOrder
} from './types';

import { mapProductsToSectionWithProducts } from "./actions";
import { sortSectionsWithProducts } from "./actions";
import { sortByDisplayOrderAndName } from '../providerCatalogProducts/sections/reducers';


const {
  FILTER_CATALOGCARTE_REQUEST,
  FILTER_CATALOGCARTE_RESPONSE,
  FILTER_CATALOGCARTE_SUCCESS,
  PROVIDER_CATALOG_PRODUCTS_UPDATED,
  PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED,
  SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED,
} = FilterCatalogCarteTypes;

const {
  UPDATE_PRODUCTCARTE_SUCCEEDED,
  ADD_PRODUCTCARTE_TO_CATALOG_SUCCEEDED,
  DELETE_PRODUCTCARTE_FROM_CATALOG_SUCCEEDED,
  UPDATE_PRODUCTCARTE_DISPLAY_ORDER_SUCCEEDED
} = ProductCarteTypes;
 
const {
  ADD_SECTION_SUCCEEDED,
  UPDATE_SECTION_SUCCEEDED,
  DELETE_SECTION_SUCCEEDED
} = SectionTypes

const initialState: IFilterCatalogCarteState = {
  search: {
    keyword: '',
    selectedSections: [],
    selectedAllergens: [],
    selectedKindsOfFood: []
  },
  loading: false,
  sections: [],
  isInitialized: false,
  productDisplayOrderChanged: {},
  sectionsDisplayedOrderChanged: {}
};

const filterCatalogCarteReducer = (state = initialState, action: IFilterCatalogCarteActions): IFilterCatalogCarteState => {
  switch (action.type) {
    case PROVIDER_CATALOG_PRODUCTS_UPDATED:
      const providerCatalogProductsUpdated = action.payload as ICarteProductsPayload;
      return {
        ...state,
        sections: providerCatalogProductsUpdated.providerCatalogProducts ? mapProductsToSectionWithProducts(providerCatalogProductsUpdated.providerCatalogProducts.sections,
          providerCatalogProductsUpdated.providerCatalogProducts.catalogProducts) : [],
        loading: false,
        search: { ...state.search, selectedSections: state.search.selectedSections.filter(x => providerCatalogProductsUpdated.providerCatalogProducts.sections.some(k => k.id === x)) },
        isInitialized: true
      };
    case FILTER_CATALOGCARTE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FILTER_CATALOGCARTE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case FILTER_CATALOGCARTE_RESPONSE:
      return {
        ...state,
        ...action.payload,
      };
    case UPDATE_PRODUCTCARTE_SUCCEEDED:
      return updateProductCarteToDisplayedSections(state, action.payload)
    case DELETE_PRODUCTCARTE_FROM_CATALOG_SUCCEEDED:
      return removeProductCarteToDisplayedSections(state, action.payload)
    case ADD_PRODUCTCARTE_TO_CATALOG_SUCCEEDED:
      return addNewProductCarteToDisplayedSections(state, action.payload)
    case ADD_SECTION_SUCCEEDED:
      return addNewSectionToDisplayedSections(state, action.payload);
    case UPDATE_SECTION_SUCCEEDED:
      return updateSectionInDisplaySections(state, action.payload);
    case DELETE_SECTION_SUCCEEDED:
      return removeSectionFromDisplayedSections(state, action.payload);
    case PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED:
      return updateProductPairCarteToDisplayedSections(state, action.payload);
    case SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED:
      return {
        ...state,
        sections: action.payload.sections.sort(sortSectionsWithProducts),
        sectionsDisplayedOrderChanged: action.payload.sectionsChanged.filter(x=>x.id>0)
      }
    case UPDATE_PRODUCTCARTE_DISPLAY_ORDER_SUCCEEDED:
      return{
        ...state,
        productDisplayOrderChanged: {},
        sectionsDisplayedOrderChanged: {}
      }
    default:
      return state
  }
};

function addNewSectionToDisplayedSections(state: IFilterCatalogCarteState, section: SectionDTO): IFilterCatalogCarteState {
  if (state.search.selectedSections.length > 0) {
    return state
  }

  let sections = [...state.sections];

  sections.push({
    id: section.id,
    section: section,
    data: []
  })

  sections = sections.sort(sortSectionsWithProducts)
  return {
    ...state,
    sections
  }
}

function updateSectionInDisplaySections(state: IFilterCatalogCarteState, section: SectionDTO): IFilterCatalogCarteState {
  let sections = [...state.sections];

  const oldSectionIndex = sections.findIndex(x => x.id === section.id);
  if (oldSectionIndex > -1) {
    sections[oldSectionIndex].section = section;
  }

  sections = sections.sort(sortSectionsWithProducts)
  return {
    ...state,
    sections
  }
}

function removeSectionFromDisplayedSections(state: IFilterCatalogCarteState, id: number): IFilterCatalogCarteState {
  let sections = [...state.sections];
  let search = { ...state.search }

  const oldSection = sections.find(x => x.id === id);
  const productsWithoutSection = sections.find(x => x.id === -1);

  if (oldSection && productsWithoutSection) {
    productsWithoutSection.data = [...productsWithoutSection.data, ...oldSection.data.filter(x => x.sectionIds.length === 1)];
  }
  sections = sections.filter(x => x.id !== id);
  return {
    ...state,
    sections,
    search: {
      ...search,
      selectedSections: search.selectedSections.filter(x => x !== id)
    }
  }
}



function addNewProductCarteToDisplayedSections(state: IFilterCatalogCarteState, product: CatalogProductDTO): IFilterCatalogCarteState {
  let sections = [...state.sections];

  sections.filter(x => product.sectionIds.some(k => k === x.id) || (x.id === -1 &&
    product.sectionIds.length === 0)).forEach(section => section.data.push(product));

  return {
    ...state,
    sections
  }
}

function removeProductCarteToDisplayedSections(state: IFilterCatalogCarteState, id: number): IFilterCatalogCarteState {
  let sections = [...state.sections];
  sections.forEach(x => x.data = x.data.filter(k => id !== k.id));

  return {
    ...state,
    sections
  }
}

function updateProductCarteToDisplayedSections(state: IFilterCatalogCarteState, product: CatalogProductDTO): IFilterCatalogCarteState {
  let sections = [...state.sections];

  if (!(sections.some(x => x.data.some(x => x.id === product.id)))) {
    return {
      ...state
    }
  }

  const keyword = state.search.keyword;
  if(keyword && keyword.length> 0  && product.name.toLowerCase().indexOf(keyword) === -1 && product.description.toLowerCase().indexOf(keyword) === -1){
    sections.map(x=> x.data = x.data.filter(x => x.id !== product.id));
    return{
      ...state,
      sections
    }
  }
  sections.map(x => x.data = x.data.filter(x => x.id !== product.id));
  sections.filter(x => product.sectionIds.some(k => k === x.id) || (x.id === -1 && product.sectionIds.length === 0) || x.id === 0)
    .map(x => x.data.push(product))
    sections.forEach(s=>s.data = sortByDisplayOrderAndName(s.data));
  return {
    ...state,
    sections
  }

}
const sortAlphabetically = (array: Array<any>, type: string) => {
  let nameA: string;
  let nameB: string;
  return array.sort((a, b) => {
    nameA = String(a[type]).toUpperCase();
    nameB = String(b[type]).toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
};
function updateProductPairCarteToDisplayedSections(state: IFilterCatalogCarteState, productDisplayOrderChanging: ChangedDisplayOrder): IFilterCatalogCarteState {
  let sections = [...state.sections];


  var products = Object.values(productDisplayOrderChanging);
  products.forEach(product => {
    sections.map(x => x.data = x.data.filter(x => x.id !== product.id || (x.id === -1 && product.sectionIds.length === 0)));
    sections.filter(x => product.sectionIds.some(k => k === x.id) || (x.id === -1 && product.sectionIds.length === 0))
      .map(x => x.data.push(product))
  });

  let productDisplayOrderChanged = state.productDisplayOrderChanged;
  Object.keys(productDisplayOrderChanging).forEach(productId => {
    productDisplayOrderChanged[productId] = productDisplayOrderChanging[productId];
    productDisplayOrderChanged[productId].sectionIds = productDisplayOrderChanging[productId].sectionIds[0] == -1 ? [] : productDisplayOrderChanging[productId].sectionIds;
  });

  sections.forEach(s=>s.data= sortByDisplayOrderAndName(s.data));
  return {
    ...state,
    sections,
    productDisplayOrderChanged
  }
}

function getDisplayedSectionsForProduct(state: IFilterCatalogCarteState, product: CatalogProductDTO) {
  const selectedSections = [...state.search.selectedSections];
  let sections = [...state.sections];
  return selectedSections.length > 0 ? sections.filter(x => product.sectionIds.some(k => k === x.id) && selectedSections.some(k => k === x.id)) :
    sections;
}

function updateProductInArray(catalogProducts: CatalogProductDTO[], product: CatalogProductDTO) {
  const index = catalogProducts.findIndex(x => x.id === product.id);
  catalogProducts[index] = product;
  return catalogProducts;
}

export default filterCatalogCarteReducer;
