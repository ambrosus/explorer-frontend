import API from '../API/api';

export const getAccountsData = async (
  params = { sortTerm: null, next: null },
) => {
  const { sortTerm, next } = params;
  const data: any = await API.getAccounts({
    limit: 50,
    sort: sortTerm,
    next: next,
  });
  return data;
};
