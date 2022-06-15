import API from '../API/api';

export const getBlocksData = async (sortTerm: any, next: any) => {
  const data: any = await API.getBlocks({
    limit: 20,
    page: next,
  });
  return data;
};
export const getBlockData = async (hashOrNumber: string) => {
  const data: any = await API.getBlock(hashOrNumber);
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
