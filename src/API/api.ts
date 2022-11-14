import { log } from '../utils/helpers';
import { Apollo } from './../pages/Apollo/index';
import { Home } from './../pages/Home/index';
import axios from 'axios';
import { ApiRequest } from 'types';

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

const getBlocks = async (params = {}) => {
  return await API().get('blocks', {
    params,
  });
};

const getBlock = (hashOrNumber: any) => {
  return API().get(`blocks/${hashOrNumber}`);
};

const getBlockTransactions = (hashOrNumber: any, params = {}) => {
  return API().get(`blocks/${hashOrNumber}/transactions`, {
    params,
  });
};

const getAccount = (address: any) => {
  return API().get(`accounts/${address}`);
};

const getAtlas = (address: any) => {
  return API().get(`atlases/${address}`);
};

const getAtlasBundles = (address: any, params: any) => {
  return API().get(`atlases/${address}/bundles`, {
    params,
  });
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

const getTransaction = (hash: any) => {
  return API().get(`transactions/${hash}`);
};

const getTransactions = (params: any = {}) => {
  const { type } = params;
  if (type) {
    delete params?.type;
  }
  const url = `transactions${type ? `/types/${type}` : ''}`;
  return API().get(url, {
    params,
  });
};

const getTransactionEvent = (hash: any) => {
  return API().get(`transactions/${hash}/event`);
};

const getSupTransaction = (address: any) => {
  return API().get(`transactions/?parent=${address}`);
};

const getAccounts = (params = {}) => {
  return API().get(`accounts`, {
    params,
  });
};

const getApollos = (params = {}) => {
  return API().get(`apollos`, {
    params,
  });
};

const getAddresses = (params = {}) => {
  return API().get('v2/addresses', { params });
};

const getAccountTxs = (params: any = {}) => {
  const { address, type, page, tokenAddress } = params;

  return API().get(
    `v2/addresses/${address}/${tokenAddress ? 'tokens' : type}${
      tokenAddress ? '/' + tokenAddress : ''
    }`,
    {
      params: { page },
    },
  );
};

const getAtlases = (params = {}) => {
  return API().get(`atlases`, {
    params,
  });
};

export const getAccountTx = (params: any = {}) => {
  return API().get(`accounts/${params.address}/transactions`, {
    params,
  });
};

const getBundle = (bundleId: any) => {
  return API().get(`bundles/${bundleId}`);
};

const getBundleAssets = (bundleId: any, params = {}) => {
  return API().get(`bundles/${bundleId}/assets`, {
    params,
  });
};

const getBundleEvents = (bundleId: any, params = {}) => {
  return API().get(`bundles/${bundleId}/events`, {
    params,
  });
};

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

const searchItem = (term: any) => {
  return API().get(`search/${term}`);
};

const getBundles = (params = {}) => {
  return API().get(`bundles?cursor`, {
    params,
  });
};
const getInfo = () => {
  return API().get(`info/`);
};

const getContract = (address: any) => {
  return SOURCIFYAPI().get(`files/any/${chainID}/${address}`);
};

const getToken = () => {
  return axios.get(tokenApiUrl).then(({ data }) => data.data);
};

const getTokenHistory = () => {
  return axios.get(tokenApiUrl + '/history').then(({ data }) => data.data);
};

const getTokenMountPrice = () => {
  return axios.get(tokenApiUrl + '/price').then(({ data }) => data.data);
};

const getTokenTotalSupply = () => {
  return axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/blocks/total_supply`)
    .then((response) => {
      return response.data;
    });
};

const followTheLinkRange = async (fromDate: any, toDate: any, address: any) => {
  const link = `${baseApiUrl}/transactions/csv/address/${address}`;
  const from = fromDate / 1000;
  const to = toDate / 1000;
  window.open(`${link}/dateFrom/${from}/dateTo/${to}`, '_self');
  const data = await fetch(`${link}/dateFrom/${from}/dateTo/${to}`);
  return data;
};

const api = {
  API: API(),
  SOURCIFYAPI: SOURCIFYAPI(),
  getBlocks,
  getBlockTransactions,
  getTransactions,
  getSupTransaction,
  getAccounts,
  getApollos,
  getAtlas,
  getAtlases,
  getApolloRewards,
  getInfo,
  getContract,
  getToken,
  getAccountTx,
  getBlock,
  getAccount,
  getTransaction,
  getTransactionEvent,
  getBundles,
  getBundle,
  getBundleAssets,
  getBundleEvents,
  getBundleWithEntries,
  searchItem,
  getTokenHistory,
  getTokenMountPrice,
  getTokenTotalSupply,
  getAtlasBundles,
  followTheLinkRange,
  getAddresses,
  getAccountTxs,
};

export default api;
