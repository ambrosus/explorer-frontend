import API from '../API/api';
import {
  ExplorerTxType,
  TokenType,
  TransactionProps,
} from '../pages/Addresses/AddressDetails/address-details.interface';
import removeArrayDuplicates, { log } from '../utils/helpers';
import { ethers } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import erc20Abi from 'utils/abis/ERC20.json';

const getTokensBalance = async (tokensArr: TokenType[], address: string) => {
  return Promise.all(
    tokensArr.map(async (token) => {
      const ambProvider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_EXPLORER_NETWORK,
      );
      const tokenContract = new ethers.Contract(
        token.contract,
        erc20Abi,
        ambProvider,
      );
      const symbol = token?.symbol ? token.symbol : 'AMB';
      const name = getTokenName(token);
      const balance = Number(
        formatEther(await tokenContract.balanceOf(String(address))),
      ).toFixed(2);
      const totalSupply = Number(
        formatEther(await tokenContract.totalSupply()),
      );
      token.balance = balance;
      token.totalSupply = totalSupply;
      token.name = name;
      token.symbol = symbol;
      return {
        ...token,
        balance,
        totalSupply,
      };
    }),
  );
};
const getTokenName = (token: TokenType) => {
  const tokenName = typeof token === 'string' ? token : token.name;

  const tokenExample = [
    {
      token: '0x322269e52800e5094c008f3b01A3FD97BB3C8f5D',
      contractName: 'Hera pool token',
    },
    {
      token: '0xEB8386a50Edd613cc43f061E9C5A915b0443C5d4',
      contractName: 'Plutus pool token',
    },
    {
      token: '0xE984ACe36F2B6f10Fec8dd6fc1bB19c7b1D2F2c6',
      contractName: 'Ganymede pool token',
    },
  ];
  const tokenNameFromExample = tokenExample.find((item: any) =>
    typeof token === 'string'
      ? item.token === token
      : item.token === token?.name,
  );
  return tokenNameFromExample?.contractName
    ? tokenNameFromExample?.contractName
    : tokenName;
};
const sortedLatestTransactionsData = async (
  filters: any,
  url: any,
  page: any,
) => {
  try {
    const includesTokens = filters.filter((token: TokenType) => token.contract);
    const byToken = includesTokens.map(async (token: TokenType) => {
      const tokensTransactions: any = await API.API.get(url, {
        params: {
          page: page,
          pageSize: 1000,
          contract: token.contract,
        },
      });
      return tokensTransactions.txids.map(async (tx: string) => {
        return fetch(`${process.env.REACT_APP_BLOCKBOOK_API}/api/v2/tx/${tx}`)
          .then((res) => res.json())
          .catch((e) => log(e));
      })[0];
    });
    const parsePromisesByToken = await Promise.allSettled(byToken);

    return parsePromisesByToken.map((item: any) => {
      const t = item.value;
      return {
        txHash: t?.txid,
        method: t?.tokenTransfers ? 'Transfer' : 'Transaction',
        from: t?.tokenTransfers
          ? t?.tokenTransfers?.[0]?.from
          : t?.vin?.[0]?.addresses?.[0],
        to: t?.tokenTransfers
          ? t?.tokenTransfers?.[0]?.to
          : t?.vout?.[0]?.addresses?.[0],
        date: t?.blockTime * 1000,
        block: t?.blockHeight,
        amount: t?.tokenTransfers
          ? Number(formatEther(t?.tokenTransfers[0].value))
          : Number(formatEther(t?.value)),
        token: t?.tokenTransfers?.[0]?.name
          ? getTokenName(t?.tokenTransfers[0].name)
          : 'AMB',
        symbol: t?.tokenTransfers?.[0]?.symbol
          ? getTokenName(t?.tokenTransfers[0]?.symbol)
          : 'AMB',
        txFee: Number(ethers.utils.formatEther(t?.fees)),
      };
    });
  } catch (e) {
    log(e);
  }
};

const blockBookApiTokensSearch: any = async (
  url: string,
  { page, type, limit }: any,
) => {
  try {
    const blockBookApiForT: any = await API.API.get(url, {
      params: {
        page: page,
        pageSize: !type ? limit : 100,
      },
    });

    const array: any =
      blockBookApiForT &&
      blockBookApiForT.tokens &&
      blockBookApiForT.tokens.map(async (token: TokenType) => {
        //TODO надо проверить дожидается ли запроса цикл
        const getTokenData: any = await API.API.get(url, {
          params: {
            page: page,
            pageSize: 1000,
            contract: token.contract,
          },
        });
        return (
          getTokenData &&
          getTokenData.tokens &&
          getTokenData?.tokens.find(
            (item: TokenType) => token.contract === item.contract,
          )
        );
      });
    const promiseArray = array?.length ? await Promise.all(array) : [];
    const flatMap = promiseArray?.length
      ? promiseArray.map((item: any) => item)
      : [];
    return flatMap
      ? flatMap.map((token: TokenType, index: number) => {
          return {
            ...token,
            idx: index + 1,
          };
        })
      : [];
  } catch (e) {
    log(e);
  }
};

const bbDataFilter = async (
  url: string,
  { limit, page, type, selectedTokenFilter }: any,
) => {
  try {
    const bbApi: any = await API.API.get(url, {
      params: {
        page: page,
        pageSize: !type ? limit : selectedTokenFilter ? 1000 : 100,
        contract: selectedTokenFilter ? selectedTokenFilter : '',
      },
    });

    const addressBalance: string = bbApi.balance;

    const blockBookApiTransactions =
      bbApi && bbApi.txids
        ? bbApi.txids.map(async (tx: string) => {
            return await fetch(
              `${process.env.REACT_APP_BLOCKBOOK_API}/api/v2/tx/${tx}`,
            )
              .then((res) => res.json())
              .catch((e) => log(e));
          })
        : [];

    const blockBookApiTransactionsData = await Promise.allSettled(
      blockBookApiTransactions,
    );
    const filteredBlockBookApiTransactionsData =
      (await blockBookApiTransactionsData) &&
      blockBookApiTransactionsData.filter(
        (item: any) => item.value !== undefined,
      );

    const bbTxData =
      filteredBlockBookApiTransactionsData?.map((item: any) => {
        const t = item.value;
        return {
          txHash: t?.txid,
          method: t?.tokenTransfers ? 'Transfer' : 'Transaction',
          from: t?.tokenTransfers
            ? t?.tokenTransfers?.[0]?.from
            : t?.vin?.[0]?.addresses?.[0],
          to: t?.tokenTransfers
            ? t?.tokenTransfers?.[0]?.to
            : t?.vout?.[0]?.addresses?.[0],
          date: t?.blockTime * 1000,
          block: t?.blockHeight,
          amount: t?.tokenTransfers
            ? Number(formatEther(t?.tokenTransfers[0].value))
            : Number(formatEther(t?.value)),
          token: t?.tokenTransfers?.[0]?.name
            ? getTokenName(t?.tokenTransfers[0].name)
            : 'AMB',
          symbol: t?.tokenTransfers?.[0]?.symbol
            ? getTokenName(t?.tokenTransfers[0]?.symbol)
            : 'AMB',
          txFee: ethers.utils.formatUnits(t?.fees, 18),
        };
      }) ?? [];
    return {
      bbApi,
      addressBalance,
      bbTxData,
    };
  } catch (e) {
    log(e);
  }
};

async function explorerData(address: string, { page, limit, type }: any) {
  try {
    const { data: explorerTrans } = await API.getAccountTx(address, {
      page,
      limit,
      type,
    });

    return explorerTrans.map((t: ExplorerTxType) => {
      return {
        txHash: t?.hash,
        method: t?.type,
        from: t?.from,
        to: t?.to,
        date: t?.timestamp * 1000,
        block: t?.blockNumber,
        amount: Number(formatEther(t?.value.wei)),
        token: 'Amber',
        symbol: 'AMB',
        txFee: ethers.utils.formatUnits(t?.gasCost?.wei, 18),
      };
    });
  } catch (e) {
    log(e);
  }
}

export const getDataForAddress = async (address: string, params: any) => {
  const { page, type, selectedTokenFilter } = params;
  const url = `${process.env.REACT_APP_BLOCKBOOK_API}/api/v2/address/${address}`;
  try {
    const blockBookApiTokens: any = await blockBookApiTokensSearch(url, params);
    const { addressBalance, bbApi, bbTxData }: TransactionProps[] | any =
      await bbDataFilter(url, params);

    const defaultFilters: TokenType[] =
      (await getTokensBalance(blockBookApiTokens, address)) || [];
    const exploreData: TransactionProps[] = await explorerData(address, params);

    const latestTransactions: TransactionProps[] =
      (await sortedLatestTransactionsData(defaultFilters, url, page)) || [];

    //TODO дважды метод
    const transactionsAll: any = removeArrayDuplicates(
      [...bbTxData, ...exploreData],
      'block',
    );

    return {
      balance: addressBalance,
      transactions:
        type === 'ERC-20_Tx' || selectedTokenFilter !== undefined
          ? bbTxData
          : transactionsAll,
      tokens: [...defaultFilters],
      latestTransactions,
      meta: bbApi,
    };
  } catch (e) {
    log(e);
  }
};
