import SOURCIFYAPI from 'API/api';
import API from 'API/api';
import { ethers } from 'ethers';

export const getContractData = async (address: string) => {
  const contractInfo = await SOURCIFYAPI.getContract(address);
  return parseSourcifyOutput(contractInfo?.data);
};

export const getAccountData = async (address: string) => {
  return await API.getAccount(address);
};

export async function getContractDataWithProxy(address: string) {
  const contractData = await getContractData(address);
  const result = {
    ...contractData,
    implAddress: undefined as string | undefined,
    implAbi: undefined as string[] | undefined,
  };

  try {
    result.implAddress = await getImplementationAddress(address);
    if (result.implAddress) {
      const implData = await getContractData(result.implAddress);
      result.implAbi = implData?.contractAbi;
    }
  } catch (e) {
    console.error(e);
  }

  return result;
}

const getImplementationAddress = async (address: string) => {
  const readProvider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  try {
    // https://eips.ethereum.org/EIPS/eip-1967#logic-contract-address
    const implStorageSlot =
      '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc';
    const implAddressBytes32 = await readProvider.getStorageAt(
      address,
      implStorageSlot,
    );
    const implAddress = '0x' + implAddressBytes32.slice(-40);
    if (implAddress === ethers.constants.AddressZero) return undefined;
    return implAddress;
  } catch (e) {
    return undefined;
  }
};

const parseSourcifyOutput = (sourcifyData: any) => {
  const files = sourcifyData?.files || [];
  const metadataFile = files.find((file: any) => file.name === 'metadata.json');
  const metadata = metadataFile ? JSON.parse(metadataFile.content) : null;
  const contractAbi = metadata?.output?.abi;
  return {
    sourcifyFiles: files,
    sourcifyMetadata: metadata,
    contractAbi,
    status: sourcifyData?.status,
  };
};
