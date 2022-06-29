import API from '../API/api';

export const getAccountsData = async (sortTerm: any, next: any) => {
  const data: any = await API.getAccounts({
    limit: 50,
    sort: sortTerm,
    next: next,
  });
  return data;
};
