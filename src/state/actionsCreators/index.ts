import { actionTypes } from '../action-types';
import { AppDataAction, FiltersAction, PositionAction } from '../actions';
import API from 'API/api';
import { Dispatch } from 'redux';
import { ActionsFetch } from 'state/state.interface';
import { CLIENT_VERSION } from 'utils/constants';

export const setAppDataAsync = (
  address: any = undefined,
  params: any = { limit: 20, next: null },
) => {
  /*
  @param {void}
  @returns {Promise<AppDataAction>}
   */

  return (dispatch: Dispatch<AppDataAction>) => {
    dispatch({
      type: actionTypes.SET_APP_DATA__START,
    });
    try {
      const netInfo = API.getInfo();
      const tokenInfo = API.getToken();
      const totalSupply = API.getTokenTotalSupply();

      if (!!address) {
        const bundleInfo = API.getBundle(address);
        // const tokenInfo = await API.getToken().then(async (info = {}) => {
        //   const totalSupply = await API.getTokenTotalSupply().then(
        //     (totalSupplyToken = {}) => {
        //       return totalSupplyToken;
        //     },
        //   );
        //   info.total_supply = totalSupply;
        //   return info;
        // });

        Promise.allSettled([netInfo, tokenInfo, bundleInfo, totalSupply]).then(
          (res: any) => {
            dispatch({
              type: actionTypes.SET_APP_DATA__SUCCESS,
              payload: {
                gitTagVersion: CLIENT_VERSION,
                netInfo: res[0].value,
                tokenInfo: res[1].value,
                bundleInfo: res[2].value,
                totalSupply: res[3].value,
              },
            });
          },
        );
      } else
        Promise.allSettled([netInfo, tokenInfo, totalSupply]).then(
          (res: any) => {
            dispatch({
              type: actionTypes.SET_APP_DATA__SUCCESS,
              payload: {
                gitTagVersion: CLIENT_VERSION,
                netInfo: res[0].value,
                tokenInfo: res[1].value,
                totalSupply: res[2].value,
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
