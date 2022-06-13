import API from '../API/api';

export const getAtlasesData = async (sortTerm: any, next: any) => {
  const data: any = await API.getAtlases({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};
export const getAtlasData = async (address: string,) => {
  const data: any = await API.getAtlas(address)
  return data;
};

export const getAccountsTxDataAtlas = async (
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
  const data: any = await API.getAccountTx(address, params);
  return data;
};
