import NavigationService from '../../navigation/NavigationService';
import { ROUTES } from 'constants';

export const navigateToCatalog = () => (dispatch) => {
  dispatch({ type: "" });
  return NavigationService.navigate(ROUTES.ProductCatalogScreen);
};

export const navigateBack = () => (dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigateBack();
};

export const navigateToEditEmployee = (employee) => (dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigate(ROUTES.EmployeeCRUDScreen, {
    employee: JSON.stringify(employee)
  });
};

export const navigateToCreateEmployee = () => (dispatch) => {
  dispatch({ type: '' });
  return NavigationService.navigate(ROUTES.EmployeeCRUDScreen);
};
