import API from '../API/api';

export const getAtlasesData = async (sortTerm: any, next: any) => {
  const data: any = await API.getAtlases({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};
export const getAtlasData = async (address: string) => {
  const data: any = await API.getAtlas(address);
  return data;
};
