import { Dispatch } from "redux";
import {
  FilterCatalogCarteTypes,
  IFilterCatalogCarteData,
  IFilterCatalogCarteState,
  SectionWithProducts
} from "./types";
import NavigationService from "../../navigation/NavigationService";
import { ROUTES } from "../../constants";
import rootReducer from "..";
import { CatalogProductDTO, SectionDTO } from "../../model/DTOs";
import { sortByDisplayOrderAndName } from "../providerCatalogProducts/sections/reducers";

type AppState = ReturnType<typeof rootReducer>;

const {
  FILTER_CATALOGCARTE_REQUEST,
  FILTER_CATALOGCARTE_RESPONSE,
  FILTER_CATALOGCARTE_SUCCESS,
  PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED,
  SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED
} = FilterCatalogCarteTypes;

export const navigateToFilterCatalogCarte = () => (dispatch: Dispatch) => {
  dispatch({ type: "" });
  return NavigationService.navigate(ROUTES.ProductCarteCatalogFilterScreen);
};

export const navigateBackToCatalogCarte = () => (dispatch: Dispatch) => {
  dispatch({ type: "" });
  return NavigationService.navigateBack({});
};

export interface IFilterCatalogCartRequest {
  sectionsSelected: number[];
  allergensSelected: number[];
  kindsOfFoodSelected: number[];
  keyword: string | undefined;
}

const createDictionary = (array: Array<any>) => { //TODO move to generic place
  let dictionary = {};

  array.map((item) => {
    if (!dictionary[item.id]) {
      dictionary[item.id] = item;
    }
  });

  return dictionary;
};

const moveProductWithinSection = (data: any, section: any, to: number, isNewProductInSection: boolean, catalogProducts: CatalogProductDTO[]) => {
  let productsChanged = [];
  const productBelow = data[to + 1] && !data[to + 1].isSection ? data[to + 1] : null;
  const productAbove = data[to - 1] && !data[to - 1].isSection ? data[to - 1] : null;
  let displayOrder = productBelow ? productBelow.displayOrder : productAbove ? productAbove.displayOrder + 1 : 0;
  const previousDisplayOrder = data[to].displayOrder;
  data[to].displayOrder = displayOrder;

  if (displayOrder > previousDisplayOrder && !isNewProductInSection) {
    const previousProductInOrder = catalogProducts.find(x => x.sectionIds.some(k => k === section.id) && x.displayOrder === previousDisplayOrder - 1);
    let decrementOrder = previousDisplayOrder;
    if (previousProductInOrder) {
      const previousProductInOrderIndex = data.find(x => !x.isSection && x.id === previousProductInOrder.id);
      for (let index = to; index > previousProductInOrderIndex; index--) {
        data[index].displayOrder = decrementOrder;
        decrementOrder--;
        productsChanged.push(data[index]);
      }
    }
  }

  for (let index = to; index < data.length; index++) {
    if (data[index].isSection) {
      break;
    }
    data[index].displayOrder = displayOrder;
    productsChanged.push(data[index]);
    displayOrder++;
  }

  return productsChanged;
}

const moveProductToAnotherSection = (data: any, section: any, to: number, previousSectionId: number, catalogProducts: CatalogProductDTO[]) => {
  const displayOrder = data[to].displayOrder;
  const previousSectionProducts = catalogProducts.filter(x => x.sectionIds.some(k => k === previousSectionId) && x.displayOrder > displayOrder);

  previousSectionProducts.map(x => x.displayOrder == x.displayOrder - 1);
  let productsChanged = previousSectionProducts;

  productsChanged = [...productsChanged, ...moveProductWithinSection(data, section, to, true, catalogProducts)];
  return productsChanged;
}

export const updateProductPairDisplayOrderCarteFromCatalog = (data, to) => async (dispatch: Dispatch, getState: () => AppState) => {
  let section = {};
  let sectionIndex = 0;
  for (let index = to; index >= 0; index--) {
    if (data[index].isSection) {
      section = data[index];
      sectionIndex = index;
      break;
    }
  }
  const catalogProducts = getState().providerCatalogProducts.productsCarte.list;

  const hasToChangeSection = data[to].sectionIds[0] !== section.id;
  let productsChanged = [];
  if (hasToChangeSection) {
    let previousSectionId = data[to].sectionIds[0];
    data[to].sectionIds[0] = section.id ? section.id : -1;
    productsChanged = moveProductToAnotherSection(data, section, to, previousSectionId, catalogProducts);
  } else {
    productsChanged = moveProductWithinSection(data, section, to, false, catalogProducts);
  }
  createDictionary(productsChanged)

  
  dispatch({ type: PRODUCT_CARTE_PAIR_DISPLAY_ORDER_UPDATED, payload: productsChanged });
}

export const updateSectionPairDisplayOrderCarteFromCatalog = (data, to) => async (dispatch: Dispatch, getState: () => AppState) => {
  const sectionsChanged = moveSection(data, to);
  let sections = [...getState().filterCatalogCarte.sections];

  sectionsChanged.forEach(section => {
    var sectionIndex = sections.findIndex(x => x.id == section.id);
    sections[sectionIndex].section.displayOrder = section.displayOrder;
  });

  dispatch({ type: SECTION_CARTE_PAIR_DISPLAY_ORDER_UPDATED, payload: { sections, sectionsChanged } });
}

const moveSection = (data: SectionDTO[], to: number) => {
  let sectionsChanged = [];
  let displayOrder = to; 
  data[to].displayOrder = to;

  let decrementOrder = to - 1;
  for (let index = to - 1; index >= 0; index--) {
    data[index].displayOrder = decrementOrder;
    decrementOrder--;
    sectionsChanged.push(data[index]);
  }

  displayOrder++;
  for (let index = to + 1; index < data.length; index++) {
    data[index].displayOrder = displayOrder;
    sectionsChanged.push(data[index]);
    displayOrder++;
  }

  sectionsChanged.push(data[to])

  return sectionsChanged;
}

export const navigateToEditDisplayOrder = () => (dispatch: Dispatch) => {
  dispatch({ type: "NAVIGATE" });
  return NavigationService.navigate(ROUTES.DisplayOrderCatalogCarteScreen);
};

export const filterCatalogCartRequest = ({
  sectionsSelected,
  allergensSelected,
  kindsOfFoodSelected,
  keyword
}: IFilterCatalogCartRequest) => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch({ type: FILTER_CATALOGCARTE_REQUEST });
  let sections = Object.values([...getState().providerCatalogProducts.sections.list]);
  const catalogProducts = [...getState().providerCatalogProducts.productsCarte.list];
  const search = getState().filterCatalogCarte.search;

  keyword = keyword !== undefined ? keyword : search.keyword;
  keyword = keyword.toLowerCase();

  const hasToFilterByKeyword = keyword !== "";

  if (!hasToFilterByKeyword && sectionsSelected.length === 0 && allergensSelected.length === 0 && kindsOfFoodSelected.length === 0) {
    const payload: IFilterCatalogCarteState = {
      search: {
        ...search,
        keyword,
        selectedSections: [],
        selectedAllergens: [],
        selectedKindsOfFood: []
      },
      loading: true,
      sections: mapProductsToSectionWithProducts(sections, catalogProducts)
    };

    dispatch({ type: FILTER_CATALOGCARTE_RESPONSE, payload });
    // Delayed to show activity loader so better transition
    setTimeout(() => {
      dispatch({ type: FILTER_CATALOGCARTE_SUCCESS });
    }, 0);
    return;
  }

  let newSelectedSections: SectionWithProducts[] = [];
  sections = sectionsSelected.length > 0 ? sections.filter(x => sectionsSelected.some(k => k === x.id)) : sections;

  if (sectionsSelected.length === 0) {
    sections.push({ id: -1, section: { id: -1, name: "", displayOrder: -1, changeVersion: 0 } })
  }

  sections.map(section => {
    let productsToDisplay: CatalogProductDTO[];
    if (section.id === -1) {
      productsToDisplay = catalogProducts.filter(x => x.sectionIds.length === 0);
    } else {
      productsToDisplay = section.id !== 0 ? catalogProducts.filter(x => x.sectionIds.some(k => k === section.id)) : catalogProducts;
    }
    if (hasToFilterByKeyword && (sectionsSelected.length > 0 || allergensSelected.length === 0 || kindsOfFoodSelected.length === 0)) {
      productsToDisplay = productsToDisplay.filter(product =>
        filterProductByFiltersAndProductName(product, sectionsSelected, allergensSelected, kindsOfFoodSelected, keyword)
      );
    } else if (hasToFilterByKeyword) {
      productsToDisplay = productsToDisplay.filter(product =>
        filterProductByProductOrDescriptionName(product, keyword)
      );
    } else {
      productsToDisplay = productsToDisplay.filter(product =>
        filterProductByFilters(product, sectionsSelected, allergensSelected, kindsOfFoodSelected)
      );
    }
    if (productsToDisplay.length > 0) {
      newSelectedSections.push({
        id: section.id,
        section,
        data: productsToDisplay
      });
    }
  });

  newSelectedSections = newSelectedSections.sort(sortSectionsWithProducts);

  const payload: IFilterCatalogCarteState = {
    sections: newSelectedSections,
    loading: false,
    search: {
      ...search,
      keyword,
      selectedSections: sectionsSelected,
      selectedAllergens: allergensSelected,
      selectedKindsOfFood: kindsOfFoodSelected
    }
  };

  dispatch({ type: FILTER_CATALOGCARTE_RESPONSE, payload });
  // Delayed to show activity loader so better transition
  setTimeout(() => {
    dispatch({ type: FILTER_CATALOGCARTE_SUCCESS });
  }, 0);
};

export const filterCatalogCarteRequestByKeyword = (keyword: string) => async (dispatch: Dispatch, getState: () => AppState) => {
  const search = getState().filterCatalogCarte.search;
  filterCatalogCartRequest({
    sectionsSelected: search.selectedSections,
    allergensSelected: search.selectedAllergens,
    kindsOfFoodSelected: search.selectedKindsOfFood,
    keyword
  }
  )(dispatch, getState);
};

export function mapProductsToSectionWithProducts(
  sections: SectionDTO[],
  catalogProducts: CatalogProductDTO[]
): SectionWithProducts[] {
  let items: SectionWithProducts[] = [];
  sections.map(section =>
    items.push({
      id: section.id,
      section,
      data: catalogProducts.filter(x => x.sectionIds.some(k => k === section.id))
    })
  );

  items.push({
    id: -1,
    section: { id: -1, name: "", displayOrder: -1, changeVersion: 0 },
    data: catalogProducts.filter(x => x.sectionIds.length === 0)
  });
  items = items.sort(sortSectionsWithProducts);
  return items;
}

function filterProductByFiltersAndProductName(
  product: CatalogProductDTO,
  sectionIds: number[],
  allergensSelected: number[],
  kindsOfFoodSelected: number[],
  keyword: string
) {
  return (
    filterProductByFilters(product, sectionIds, allergensSelected, kindsOfFoodSelected) && filterProductByProductOrDescriptionName(product, keyword)
  );
}

function filterProductByFilters(product: CatalogProductDTO, sectionIds: number[], allergensSelected: number[], kindsOfFoodSelected: number[]) {
  return filterProductBySection(product, sectionIds) && filterByAllergens(product, allergensSelected) && filterByKindsOfFood(product, kindsOfFoodSelected);
}

function filterProductByProductOrDescriptionName(product: CatalogProductDTO, keyword: string, ) {
  return product.name.toLowerCase().indexOf(keyword) > -1 || product.description.toLowerCase().indexOf(keyword) > -1;
}

function filterByKindsOfFood(product: CatalogProductDTO, kindsOfFoodSelected: number[]) {
  if (kindsOfFoodSelected.length === 0) {
    return true;
  }
  if (kindsOfFoodSelected.length === 2) {
    return product.isVegan && product.isHiddenInCarte;
  }
  if (kindsOfFoodSelected[0] === 0) {
    return product.isVegan;
  }
  if (kindsOfFoodSelected[0] === 1) {
    return product.isHiddenInCarte;
  }
  return false;
}

function filterByAllergens(product: CatalogProductDTO, allergens: number[]) {
  return allergens.length === 0 || product.allergenIds.some(x => allergens.includes(x));
}

function filterProductBySection(product: CatalogProductDTO, sectionIds: number[]) {
  return sectionIds.length === 0 || product.sectionIds.some(x => sectionIds.includes(x));
}
export function sortSectionsWithProducts(a: SectionWithProducts, b: SectionWithProducts) {
  const greaterDisplayOrderSort = a.section.displayOrder - b.section.displayOrder;
  return greaterDisplayOrderSort === 0 ? a.section.name.localeCompare(b.section.name) : greaterDisplayOrderSort;
};

