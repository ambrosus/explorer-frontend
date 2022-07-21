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
interface SetAddressesDataAction {
  type: actionTypes.SET_ADDRESSES_DATA__START;
}

interface SetAddressesDataActionSuccess {
  type: actionTypes.SET_ADDRESSES_DATA__SUCCESS;
  payload: object | null;
}

interface SetAddressesDataActionFailure {
  type: actionTypes.SET_ADDRESSES_DATA__FAIL;
  payload: object | string | null;
}

export type AddressesDataAction =
  | SetAddressesDataAction
  | SetAddressesDataActionSuccess
  | SetAddressesDataActionFailure;

// ***** Apollo Data Action *****
interface SetHeadInfoDataAction {
  type: actionTypes.SET_HEADINFO_DATA__START;
}

interface SetHeadInfoDataActionSuccess {
  type: actionTypes.SET_HEADINFO_DATA__SUCCESS;
  payload: object | null;
}

interface SetHeadInfoDataActionFailure {
  type: actionTypes.SET_HEADINFO_DATA__FAIL;
  payload: object | string | null;
}

export type ApolloDataAction =
  | SetHeadInfoDataAction
  | SetHeadInfoDataActionSuccess
  | SetHeadInfoDataActionFailure;

// ***** Bundle Data Action *****

interface SetBundlesDataAction {
  type: actionTypes.SET_BUNDLES_DATA__START;
}

interface SetBundlesDataActionSuccess {
  type: actionTypes.SET_BUNDLES_DATA__SUCCESS;
  payload: object | null;
}

interface SetBundlesDataActionFailure {
  type: actionTypes.SET_BUNDLES_DATA__FAIL;
  payload: object | string | null;
}

export type BunlesDataAction =
  | SetBundlesDataAction
  | SetBundlesDataActionSuccess
  | SetBundlesDataActionFailure;

// ***** HermesData Action *****
