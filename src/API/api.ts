import { log } from '../utils/helpers';
import axios from 'axios';

const tokenApiUrl: any = process.env.REACT_APP_TOKEN_API_URL;

const baseApiUrl = process.env.REACT_APP_API_ENDPOINT;
const sourcifyApiUrl = process.env.REACT_APP_SOURCIFY_API_ENDPOINT;

const chainID = process.env.REACT_APP_CHAIN_ID;

const API = () => {
  const api = axios.create({
    baseURL: baseApiUrl,
  });

  function handleNotFound(err: any) {
    if (err) {
      log(err);
    }
  }

  api.interceptors.response.use(
    (response) => {
      if (response.data) {
        return response.data;
      }

      return response;
    },
    (error) => {
      handleNotFound(error);
    },
  );

  return api;
};

const SOURCIFYAPI = () => {
  const api = axios.create({
    baseURL: sourcifyApiUrl,
  });

  function handleNotFound(err: any) {
    if (err) {
      log(err);
    }
  }

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      handleNotFound(error.response);
      return error.response;
    },
  );

  return api;
};

const getAccount = (address: any) => {
  return API().get(`accounts/${address}`);
};

//TODO remove atlases
const getAtlases = (params = {}) => {
  return API().get(`atlases`, {
    params,
  });
};

const getAtlas = (address: string) => {
  return API().get(`atlases/${address}`);
};
//TODO remove atlases
export const getAccountTx = (params: any = {}) => {
  return API().get(`accounts/${params.address}/transactions`, {
    params,
  });
};
//TODO remove bundles
const getBundle = (bundleId: any) => {
  return API().get(`bundles/${bundleId}`);
};
//TODO remove bundles
const getBundleAssets = (bundleId: any, params = {}) => {
  return API().get(`bundles/${bundleId}/assets`, {
    params,
  });
};
//TODO remove bundles
const getBundleEvents = (bundleId: any, params = {}) => {
  return API().get(`bundles/${bundleId}/events`, {
    params,
  });
};
//TODO remove bundles
const getBundleWithEntries = (bundleId: any) => {
  return axios
    .all([
      getBundle(bundleId),
      getBundleAssets(bundleId),
      getBundleEvents(bundleId),
    ])
    .then(
      axios.spread((bundle, assets, events) => {
        return {
          bundle,
          assets,
          events,
        };
      }),
    );
};
//TODO remove bundles
const getBundles = (params = {}) => {
  return API().get(`bundles?cursor`, {
    params,
  });
};

const getContract = (address: any) => {
  return SOURCIFYAPI().get(`files/any/${chainID}/${address}`);
};

const getTokenMountPrice = () => {
  return axios.get(tokenApiUrl + '/price').then(({ data }) => data.data);
};

const followTheLinkRange = async (fromDate: any, toDate: any, address: any) => {
  const link = `${process.env.REACT_APP_API_ENDPOINT_V2}/addresses/${address}/export/csv`;
  const from = fromDate / 1000;
  const to = toDate / 1000;
  window.open(
    `${link}?from=${from}&to=${to + (from === to ? 86400 : 0)}`,
    '_self',
  );
  return await fetch(
    `${link}?from=${from}&to=${to + (from === to ? 86400 : 0)}`,
  );
};

const api = {
  API: API(),
  SOURCIFYAPI: SOURCIFYAPI(),
  getAtlases,
  getAtlas,
  getContract,
  getAccountTx,
  getAccount,
  getBundles,
  getBundle,
  getBundleAssets,
  getBundleEvents,
  getBundleWithEntries,
  getTokenMountPrice,
  followTheLinkRange,
};

export default api;
