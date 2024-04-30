import CodeContract from '../CodeContract';
import ContractEvents from '../ContractEvents';
import ReadContract from '../ReadContract';
import VerifyContract from '../VerifyContract';
import WriteContract from '../WriteContract';
import ContractHeader from './components/ContractHeader';
import ContractTabs from './components/ContractTabs';
import api from 'API/api';
import Loader from 'components/Loader';
import { ethers } from 'ethers';
import React, { memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const ContractDetails = (props: any) => {
  const { contractInfo, address, updateContract } = props;
  const [selectedTab, selectTab] = useState('verify');

  useEffect(() => {
    selectTab(
      contractInfo.error === 'Files have not been found!' ? 'verify' : 'code',
    );
  }, [contractInfo]);

  const { sourcifyFiles, sourcifyMetadata, contractAbi } =
    parseSourcifyOutput(contractInfo);
  const { data: implementation, isLoading } = useQuery(
    `implAddress ${address}`,
    () => getImplementation(address),
  );

  // don't show anything before we get the proxy impl abi
  if (isLoading) return <Loader />;

  const isContractVerified = !!contractAbi;
  const proxyImplAbi = implementation?.abi ?? [];

  const allowedTabs = [];
  if (isContractVerified) allowedTabs.push('code', 'read', 'write', 'events');
  if (!isContractVerified) allowedTabs.push('verify', 'events');
  if (proxyImplAbi.length) allowedTabs.push('readAsProxy', 'writeAsProxy');

  function getTab() {
    switch (selectedTab) {
      case 'code':
        return (
          <div className="code_contract">
            <CodeContract files={sourcifyFiles} contractAbi={contractAbi} />
          </div>
        );
      case 'read':
        return (
          <div className="read_contract">
            <ReadContract contractAbi={contractAbi} contractAddress={address} />
          </div>
        );
      case 'readAsProxy':
        return (
          <div className="read_contract">
            <ReadContract
              contractAbi={proxyImplAbi}
              contractAddress={address}
            />
          </div>
        );
      case 'write':
        return (
          <div className="write_contract">
            <WriteContract
              contractAbi={contractAbi}
              contractAddress={address}
            />
          </div>
        );
      case 'writeAsProxy':
        return (
          <div className="write_contract">
            <WriteContract
              contractAbi={proxyImplAbi}
              contractAddress={address}
            />
          </div>
        );
      case 'verify':
        return (
          <div className="verify_contract">
            <VerifyContract updateContract={updateContract} />
          </div>
        );
      case 'events':
        return <ContractEvents abi={[...(contractAbi ?? []), ...proxyImplAbi]} />;
    }
  }

  return (
    <div className="contract">
      <ContractTabs
        address={address}
        allowedTabs={allowedTabs}
        selectedTab={selectedTab}
        selectTab={selectTab}
      />

      <div className="contract-details">
        <div className="contract-body">
          {selectedTab !== 'verify' && selectedTab !== 'events' && (
            <ContractHeader
              sourcifyStatus={contractInfo?.data?.status}
              metadata={sourcifyMetadata}
              implementationAddress={implementation?.address}
            />
          )}

          <div className="contract-body-content">{getTab()}</div>
        </div>
      </div>
    </div>
  );
};

const getImplementation = async (address: string) => {
  // if contract is proxy, fetch implementation address and abi for that address
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

    const sourcifyData = await api.getContract(implAddress);
    const { contractAbi: implAbi } = parseSourcifyOutput(sourcifyData?.data);

    return { address: implAddress, abi: implAbi };
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

export default memo(ContractDetails);
