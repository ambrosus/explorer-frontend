import { actionTypes } from '../action-types';
import {
  AppDataAction,
  BunleDataAction,
  FiltersAction,
  PositionAction,
} from '../actions';
import API from 'API/api';
import { useParams } from 'react-router-dom';
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
  params = { limit: 20, next: null },
) => {
  return async (dispatch: Dispatch<BunleDataAction>) => {
    dispatch({
      type: actionTypes.SET_BUNDLE_DATA__START,
    });
    try {
      const bundle = await API.getBundle(address);
      const bundlesData = await API.getBundles({
        params,
      });
      const bundleAssets = await API.getBundleAssets(address, {
        params,
      });
      const bundleEvents = await API.getBundleEvents(address, {
        params,
      });
      const result = {
        bundle: bundle,
        bundlesData: bundlesData,
        bundleAssets: bundleAssets,
        bundleEvents: bundleEvents,
      };

      dispatch({
        type: actionTypes.SET_BUNDLE_DATA__SUCCESS,
        payload: result,
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_BUNDLE_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};
