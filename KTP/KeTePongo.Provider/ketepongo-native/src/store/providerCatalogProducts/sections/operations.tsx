import {
  SectionTypes,
  ISection
} from './types';
import { STRINGS, ROUTES } from '../../../constants';
import { simpleAsycnActionCreator } from '../../actionCreatorMethods';
import { Dispatch } from "redux";
import { reloadAllData } from '../productsCarte';
import rootReducer from 'store';
type AppState = ReturnType<typeof rootReducer>
const {
  ADD_SECTION_REQUESTED,
  ADD_SECTION_SUCCEEDED,
  ADD_SECTION_FAILED,
  UPDATE_SECTION_REQUESTED,
  UPDATE_SECTION_SUCCEEDED,
  UPDATE_SECTION_FAILED,
  DELETE_SECTION_REQUESTED,
  DELETE_SECTION_SUCCEEDED,
  DELETE_SECTION_FAILED,
} = SectionTypes;
// export const deleteProductCarteFromCatalog = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
export const addSectionRequested = (name: string, nextDisplayOrderSugested:number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
  return await simpleAsycnActionCreator(STRINGS.POST, "apiProviders", 'Section',
    STRINGS.appJson,
    ADD_SECTION_REQUESTED,
    ADD_SECTION_SUCCEEDED,
    ADD_SECTION_FAILED,
    { "Name": name ,
      "DisplayOrder": nextDisplayOrderSugested
    },
    null,
    route
  )(dispatch, getState);
};

export const updateSectionRequested = (section: ISection, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {
  return await simpleAsycnActionCreator(STRINGS.PUT, "apiProviders", 'Section',
    STRINGS.appJson,
    UPDATE_SECTION_REQUESTED,
    UPDATE_SECTION_SUCCEEDED,
    UPDATE_SECTION_FAILED,
    section,
    null,
    route
  )(dispatch, getState);
};

export const deleteSectionRequested = (id: number, route = ROUTES.NavigateBack) => async (dispatch: Dispatch, getState: () => AppState) => {

  return await simpleAsycnActionCreator(STRINGS.DELETE, "apiProviders", `Section/${id}`,
    STRINGS.appJson,
    DELETE_SECTION_REQUESTED,
    DELETE_SECTION_SUCCEEDED,
    DELETE_SECTION_FAILED,
    { "Id": id },
    null,
    route
  )(dispatch, getState);

};
