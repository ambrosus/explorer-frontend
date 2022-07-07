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
interface SetApolloDataAction {
  type: actionTypes.SET_APOLLO_DATA__START;
}

interface SetApolloDataActionSuccess {
  type: actionTypes.SET_APOLLO_DATA__SUCCESS;
  payload: object | null;
}

interface SetApolloDataActionFailure {
  type: actionTypes.SET_APOLLO_DATA__FAIL;
  payload: object | string | null;
}

export type ApolloDataAction =
  | SetApolloDataAction
  | SetApolloDataActionSuccess
  | SetApolloDataActionFailure;

// ***** Atlas Data Action *****
interface SetAtlasDataAction {
  type: actionTypes.SET_ATLAS_DATA__START;
}

interface SetAtlasDataActionSuccess {
  type: actionTypes.SET_ATLAS_DATA__SUCCESS;
  payload: object | null;
}

interface SetAtlasDataActionFailure {
  type: actionTypes.SET_ATLAS_DATA__FAIL;
  payload: object | string | null;
}

export type AtlasDataAction =
  | SetAtlasDataAction
  | SetAtlasDataActionSuccess
  | SetAtlasDataActionFailure;

// ***** Blocks Data Action *****
interface SetBlocksDataAction {
  type: actionTypes.SET_BLOCKS_DATA__START;
}

interface SetBlocksDataActionSuccess {
  type: actionTypes.SET_BLOCKS_DATA__SUCCESS;
  payload: object | null;
}

interface SetBlocksDataActionFailure {
  type: actionTypes.SET_BLOCKS_DATA__FAIL;
  payload: object | string | null;
}

export type BlocksDataAction =
  | SetBlocksDataAction
  | SetBlocksDataActionSuccess
  | SetBlocksDataActionFailure;

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

interface SetHermesDataAction {
  type: actionTypes.SET_HERMES_DATA__START;
}

interface SetHermesDataActionSuccess {
  type: actionTypes.SET_HERMES_DATA__SUCCESS;
  payload: object | null;
}

interface SetHermesDataActionFailure {
  type: actionTypes.SET_HERMES_DATA__FAIL;
  payload: object | string | null;
}

export type HermesDataAction =
  | SetHermesDataAction
  | SetHermesDataActionSuccess
  | SetHermesDataActionFailure;

// ***** HomeData Action *****

interface SetHomeDataAction {
  type: actionTypes.SET_HOME_DATA__START;
}

interface SetHomeDataActionSuccess {
  type: actionTypes.SET_HOME_DATA__SUCCESS;
  payload: object | null;
}

interface SetHomeDataActionFailure {
  type: actionTypes.SET_HOME_DATA__FAIL;
  payload: object | string | null;
}

export type HomeDataAction =
  | SetHomeDataAction
  | SetHomeDataActionSuccess
  | SetHomeDataActionFailure;

// ***** TransactionsData Action *****

interface SetTransactionsDataAction {
  type: actionTypes.SET_TRANSACTIONS_DATA__START;
}

interface SetTransactionsDataActionSuccess {
  type: actionTypes.SET_TRANSACTIONS_DATA__SUCCESS;
  payload: object | null;
}

interface SetTransactionsDataActionFailure {
  type: actionTypes.SET_TRANSACTIONS_DATA__FAIL;
  payload: object | string | null;
}

export type TransactionsDataAction =
  | SetTransactionsDataAction
  | SetTransactionsDataActionSuccess
  | SetTransactionsDataActionFailure;
