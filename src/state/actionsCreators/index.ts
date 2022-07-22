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

      if (!!address) {
        const bundleInfo = API.getBundle(address);

        Promise.allSettled([netInfo, tokenInfo, bundleInfo]).then(
          (res: any) => {
            dispatch({
              type: actionTypes.SET_APP_DATA__SUCCESS,
              payload: {
                gitTagVersion: CLIENT_VERSION,
                netInfo: res[0].value,
                tokenInfo: res[1].value,
                bundleInfo: res[2].value,
              },
            });
          },
        );
      } else
        Promise.allSettled([netInfo, tokenInfo]).then((res: any) => {
          dispatch({
            type: actionTypes.SET_APP_DATA__SUCCESS,
            payload: {
              gitTagVersion: CLIENT_VERSION,
              netInfo: res[0].value,
              tokenInfo: res[1].value,
            },
          });
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
