import { Dispatch } from 'redux';
import { FilterCatalogTypes, IFilterCatalogData } from './types';
import NavigationService from '../../navigation/NavigationService';
import { ROUTES } from '../../constants';
import { IProduct } from '../consumption/products';
import { IProvider } from '../consumption/providers';
import rootReducer from '..';

type AppState = ReturnType<typeof rootReducer>

const {
  FILTER_CATALOG_REQUEST,
  FILTER_CATALOG_RESPONSE,
  FILTER_CATALOG_SUCCESS
} = FilterCatalogTypes;

export const navigateToFilterCatalog = () => (dispatch: Dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigate(ROUTES.ProductCatalogFilterScreen);
};

export const navigateBackToCatalog = () => (dispatch: Dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigateBack({});
};

export const filterCatalogRequest = ({
  keyword,
  locationId,
  providerId,
  weekdays
}: IFilterCatalogData) => async (dispatch: Dispatch, getState: () => AppState) => {
  dispatch({ type: FILTER_CATALOG_REQUEST });

  const products = getState().consumption.products.list;
  const providers = getState().consumption.providers.list;
  const search = getState().filterCatalog.search;
  locationId = locationId ? locationId : search.locationId;
  keyword = keyword === '' ? '' : !keyword ? search.keyword : keyword;
  keyword = keyword.toLowerCase();
  providerId = providerId ? providerId : search.providerId;
  weekdays = weekdays ? weekdays : search.weekdays;
  let selectedProviders;

  try {
    selectedProviders = filterProvidersByWeekdays(providers, weekdays);
  } catch (err) {
    return err;
  }

  if (locationId === -1 && keyword === '' && providerId === -1 && weekdays[0] === -1) {
    const payload = {
      products,
      search: {
        keyword,
        providerId,
        locationId,
        weekdays
      }
    };

    dispatch({ type: FILTER_CATALOG_RESPONSE, payload });

    // Delayed to show activity loader so better transition
    setTimeout(() => {
      dispatch({ type: FILTER_CATALOG_SUCCESS });
    }, 0);
    return;
  }

  let filteredProducts: IProduct[] = [];
  products.map((prod: IProduct) => {
    const { name, locationIds } = prod;
    let productName = String(name).toLowerCase();

    if (productName.indexOf(keyword) > -1 &&
      locationId === -1 && providerId === -1) {
      return filteredProducts.push(prod);
    }

    if (locationId !== -1 && providerId !== -1) {
      if (productName.indexOf(keyword) > -1 &&
        locationIds.includes(locationId) &&
        providerId === prod.providerId) {
        return filteredProducts.push(prod);
      }
    }

    if (locationId !== -1 && providerId === -1) {
      if (productName.indexOf(keyword) > -1 &&
        locationIds.includes(locationId)) {
        return filteredProducts.push(prod);
      }
    }

    if (locationId === -1 && providerId !== -1) {
      if (productName.indexOf(keyword) > -1 &&
        providerId === prod.providerId) {
        return filteredProducts.push(prod);
      }
    }
  });

  filteredProducts = filterProductByProvider(filteredProducts, selectedProviders);
  const payload = {
    products: filteredProducts,
    search: {
      keyword,
      providerId,
      locationId,
      weekdays
    }
  };

  dispatch({ type: FILTER_CATALOG_RESPONSE, payload });
  // Delayed to show activity loader so better transition
  setTimeout(() => {
    dispatch({ type: FILTER_CATALOG_SUCCESS });
  }, 0);
};

function filterProvidersByWeekdays(providers: IProvider[], week: number[]) {
  let selectedProviders: IProvider[] = [];

  providers.map((provider: IProvider) => {
    for (let i = 0; i < week.length; i++) {
      if (week[i] === -1 && !selectedProviders.includes(provider)) {
        selectedProviders.push(provider);
        break;
      }
      if (provider.orderWeekDays.length === 0) {
        selectedProviders.push(provider);
        break;
      }
      if (provider.orderWeekDays.includes(week[i]) && !selectedProviders.includes(provider)) {
        selectedProviders.push(provider);
        break;
      }
    }
  });

  return selectedProviders;
}

function filterProductByProvider(products: any[], selectedProviders: IProvider[]) {
  let filteredProducts: IProduct[] = [];

  products.map((item) => {
    let checkItem = item.product ? item.product : item;
    for (let j = 0; j < selectedProviders.length; j++) {
      if (checkItem.providerId === selectedProviders[j] && !filteredProducts[item.id]) {
        filteredProducts.push(item);
        break;
      }
    }
  });

  return filteredProducts;
}

export {
  filterProvidersByWeekdays,
  filterProductByProvider
};