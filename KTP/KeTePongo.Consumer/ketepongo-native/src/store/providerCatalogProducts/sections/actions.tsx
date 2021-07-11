import NavigationService from '../../../navigation/NavigationService';
import { SectionTypes, ISection } from './types';
import { Dispatch } from 'redux';
import { ROUTES, TITLES } from '../../../constants';

const { CLEAR_SECTION_ERROR, NAVIGATE } = SectionTypes;

export const navigateToCreateNewSection = (nextDisplayOrderSugested:number) => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(ROUTES.SectionCRUDScreen, {
    headerText: TITLES.newSection,
    nextDisplayOrderSugested: nextDisplayOrderSugested
  });
};

export const navigateToEditSection = (section: ISection) => (dispatch: Dispatch) => {
  dispatch({ type: NAVIGATE });
  return NavigationService.navigate(ROUTES.SectionCRUDScreen, { 
    headerText: TITLES.editSection,
    section: JSON.stringify(section)
   });
};

export const navigateBack = () => (dispatch: Dispatch) => {
  dispatch({ type: CLEAR_SECTION_ERROR });
  return NavigationService.navigateBack();
};
