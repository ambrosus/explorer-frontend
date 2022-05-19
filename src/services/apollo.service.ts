import API from '../API/api';

export const getApolloData = async (sortTerm: any, next: any) => {
  const data: any = await API.getApollos({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};
