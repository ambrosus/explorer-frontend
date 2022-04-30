/*eslint-disable*/
import axios from "axios";
import { ethers, providers } from "ethers";
import erc20Abi from "utils/abis/ERC20.json";
import { formatEther } from "ethers/lib/utils";
import { ethereum } from "utils/constants";
import {
  ExplorerTxType,
  TokenType,
  TransactionProps
} from "pages/Addresses/AddressDetails/address-details.interface";

const tokenApiUrl = process.env.REACT_APP_TOKEN_API_URL;

const baseApiUrl = process.env.REACT_APP_API_ENDPOINT;
const API = () => {
  const api = axios.create({
    baseURL: baseApiUrl
  });

  function handleNotFound(err: any) {
    if (err) {
      console.error(err);
    }
    // window.location.replace('/notfound');
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
    }
  );

  return api;
};

const getBlocks = async (params = {}) => {
  return await API().get("blocks", {
    params
  });
};

const getDataForAddress = async (address: string, params: any) => {
  const { limit, page, type, selectedTokenFilter } = params;
  const url = `https://blockbook.ambrosus.io/api/v2/address/${address}`;
  const blockBookApi: any = await API().get(url, {
    params: {
      page: page,
      pageSize: !type ? limit : 1000,
      contract: selectedTokenFilter
    }
  });
  const blockBookApiForT: any = await API().get(url, {
    params: {
      page: page,
      pageSize: !type ? limit : 1000,
    }
  });
  const blockBookApiTokensSearch:any=async () => {
    const array: any = blockBookApiForT && blockBookApiForT.tokens && blockBookApiForT.tokens.map(async (token: TokenType) => {
      // @ts-ignore
      const getTokenData: any = await API().get(url, {
        params: {
          page: page,
          pageSize: 1000,
          contract: token.contract
        }
      });
      return getTokenData && getTokenData.tokens && getTokenData?.tokens.find((item: TokenType) => token.contract === item.contract);
    });
    const promiseArray = array?.length ? await Promise.all(array) : []
    const flatMap = promiseArray?.length ? promiseArray.map((item: any) => item) : []
    return flatMap
  };
  const blockBookApiTokens: any = await blockBookApiTokensSearch();

  const addressBalance: string = blockBookApi.balance;

  const getTokensBalance = async (tokensArr: TokenType[]) => {
    const newTokens: TokenType[] | never = [];
    tokensArr?.length ? tokensArr.map(async (token: TokenType) => {
      try {
        // TODO get data in incognito
        // const ambProvider = new providers.JsonRpcProvider('https://network.ambrosus.io');
        const ambProvider = new providers.Web3Provider(ethereum);
        const tokenContract = await new ethers.Contract(
          token.contract,
          erc20Abi,
          ambProvider
        );
        const balance = Number(
          formatEther(await tokenContract.balanceOf(String(address)))
        ).toFixed(2);
        const totalSupply = Number(
          formatEther(await tokenContract.totalSupply())
        );
        token.balance = balance;
        token.totalSupply = totalSupply;
      } catch (e) {
        console.log(e);
      } finally {
        newTokens.push(token);
      }
    }) : newTokens;
    return newTokens;
  };

  const constTokens = blockBookApiTokens ? blockBookApiTokens.map((token: TokenType, index: number) => {
    return {
      ...token,
      idx: index + 1
    };
  }) : [];
  const defaultFilters: TokenType[] = await getTokensBalance(constTokens);

  const { data: explorerTrans } = await getAccountTx(address, { page,limit, type });

  const blockBookApiTransactions =
    blockBookApi && blockBookApi.txids ? blockBookApi.txids.map(async (tx: string) => {
      return await fetch(`https://blockbook.ambrosus.io/api/v2/tx/${tx}`)
        .then((res) => res.json())
        .catch(e => console.log(e));
    }) : [];

  const blockBookApiTransactionsData = await Promise.allSettled(
    blockBookApiTransactions
  );

  const explorData: TransactionProps[] = explorerTrans.map(
    (t: ExplorerTxType) => {
      return {
        txHash: t.hash,
        method: t.type,
        from: t.from,
        to: t.to,
        date: t.timestamp * 1000,
        block: t.blockNumber,
        amount: Number(formatEther(t.value.wei)).toFixed(2),
        // TODO add token symbol && token name
        token: "AMB",
        txFee: Number(t.gasCost.ether),
        erc20: false
      };
    }
  );

  const filteredBlockBookApiTransactionsData = blockBookApiTransactionsData.filter((item: any) => item.value !== undefined);

  const bBookData: TransactionProps[] | any = filteredBlockBookApiTransactionsData && filteredBlockBookApiTransactionsData?.length && filteredBlockBookApiTransactionsData.map(
    (item: any) => {
      const t = item.value;
      return ({
        txHash: t.txid,
        method: t?.tokenTransfers ? "Transfer" : "Transaction",
        from: t?.tokenTransfers
          ? t.tokenTransfers[0].from
          : t.vin[0].addresses[0],
        to: t?.tokenTransfers ? t.tokenTransfers[0].to : t.vout[0].addresses[0],
        date: t.blockTime * 1000,
        block: t.blockHeight,
        amount: t?.tokenTransfers
          ? Number(formatEther(t.tokenTransfers[0].value)).toFixed(2)
          : Number(formatEther(t.value)).toFixed(2),
        token: t?.tokenTransfers ? t.tokenTransfers[0].name : "AMB",
        txFee: Number(ethers.utils.formatEther(t.fees)),
        erc20: t?.tokenTransfers ? true : false
      });
    }
  );

  const includesTokens = defaultFilters.filter(
    (token: TokenType) => token.contract
  );
  const byToken = includesTokens.map(async (token: TokenType) => {
    const tokensTransactions: any = await API().get(url, {
      params: {
        page: page,
        pageSize: 1000,
        contract: selectedTokenFilter
      }
    });
    return tokensTransactions.txids.map(async (tx: string) => {
      return fetch(`https://blockbook.ambrosus.io/api/v2/tx/${tx}`)
        .then((res) => res.json())
        .catch(e => console.log(e));
    })[0];
  });
  const parsePromisesByToken = await Promise.allSettled(byToken);
  const sortedLatestTransactionsData: TransactionProps[] = parsePromisesByToken.map((item: any) => {
    const t = item.value;
    return ({
      txHash: t.txid,
      method: t?.tokenTransfers ? "Transfer" : "Transaction",
      from: t?.tokenTransfers
        ? t.tokenTransfers[0].from
        : t.vin[0].addresses[0],
      to: t?.tokenTransfers ? t.tokenTransfers[0].to : t.vout[0].addresses[0],
      date: t.blockTime * 1000,
      block: t.blockHeight,
      amount: t?.tokenTransfers
        ? Number(formatEther(t.tokenTransfers[0].value)).toFixed(2)
        : Number(formatEther(t.value)).toFixed(2),
      token: t?.tokenTransfers ? t.tokenTransfers[0].name : "No token",
      txFee: Number(ethers.utils.formatEther(t.fees))
    });
  });

  const compare: any = new Map(
    [...bBookData,...explorData,].map((item) => [item.block, item])
  ).values();
  //sort by block number
  const transactionsAll: TransactionProps[] = [...compare].sort((a: any, b: any) => b.block - a.block);
  const transfersDataTx: TransactionProps[] = transactionsAll.filter(
    (item: TransactionProps) => item.method === "Transfer"
  );

  return {
    balance: addressBalance,
    transactions:
      type === "ERC-20_Tx" || selectedTokenFilter
        ? bBookData
        : type === "transfers"
          ? transfersDataTx
          : transactionsAll,
    tokens: [...defaultFilters],
    latestTransactions: sortedLatestTransactionsData,
    meta: blockBookApi
  };
};


const getBlock = (hashOrNumber: any) => {
  return API().get(`blocks/${hashOrNumber}`);
};

const getBlockTransactions = (hashOrNumber: any, params = {}) => {
  return API().get(`blocks/${hashOrNumber}/transactions`, {
    params
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
    params
  });
};

const getApollo = (address: any) => {
  return API().get(`apollos/${address}`);
};

const getApolloRewards = (address: any, params: any) => {
  const url = `apollos/${address}/rewards`;
  return API().get(url, { params });
};

const getTransaction = (hash: any) => {
  return API().get(`transactions/${hash}`);
};

const getTransactions = (params: any = {}) => {
  const { type } = params;
  if (type) {
    delete params?.type;
  }
  const url = `transactions${type ? `/types/${type}` : ""}`;
  return API().get(url, {
    params
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
    params
  });
};

const getApollos = (params = {}) => {
  return API().get(`apollos`, {
    params
  });
};

const getAtlases = (params = {}) => {
  return API().get(`atlases`, {
    params
  });
};

const getAccountTx = (address: any, params = {}) => {
  return API().get(`accounts/${address}/transactions`, {
    params
  });
};

const getBundle = (bundleId: any) => {
  return API().get(`bundles/${bundleId}`);
};

const getBundleAssets = (bundleId: any, params = {}) => {
  return API().get(`bundles/${bundleId}/assets`, {
    params
  });
};

const getBundleEvents = (bundleId: any, params = {}) => {
  return API().get(`bundles/${bundleId}/events`, {
    params
  });
};

const getBundleWithEntries = (bundleId: any) => {
  return axios
    .all([
      getBundle(bundleId),
      getBundleAssets(bundleId),
      getBundleEvents(bundleId)
    ])
    .then(
      axios.spread((bundle, assets, events) => {
        return {
          bundle,
          assets,
          events
        };
      })
    );
};

const searchItem = (term: any) => {
  return API().get(`search/${term}`);
};

const getBundles = (params = {}) => {
  return API().get(`bundles?cursor`, {
    params
  });
};

const getInfo = () => {
  return API().get(`info/`);
};

const getToken = () => {
  // @ts-ignore
  return axios.get(tokenApiUrl).then(({ data }) => data.data);
};

const getTokenHistory = () => {
  return axios.get(tokenApiUrl + "/history").then(({ data }) => data.data);
};

const getTokenMountPrice = () => {
  return axios.get(tokenApiUrl + "/price").then(({ data }) => data.data);
};

const getTokenTotalSupply = () => {
  return axios
    .get(`${process.env.REACT_APP_API_ENDPOINT}/blocks/total_supply`)
    .then((response) => {
      return response.data;
    });
};

// const followTheLink = (time, address) => {
//   const link = `${baseApiUrl}/transactions/address/csv?`;
//   if (time !== "") {
//     const date = new Date(time) / 1000;
//     window.open(`${link}address=${address}&date=${date}`, '_self');
//   }
// }
const followTheLinkRange = (fromDate: any, toDate: any, address: any) => {
  const link = `${baseApiUrl}/transactions/csv/address/${address}`;
  const from = fromDate / 1000;
  const to = toDate / 1000;
  console.log(`${link}/dateFrom/${from}/dateTo/${to}`);
  window.open(`${link}/dateFrom/${from}/dateTo/${to}`, "_self");
};

export default {
  API: API(),
  getDataForAddress,
  getBlocks,
  getBlockTransactions,
  getTransactions,
  getSupTransaction,
  getAccounts,
  getApollos,
  getApollo,
  getAtlas,
  getAtlases,
  getApolloRewards,
  getInfo,
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
  followTheLinkRange
};
