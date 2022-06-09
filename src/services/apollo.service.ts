import API from '../API/api';

export const getApollosData = async (sortTerm: any, next: any) => {
  const data: any = await API.getApollos({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};

// https://explorer-api.ambrosus.io/accounts/0xF1e149223A0614F2DA591db097fe95101c46bDFc/transactions?type=&limit=50&page=2
// https://explorer-api.ambrosus.io/apollos/0xF1e149223A0614F2DA591db097fe95101c46bDFc/rewards?from=6%2F9%2F2022
// https://explorer-api.ambrosus.io/apollos/0xF1e149223A0614F2DA591db097fe95101c46bDFc

export const getApolloData = async (sortTerm: any, next: any) => {
  const data: any = await API.getApollo({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};

export const getApolloRewardsData = async (
  sortTerm: any,
  next: any,
  address: string,
) => {
  const data: any = await API.getApolloRewards(address, {
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};

export const getAccountTxData = async (
  sortTerm: any,
  next: any,
  address: any,
) => {
  const params = !next
    ? {
      limit: 20,
      type: sortTerm,
    }
    : {
      limit: 20,
      type: sortTerm,
      page: next,
    };
  console.log('params',params);
  const data: any = await API.getAccountTx(address, params);
  return data;
};
