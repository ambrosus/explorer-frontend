import API from '../API/api';

export const getBlocksData = async (sortTerm: any, next: any) => {
  const data: any = await API.getBlocks({
    limit: 20,
    sort: sortTerm,
    next: next,
  });
  return data;
};
export const getBlockData = async (address: string) => {
  const data: any = await API.getBlock(address);
  return data;
};

export const getAccountsTxDataBlock = async (
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
