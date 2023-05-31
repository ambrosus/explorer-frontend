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

const getApolloRewards = (address: any, params: any) => {
  const url = `apollos/${address}/rewards`;
  const parameterFrom = params?.from?.split('/') || null;
  const parameterTo = params?.to?.split('/') || null;
  const newParams =
    parameterTo !== null
      ? {
          from: `${parameterFrom[1]}/${parameterFrom[0]}/${parameterFrom[2]}`,
          to: `${parameterTo[1]}/${parameterTo[0]}/${parameterTo[2]}`,
        }
      : {
          from: `${parameterFrom[1]}/${parameterFrom[0]}/${parameterFrom[2]}`,
        };
  return API().get(url, { params: newParams });
};
//TODO remove atlases
const getAtlases = (params = {}) => {
  return API().get(`atlases`, {
    params,
  });
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
  const link = `${baseApiUrl}/transactions/csv/address/${address}`;
  const from = fromDate / 1000;
  const to = toDate / 1000;
  window.open(`${link}/dateFrom/${from}/dateTo/${to}`, '_self');
  return await fetch(`${link}/dateFrom/${from}/dateTo/${to}`);
};

const api = {
  API: API(),
  SOURCIFYAPI: SOURCIFYAPI(),
  getAtlases,
  getApolloRewards,
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
