import { actionTypes } from '../action-types';

// ***** App Data Action *****

interface SetAppDataAction {
  type: actionTypes.SET_APP_DATA__START;
}

interface SetAppDataActionSuccess {
  type: actionTypes.SET_APP_DATA__SUCCESS;
  payload: object | null;
}

interface SetAppDataActionFailure {
  type: actionTypes.SET_APP_DATA__FAIL;
  payload: object | string | null;
}

export type AppDataAction =
  | SetAppDataAction
  | SetAppDataActionSuccess
  | SetAppDataActionFailure;

// ***** Position Action *****

interface SetPositionAction {
  type: actionTypes.SET_POSITION__START;
}

interface SetPositionActionSuccess {
  type: actionTypes.SET_POSITION__SUCCESS;
  payload: object | null;
}

interface SetPositionActionFailure {
  type: actionTypes.SET_POSITION__FAIL;
  payload: object | string | null;
}

export type PositionAction =
  | SetPositionAction
  | SetPositionActionSuccess
  | SetPositionActionFailure;

// ***** Filters Token  Actions *****

interface SetFiltersTokenAction {
  type: actionTypes.ADD_FILTER;
  payload: object | never;
}

interface ClearFiltersTokenAction {
  type: actionTypes.CLEAR_FILTERS;
  payload: Array<any> | null;
}
export type FiltersAction = SetFiltersTokenAction | ClearFiltersTokenAction;

// ***** Addresses Data Action *****
interface SetAddressDataAction {
  type: actionTypes.SET_ADDRESS_DATA__START;
}

interface SetAddressDataActionSuccess {
  type: actionTypes.SET_ADDRESS_DATA__SUCCESS;
  payload: object | null;
}

interface SetAddressDataActionFailure {
  type: actionTypes.SET_ADDRESS_DATA__FAIL;
  payload: object | string | null;
}

export type AddressesDataAction =
  | SetAddressDataAction
  | SetAddressDataActionSuccess
  | SetAddressDataActionFailure;

// ***** Sourcify Data Action *****
interface SetSourcifyDataAction {
  type: actionTypes.SET_SOURCIFY_DATA__START;
}

interface SetSourcifyDataActionSuccess {
  type: actionTypes.SET_SOURCIFY_DATA__SUCCESS;
  payload: object | null;
}

interface SetSourcifyDataActionFailure {
  type: actionTypes.SET_SOURCIFY_DATA__FAIL;
  payload: object | string | null;
}

export type SourcifyesDataAction =
  | SetSourcifyDataAction
  | SetSourcifyDataActionSuccess
  | SetSourcifyDataActionFailure;
