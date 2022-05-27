import { actionTypes } from '../action-types';
import { AppDataAction, FiltersAction, PositionAction } from '../actions';
import API from 'API/api';
import { Dispatch } from 'redux';
import { CLIENT_VERSION } from 'utils/constants';

export const setAppDataAsync = () => {
  /*
  @param {void}
  @returns {Promise<AppDataAction>}
   */

  return async (dispatch: Dispatch<AppDataAction>) => {
    dispatch({
      type: actionTypes.SET_APP_DATA__START
    });
    try {
      const netInfo = await API.getInfo();

      const tokenInfo = await API.getToken().then(async (info = {}) => {
        const totalSupply = await API.getTokenTotalSupply().then(
          (totalSupplyToken = {}) => {
            return totalSupplyToken;
          }
        );
        info.total_supply = totalSupply;
        return info;
      });
      const totalPriceToken = await API.getTokenMountPrice();
      const { total_price_usd } = await API.getTokenMountPrice().then(
        (res) => res
      );

      const result = {
        gitTagVersion: CLIENT_VERSION,
        netInfo: netInfo,
        tokenInfo: tokenInfo,
        totalPriceToken: totalPriceToken,
        total_price_usd: total_price_usd
      };
      /*
       * @param {string} url - адрес запроса
       * @returns {Promise<AppDataAction>}
       */
      dispatch({
        type: actionTypes.SET_APP_DATA__SUCCESS,
        payload: result
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_APP_DATA__FAIL,
        payload: error.message
      });
    }
  };
};

export const setPosition: any = (promiseFunc: any, ...params: any) => {
  return async (dispatch: Dispatch<PositionAction>) => {
    dispatch({
      type: actionTypes.SET_POSITION__START
    });
    try {
      const result = await promiseFunc(...params);
      dispatch({
        type: actionTypes.SET_POSITION__SUCCESS,
        payload: result
      });
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_POSITION__FAIL,
        payload: error.message
      });
    }
  };
};

export const addFilter: any = (filter: object) => {
  return async (dispatch: Dispatch<FiltersAction>) => {
    dispatch({
      type: actionTypes.ADD_FILTER,
      payload: filter
    });
  };
};

export const clearFilters: any = () => {
  return async (dispatch: Dispatch<FiltersAction>) => {
    dispatch({
      type: actionTypes.CLEAR_FILTERS,
      payload: null
    });
  };
};
