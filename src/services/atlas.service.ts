import API from '../API/api';

export const getAtlasData = async (sortTerm: any, next: any) => {
  const data: any = await API.getAtlases({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};
