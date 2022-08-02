import API from '../API/api';

export const getApollosData = async (sortTerm: any, next: any) => {
  const data: any = await API.getApollos({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};

export const getApolloData = async (address: string) => {
  const data: any = await API.getApollo(address);
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
  const data: any = await API.getAccountTx(address).catch(
    () => (window.location.href = '/notfound'),
  );
  return data;
};
