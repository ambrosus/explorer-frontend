import { actionTypes } from '../action-types';
import {
  AddressesDataAction,
  AppDataAction,
  FiltersAction,
  PositionAction,
  SourcifyesDataAction,
} from '../actions';
import API from 'API/api';
import SOURCIFYAPI from 'API/api';
import API2 from 'API/newApi';
import { Dispatch } from 'redux';
import { CLIENT_VERSION } from 'utils/constants';

export const setAppDataAsync =
  (address?: any) => (dispatch: Dispatch<AppDataAction>) => {
    dispatch({
      type: actionTypes.SET_APP_DATA__START,
    });
    try {
      const netInfo = API2.getInfo();
      const tokenInfo = API2.getToken();
      const total_price_usd = API.getTokenMountPrice();

      Promise.allSettled([netInfo, tokenInfo, total_price_usd]).then(
        (res: any) => {
          //TODO refactor
          dispatch({
            type: actionTypes.SET_APP_DATA__SUCCESS,
            payload: {
              gitTagVersion: CLIENT_VERSION,
              netInfo: res[0].value.data,
              tokenInfo: {
                ...res[1].value,
                total_price_usd: res[2].value.total_price_usd,
              },
            },
          });
        },
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_APP_DATA__FAIL,
        payload: error.message,
      });
    }
  };

export const setPosition: any = (promiseFunc: any, ...params: any) => {
  return async (dispatch: Dispatch<PositionAction>) => {
    dispatch({
      type: actionTypes.SET_POSITION__START,
    });
    try {
      const result = await promiseFunc(...params);
      dispatch({
        type: actionTypes.SET_POSITION__SUCCESS,
        payload: result,
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_POSITION__FAIL,
        payload: error.message,
      });
    }
  };
};

export const addFilter: any = (filter: object) => {
  return async (dispatch: Dispatch<FiltersAction>) => {
    dispatch({
      type: actionTypes.ADD_FILTER,
      payload: filter,
    });
  };
};

export const clearFilters: any = () => {
  return async (dispatch: Dispatch<FiltersAction>) => {
    dispatch({
      type: actionTypes.CLEAR_FILTERS,
      payload: null,
    });
  };
};

export const getAddressData =
  (address: any) => (dispatch: Dispatch<AddressesDataAction>) => {
    dispatch({
      type: actionTypes.GET_ADDRESS_DATA__START,
    });
    try {
      const apolloInfo = API2.getApollo(address);
      const accountInfo = API.getAccount(address);
      const atlasInfo = API.getAtlas(address);
      Promise.allSettled([apolloInfo, accountInfo, atlasInfo]).then((res: any) => {
        dispatch({
          type: actionTypes.GET_ADDRESS_DATA__SUCCESS,
          payload: {
            apolloInfo: { data: res[0].value ? res[0].value.data.validator : {}},
            accountInfo: res[1].value,
            atlasInfo: res[2].value
          },
        });
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.GET_ADDRESS_DATA__FAIL,
        payload: error.message,
      });
    }
  };

export const getContractAddressData =
  (address: any) => (dispatch: Dispatch<SourcifyesDataAction>) => {
    dispatch({
      type: actionTypes.GET_SOURCIFY_DATA__START,
    });
    try {
      const accountInfo = API.getAccount(address);
      const contractInfo = SOURCIFYAPI.getContract(address);

      Promise.allSettled([accountInfo, contractInfo]).then((res: any) =>
        dispatch({
          type: actionTypes.GET_SOURCIFY_DATA__SUCCESS,
          payload: {
            accountInfo: res[0].value,
            contractInfo: res[1].value,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.GET_SOURCIFY_DATA__FAIL,
        payload: error.response,
      });
    }
  };
