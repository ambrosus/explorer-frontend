import { actionTypes } from '../action-types';
import {
  AddressesDataAction,
  ApolloDataAction,
  AppDataAction,
  AtlasDataAction,
  BlocksDataAction,
  BunlesDataAction,
  FiltersAction,
  HermesDataAction,
  HomeDataAction,
  PositionAction,
  TransactionsDataAction,
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

// pages actions

export const getAddressesData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<AddressesDataAction>) => {
    dispatch({
      type: actionTypes.SET_ADDRESSES_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_ADDRESSES_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_ADDRESSES_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

export const getApolloData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<ApolloDataAction>) => {
    dispatch({
      type: actionTypes.SET_APOLLO_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_APOLLO_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_APOLLO_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

export const getAtlasData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<AtlasDataAction>) => {
    dispatch({
      type: actionTypes.SET_ATLAS_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_ATLAS_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_ATLAS_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

export const getBundlesData = (
  address: any = '',
  params: any = { limit: 20, next: null },
) => {
  return async (dispatch: Dispatch<BunlesDataAction>) => {
    dispatch({
      type: actionTypes.SET_BUNDLES_DATA__START,
    });
    try {
      const bundle = await API.getBundle(address);
      const bundlesData = await API.getBundles(params);
      const bundleAssets = await API.getBundleAssets(address, {
        params,
      });
      const bundleEvents = await API.getBundleEvents(address, {
        params,
      });
      const bundleInfo = await API.getInfo();

      dispatch({
        type: actionTypes.SET_BUNDLES_DATA__SUCCESS,
        payload: {
          gitTagVersion: CLIENT_VERSION,
          // bundle: bundle,
          // bundlesData: bundlesData,
          // bundleAssets: bundleAssets,
          // bundleEvents: bundleEvents,
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

export const getBlocksData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<BlocksDataAction>) => {
    dispatch({
      type: actionTypes.SET_BLOCKS_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_BLOCKS_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_BLOCKS_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

export const getHermesData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<HermesDataAction>) => {
    dispatch({
      type: actionTypes.SET_HERMES_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_HERMES_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_HERMES_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

export const getHomeData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<HomeDataAction>) => {
    dispatch({
      type: actionTypes.SET_HOME_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_HOME_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_HOME_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};

export const getTransactionsData: ActionsFetch = (
  address,
  params = { limit: 20, next: null, sort: '' },
) => {
  return (dispatch: Dispatch<TransactionsDataAction>) => {
    dispatch({
      type: actionTypes.SET_TRANSACTIONS_DATA__START,
    });
    try {
      Promise.all([]).then((res) =>
        dispatch({
          type: actionTypes.SET_TRANSACTIONS_DATA__SUCCESS,
          payload: {
            gitTagVersion: CLIENT_VERSION,
          },
        }),
      );
    } catch (error: any) {
      dispatch({
        type: actionTypes.SET_TRANSACTIONS_DATA__FAIL,
        payload: error.message,
      });
    }
  };
};
