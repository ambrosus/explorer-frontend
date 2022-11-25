import API from '../API/api';
import API2 from 'API/newApi';

export const getBlocksData = async (sortTerm: any, next: any) => {
  const data: any = await API.getBlocks({
    limit: 20,
    page: next,
  });
  return data;
};
export const getBlockData = async (hashOrNumber: string) => {
  const data: any = await API2.getBlock(hashOrNumber);
  return data;
};

export const getBlockTransactionsData = async (
  sort?: any,
  next?: any,
  hashOrNumber?: any,
) => {
  const params = !next
    ? {
        limit: 20,
      }
    : {
        limit: 20,
        page: next,
      };
  const data: any = await API.getBlockTransactions(hashOrNumber, params);
  return data;
};
