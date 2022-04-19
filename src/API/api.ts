/*eslint-disable*/
import axios from 'axios';
import { ethers, providers } from 'ethers';
import erc20Abi from '../utils/abis/ERC20.json';
import { formatEther } from 'ethers/lib/utils';
import { ethereum } from '../utils/constants';
import moment from 'moment';

const tokenApiUrl = process.env.REACT_APP_TOKEN_API_URL;

const baseApiUrl = process.env.REACT_APP_API_ENDPOINT;
const API = () => {
	const api = axios.create({
		baseURL: baseApiUrl,
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
		},
	);

	return api;
};

const getBlocks = async (params = {}) => {
	return await API().get('blocks', {
		params,
	});
};


const getDataForAddress = async (address: string, params: any) => {
	const { filtered, limit, type, selectedTokenFilter } = params;
	const blockBookApi = await fetch(`https://blockbook.ambrosus.io/api/v2/address/${address}?filter=${selectedTokenFilter}`)
		.then((res) => res.json());

	const addressBalance = blockBookApi.balance;
	const constTokens = blockBookApi && blockBookApi.tokens.map((token: any, index: number) => {
		return {
			...token,
			idx: index + 1,
		};
	});

	const getBalance = async (tokensArr: any[]) => {
		const newTokens: any[] = [];

		tokensArr.map(async (token: any) => {
			try {
				// const ambProvider = new providers.JsonRpcProvider('https://network.ambrosus.io');
				const ambProvider = new providers.Web3Provider(ethereum);
				const tokenContract = new ethers.Contract(token.contract, erc20Abi, ambProvider);
				const balance = Number(formatEther(await tokenContract.balanceOf(String(address)))).toFixed(2);
				const totalSupply = Number(formatEther(await tokenContract.totalSupply()));
				token.balance = balance;
				token.totalSupply = totalSupply;
			}
			catch (e) {
				console.log(e);
			}finally {
				newTokens.push(token);
			}
		});
		return newTokens;
	};
	const defaultFilters = await getBalance(constTokens);

	const { data: explorerTrans } = await getAccountTx(address, { limit, type });

	const blockBookApiTransactions = blockBookApi && blockBookApi?.txids.map(async (tx: string) => {
		return await fetch(`https://blockbook.ambrosus.io/api/v2/tx/${tx}`).then((res) => res.json());
	});

	const blockBookApiTransactionsData = await Promise.all(blockBookApiTransactions);

	const explorData = explorerTrans.map((t: any) => ({
		txHash: t.hash,
		method: t.type,
		from: `${t.from.slice(0, 5)}...${t.from.slice(t.from.length - 5)}`,
		to: `${t.to.slice(0, 5)}...${t.to.slice(t.to.length - 5)}`,
		date: t.timestamp * 1000,
		block: t.blockNumber,
		amount: Number(formatEther(t.value.wei)).toFixed(2),
		txFee: Number(Number(formatEther(t.gasUsed)) * Number(formatEther(t.gasCost.wei))).toFixed(2),
	}));
	const bBookData = blockBookApiTransactionsData.map((t) => ({
		userTokens: defaultFilters,
		txHash: t.txid,
		method: t?.tokenTransfers ? 'Transfer' : '',
		from: t?.tokenTransfers ? `${t.tokenTransfers[0].from.slice(0, 5)}...${t.tokenTransfers[0].from.slice(t.tokenTransfers[0].from.length - 5)}` : '',
		to: t?.tokenTransfers ? `${t.tokenTransfers[0].to.slice(0, 5)}...${t.tokenTransfers[0].to.slice(t.tokenTransfers[0].to.length - 5)}` : '',
		date: t.blockTime * 1000,
		amount: t?.tokenTransfers ? Number(formatEther(t.tokenTransfers[0].value)).toFixed(2) : Number(formatEther(t.value)).toFixed(2),
		token: t?.tokenTransfers ? t.tokenTransfers[0].name : 'No token',
	}));

	return {
		balance: addressBalance,
		transactions: type === 'ERC-20_Tx' || selectedTokenFilter ? bBookData : explorData,
		tokens: [...defaultFilters],
	};
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

const getAtlases = (params = {}) => {
	return API().get(`atlases`, {
		params,
	});
};

const getAccountTx = (address: any, params = {}) => {
	return API().get(`accounts/${address}/transactions`, {
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
	return axios.all([getBundle(bundleId), getBundleAssets(bundleId), getBundleEvents(bundleId)]).then(
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

const getToken = () => {
	// @ts-ignore
	return axios.get(tokenApiUrl).then(({ data }) => data.data);
};

const getTokenHistory = () => {
	return axios.get(tokenApiUrl + '/history').then(({ data }) => data.data);
};

const getTokenMountPrice = () => {
	return axios.get(tokenApiUrl + '/price').then(({ data }) => data.data);
};

const getTokenTotalSupply = () => {
	return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/blocks/total_supply`).then((response) => {
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
	window.open(`${link}/dateFrom/${from}/dateTo/${to}`, '_self');
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
	followTheLinkRange,
};
