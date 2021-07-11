import NavigationService from '../../../navigation/NavigationService';
import { LocationTypes, ILocation } from './types';
import { Dispatch } from 'redux';
import { ROUTES, TITLES } from '../../../constants';

const { CLEAR_LOCATION_ERROR, NAVIGATE } = LocationTypes;

export const navigateToCreateNewLocation = () => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(ROUTES.LocationCRUDScreen, {
    headerText: TITLES.newLocation
  });
};

export const navigateToEditLocation = (location: ILocation) => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(ROUTES.LocationCRUDScreen, { 
    headerText: TITLES.editLocation,
    location: JSON.stringify(location)
   });
};

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_LOCATION_ERROR });
  return NavigationService.navigateBack();
};
