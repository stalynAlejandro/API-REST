import { 
  FilterOrderTypes,
  IFilterOrderState,
  IFilterOrderActions,
} from './types';
import { OrderTypes } from '../order';

const { ADD_PRODUCT_TO_ORDER_REQUEST } = OrderTypes;
const {
  LOAD_FILTER_ORDER,
  FILTER_ORDER_REQUEST,
  FILTER_ORDER_SUCCESS,
  FILTER_ORDER_RESPONSE,
} = FilterOrderTypes;

const initialState: IFilterOrderState = {
  products: [],
  loading: false
};

const filterOrder = (state = initialState, action: IFilterOrderActions) => {
  switch (action.type) {
    case LOAD_FILTER_ORDER:
      return {
        ...state,
        products: action.payload
      }
    case FILTER_ORDER_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FILTER_ORDER_SUCCESS:
      return {
        ...state,
        loading: true
      }
    case FILTER_ORDER_RESPONSE:
      return {
        ...state,
        products: action.payload
      };
    case ADD_PRODUCT_TO_ORDER_REQUEST:
      // let products = state.products.map((item) => {
      //   if (item.product.id === action.payload.id) {
      //     item.quantity += 1;
      //   }
      //   return item;
      // })
      return {
        ...state,
        // products
      }
    default:
      return state;
  }
}

export default filterOrder;