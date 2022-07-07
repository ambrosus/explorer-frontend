import { actionTypes } from '../action-types';
import {
  AppDataAction,
  BunleDataAction,
  FiltersAction,
  PositionAction,
} from '../actions';
import API from 'API/api';
import axios from 'axios';
import { Dispatch } from 'redux';
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

export const getBundlesData = (
  address: any = null,
  params: any = { limit: 20, next: null },
) => {
  return (dispatch: Dispatch<BunleDataAction>) => {
    dispatch({
      type: actionTypes.SET_BUNDLE_DATA__START,
    });
    try {
      const bundle = API.getBundle(address);
      const bundlesData = API.getBundles({
        params,
      });
      const bundleAssets = API.getBundleAssets(address, {
        params,
      });
      const bundleEvents = API.getBundleEvents(address, {
        params,
      });

      Promise.all([bundle, bundlesData, bundleAssets, bundleEvents]).then(
        (res) =>
          dispatch({
            type: actionTypes.SET_BUNDLE_DATA__SUCCESS,
            payload: {
              gitTagVersion: CLIENT_VERSION,
              bundle: res[0],
              bundlesData: res[1],
              bundleAssets: res[2],
              bundleEvents: res[3],
            },
          }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_BUNDLE_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};
