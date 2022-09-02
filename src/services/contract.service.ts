import SOURCIFYAPI from 'API/api';
import API from 'API/api';

export const getContractData = async (address: string) => {
  return await SOURCIFYAPI.getContract(address);
};

export const getAccountData = async (address: string) => {
  return await API.getAccount(address);
};
