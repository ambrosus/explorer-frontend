import API2 from 'API/newApi';

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
  const data: any = await API2.getBlockTransactions(hashOrNumber, params);
  return data;
};
