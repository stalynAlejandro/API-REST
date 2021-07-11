
import {
  navigateToClientsOrders,
  navigateToClientProducts,
  navigateToClientsScreen
} from '../clients';

export const linkClientRequested = ({ client, linkClientCallBack }) => (dispatch) => {
  // @TODO - call server and update list
  // @TODO - dispatch reducer update
  linkClientCallBack(client);
  dispatch(navigateToClientsScreen());
};

export const inspectClientOrdersRequested = (client) => (dispatch) => {
  // @TODO - call server and pull order info
  // @TODO - dispatch to reducer and save

  dispatch(navigateToClientsOrders());
}; 

export const inspectClientProductsRequested = (client) => (dispatch) => {
    // @TODO - call server and pull product info
  // @TODO - dispatch to reducer and save

  dispatch(navigateToClientProducts());
};