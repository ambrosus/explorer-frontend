import { actionTypes } from '../action-types';
import {
  AppDataAction,
  BunlesDataAction,
  FiltersAction,
  PositionAction,
} from '../actions';
import API from 'API/api';
import { Dispatch } from 'redux';
import { ActionsFetch } from 'state/state.interface';
import { CLIENT_VERSION } from 'utils/constants';

export const setAppDataAsync = () => {
  /*
  @param {void}
  @returns {Promise<AppDataAction>}
   */

  return async (dispatch: Dispatch<AppDataAction>) => {
    dispatch({
      type: actionTypes.SET_APP_DATA__START,
    });
    try {
      //TODO промис ол
      const netInfo = await API.getInfo();
      // https://token.ambrosus.io/price
      const tokenInfo = await API.getToken().then(async (info = {}) => {
        const totalSupply = await API.getTokenTotalSupply().then(
          (totalSupplyToken = {}) => {
            return totalSupplyToken;
          },
        );
        info.total_supply = totalSupply;
        return info;
      });
      const totalSupply1 = await API.getTokenTotalSupply();
      const totalPriceToken = await API.getTokenMountPrice();
      const { total_price_usd } = await API.getTokenMountPrice().then(
        (res) => res,
      );

      const result = {
        gitTagVersion: CLIENT_VERSION,
        netInfo: netInfo,
        tokenInfo: tokenInfo,
        totalPriceToken: totalPriceToken,
        total_price_usd: total_price_usd,
        totalSupply: totalSupply1,
      };
      /*
       * @param {string} url - адрес запроса
       * @returns {Promise<AppDataAction>}
       */
      dispatch({
        type: actionTypes.SET_APP_DATA__SUCCESS,
        payload: result,
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_APP_DATA__FAIL,
        payload: error.message,
      });
    }
  };
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

// pages actions

export const getBundlesData = (
  address: any = undefined,
  params: any = { limit: 20, next: null },
) => {
  return async (dispatch: Dispatch<BunlesDataAction>) => {
    dispatch({
      type: actionTypes.SET_BUNDLES_DATA__START,
    });
    try {
      const bundleInfo = await API.getInfo();

      if (!!address) {
        const bundle = await API.getBundle(address);
        dispatch({
          type: actionTypes.SET_BUNDLES_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
            bundle: bundle,
          },
        });
      }

      dispatch({
        type: actionTypes.SET_BUNDLES_DATA__SUCCESS,
        payload: {
          gitTagVersion: CLIENT_VERSION,
          bundleInfo: bundleInfo,
        },
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_BUNDLES_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};
