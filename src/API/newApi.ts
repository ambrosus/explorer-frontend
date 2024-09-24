import { log } from '../utils/helpers';
import axios from 'axios';

const tokenApiUrl: any = process.env.REACT_APP_TOKEN_API_URL;

const baseApiUrl = process.env.REACT_APP_API_ENDPOINT_V2;
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

const getContract = (address: any) =>
  SOURCIFYAPI().get(`files/any/${chainID}/${address}`);

const getInfo = () => API().get('info');
const getToken = () => axios.get(tokenApiUrl).then(({ data }) => data.data);

const getAddresses = (params = {}) => API().get('addresses', { params });
const getAddressesAll = (address: string) =>
  API().get(`addresses${address}/all`);
const getAddressesTransfers = (address: string) =>
  API().get(`addresses${address}/transfers`);
const getAddressesTokens = (address: string) =>
  API().get(`addresses${address}/tokens`);
const getBlocks = (params = {}) => API().get('blocks', { params });
const getBlock = (block: string) => API().get(`blocks/${block}`);
const getBlockHash = (hash: string) => API().get(`blocks/${hash}`);
const getApollos = (params = {}) => API().get('apollos', { params });
const getApollo = (params: any) => {
  return API().get(`apollos/${params.address || params}`, { params });
};

const getAccountTxs = (params: any = {}) => {
  const { address, type, page, tokenAddress } = params;

  return API().get(
    `addresses/${address}/${tokenAddress ? 'tokens' : type}${
      tokenAddress ? '/' + tokenAddress : ''
    }`,
    {
      params: { page, limit: 100 },
    },
  );
};

const getTransactions = (params = {}) => API().get('transactions', { params });
const getTransaction = (hash: string | undefined) =>
  API().get(`transactions/${hash}`);

const searchItem = (term: any) => {
  return API().get(`search/${term}`);
};

const getTokenTxs = ({ userAddress, tokenAddress, page }: any) => {
  return API().get(`addresses/${userAddress}/tokens/${tokenAddress}`, {
    params: { page, limit: 100 },
  });
};

const getBlockTransactions = (hashOrNumber: any, params = {}) => {
  return API().get(`blocks/${hashOrNumber}/transactions`, {
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

const api = {
  SOURCIFYAPI: SOURCIFYAPI(),
  getInfo,
  getAddresses,
  getAddressesAll,
  getAddressesTransfers,
  getAddressesTokens,
  getBlocks,
  getBlock,
  getBlockHash,
  getApollos,
  getApollo,
  getTransactions,
  getTransaction,
  getToken,
  getContract,
  getAccountTxs,
  searchItem,
  getTokenTxs,
  getBlockTransactions,
  getApolloRewards,
};

export default api;
