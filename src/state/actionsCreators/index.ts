import { actionTypes } from '../action-types';
import {
  AddressesDataAction,
  AppDataAction,
  FiltersAction,
  PositionAction,
} from '../actions';
import API from 'API/api';
import { Dispatch } from 'redux';
import { ActionCreator, ActionsFetch } from 'state/state.interface';
import { CLIENT_VERSION } from 'utils/constants';

export const setAppDataAsync = (
  address: any = undefined,
  params: any = { limit: 20, next: null },
) => {
  return (dispatch: Dispatch<AppDataAction>) => {
    dispatch({
      type: actionTypes.SET_APP_DATA__START,
    });
    try {
      const netInfo = API.getInfo();
      const tokenInfo = API.getToken();
      const total_price_usd = API.getTokenMountPrice();

      if (!!address) {
        const bundleInfo = API.getBundle(address);
        const apolloInfo = API.getApollo(address);

        Promise.allSettled([
          netInfo,
          tokenInfo,
          total_price_usd,
          bundleInfo,
          apolloInfo,
        ]).then((res: any) => {
          dispatch({
            type: actionTypes.SET_APP_DATA__SUCCESS,
            payload: {
              gitTagVersion: CLIENT_VERSION,
              netInfo: res[0].value,
              tokenInfo: {
                ...res[1].value,
                total_price_usd: res[2].value.total_price_usd,
              },
              bundleInfo: res[3].value,
              apolloInfo: res[4].value,
            },
          });
        });
      } else
        Promise.allSettled([netInfo, tokenInfo, total_price_usd]).then(
          (res: any) => {
            dispatch({
              type: actionTypes.SET_APP_DATA__SUCCESS,
              payload: {
                gitTagVersion: CLIENT_VERSION,
                netInfo: res[0].value,
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

export const getAddressData = (
  address: any = undefined,
  params = { limit: 20, next: null },
) => {
  return (dispatch: Dispatch<AddressesDataAction>) => {
    dispatch({
      type: actionTypes.SET_ADDRESS_DATA__START,
    });
    try {
      const apolloInfo = API.getApollo(address);
      const bundleInfo = API.getBundle(address);

      Promise.allSettled([apolloInfo, bundleInfo]).then((res: any) =>
        dispatch({
          type: actionTypes.SET_ADDRESS_DATA__SUCCESS,
          payload: {
            apolloInfo: res[0].value,
            bundleInfo: res[1].value,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_ADDRESS_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

// export const getBundleAddressData: ActionsFetch = (
//   address,
//   params = { limit: 20, next: null },
// ) => {
//   return async (dispatch: Dispatch<AppDataAction>) => {
//     dispatch({
//       type: actionTypes.SET_APP_DATA__START,
//     });
//     try {
//       if (!!address) {
//         const apolloInfo = await API.getApollo(address);

//         dispatch({
//           type: actionTypes.SET_APP_DATA__SUCCESS,
//           payload: {
//             apolloInfo: apolloInfo,
//           },
//         });
//       }
//     } catch (error: any) {
//       dispatch({
//         type: actionTypes.SET_APP_DATA__FAIL,
//         payload: error.message,
//       });
//     }
//   };
// };
