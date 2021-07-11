import { FilterOrderTypes, IFilterOrderRquestData } from './types';
import { Dispatch } from 'redux';
import { filterProvidersByWeekdays, filterProductByProvider } from '../filterCatalog';
import { sortAlphabetically } from '../consumption';
import { STRINGS } from '../../constants';
import { IProduct } from '../consumption/products';
import rootReducer from '..';

type AppState = ReturnType<typeof rootReducer>

const {
  LOAD_FILTER_ORDER,
  FILTER_ORDER_REQUEST,
  FILTER_ORDER_RESPONSE,
  FILTER_ORDER_SUCCESS,
} = FilterOrderTypes;

export const loadFilterOrder = (cb: () => void) => (dispatch: Dispatch, getState: () => AppState) => {
  const { list } = getState().order;
  const orderedProducts = sortAlphabetically(Object.values(list), STRINGS.name);
  dispatch({ type: LOAD_FILTER_ORDER, payload: orderedProducts });

  if (cb) {
    cb();
  }
}

export const filterOrderRequest = ({
  locationId, 
  providerId, 
  weekdays
  }: IFilterOrderRquestData) => async (dispatch: Dispatch, getState: () => AppState) => {
  try {
    dispatch({ type: FILTER_ORDER_REQUEST });

    const { list } = await getState().order;
    const providers = await getState().consumption.providers.list;
    const selectedProviders = await filterProvidersByWeekdays(providers, weekdays);

    if (locationId === -1 && providerId === -1 && weekdays.length === 7) {
      const orderedProducts = sortAlphabetically(Object.values(list), STRINGS.name);
      dispatch({ type: FILTER_ORDER_RESPONSE, payload: orderedProducts });
      // Delayed to show activity loader so better transition
      setTimeout(() => {
        dispatch({ type: FILTER_ORDER_SUCCESS });
      }, 0)
      return;
    }

    let filteredProducts: IProduct[] = [];
    Object.keys(list)
      .map((key) => {
        const product = list[key].product;
        const { locationIds } = product;

        if (locationId === -1 && providerId === -1) {
          return filteredProducts.push(list[key]);
        }

        if (locationIds.includes(locationId) ||
          providerId === product.providerId) {
          return filteredProducts.push(list[key]);
        }
      })

    filteredProducts = await filterProductByProvider(filteredProducts, selectedProviders);
    const orderedProducts = sortAlphabetically(Object.values(filteredProducts), STRINGS.name);
    dispatch({ type: FILTER_ORDER_RESPONSE, payload: orderedProducts });
    // Delayed to show activity loader so better transition
    setTimeout(() => {
      dispatch({ type: FILTER_ORDER_SUCCESS });
    }, 0);

  } catch (err) {
    return err;
  }
}