import { IProviderCatalogProductsPayload } from '../types';
import {SectionDTO} from "model/DTOs";
import {ErrorDetail} from "store";
// ***** types
export enum SectionTypes {
  ADD_SECTION_REQUESTED = 'ADD_SECTION_REQUESTED',
  ADD_SECTION_SUCCEEDED = 'ADD_SECTION_SUCCEEDED',
  ADD_SECTION_FAILED = 'ADD_SECTION_FAILED',
  DELETE_SECTION_REQUESTED = 'DELETE_SECTION_REQUESTED',
  DELETE_SECTION_SUCCEEDED = 'DELETE_SECTION_SUCCEEDED',
  DELETE_SECTION_FAILED = 'DELETE_SECTION_FAILED',
  UPDATE_SECTION_REQUESTED = 'UPDATE_SECTION_REQUESTED',
  UPDATE_SECTION_SUCCEEDED = 'UPDATE_SECTION_SUCCEEDED',
  UPDATE_SECTION_FAILED = 'UPDATE_SECTION_FAILED',
  CLEAR_SECTION_ERROR = 'CLEAR_SECTION_ERROR',
  NAVIGATE = 'NAVIGATE'
};

// ***** Reducer
export interface ISectionsState {
  list: SectionDTO[],
  dictionary: ISectionHash,
  loading: boolean,
  error: ErrorDetail | null
}

export interface ISectionAction {
  type: string,
  payload: ISectionPayload
}

export type ISectionPayload = (
  IProviderCatalogProductsPayload |
  SectionDTO |
  INewSection |
  ISectionError |
  number
)

export interface ISection {
  changeVersion: number,
  id: number,
  displayOrder:number,
  [name: string] : string | number
}

export interface IIndexSection {
  [name: string]: SectionDTO
}

export interface INewSection {
  displayOrder:number,
  name:string,
  [name: string] : string|number
}

export interface ISectionError {
  error: string
}

export interface ISectionHash {
  [details: string] : SectionDTO
}
