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
import React, { memo } from 'react';
import { useQuery } from 'react-query';
import { Navigate } from 'react-router-dom';

const ContractDetails = (props: any) => {
  const { contractInfo, address, selectedTab } = props;

  const { sourcifyFiles, sourcifyMetadata, contractAbi } = parseSourcifyOutput(
    contractInfo?.data,
  );
  const { data: proxyImplAbi, isLoading } = useQuery('implAddress', () =>
    getProxyImplAbi(contractAbi, address),
  );

  // don't show anything before we get the proxy impl abi
  if (isLoading) return <Loader />;

  const isContractVerified = !!contractAbi;

  const allowedTabs = [];
  if (isContractVerified) allowedTabs.push('code', 'read', 'write', 'events');
  if (!isContractVerified) allowedTabs.push('verify');
  if (proxyImplAbi?.length) allowedTabs.push('readAsProxy', 'writeAsProxy');

  // if wrong tab selected, redirect to /code or /verify tab
  if (!allowedTabs.includes(selectedTab)) {
    const redirectTab = isContractVerified ? 'code' : 'verify';
    return <Navigate to={`/addresses/${address}/contract/${redirectTab}`} />;
  }

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
            <VerifyContract />
          </div>
        );
      case 'events':
        return <ContractEvents abi={[...contractAbi, ...proxyImplAbi]} />;
    }
  }

  return (
    <div className="contract">
      <ContractTabs
        address={address}
        allowedTabs={allowedTabs}
        selectedTab={selectedTab}
      />

      <div className="contract-details">
        <div className="contract-body">
          {selectedTab !== 'verify' && selectedTab !== 'events' && (
            <ContractHeader
              sourcifyStatus={contractInfo?.data?.status}
              metadata={sourcifyMetadata}
            />
          )}

          <div className="contract-body-content">{getTab()}</div>
        </div>
      </div>
    </div>
  );
};

const getProxyImplAbi = async (proxyAbi: any, address: string) => {
  // if contract is proxy, fetch implementation address and abi for that address
  if (!checkIsContractProxy(proxyAbi)) return [];

  const readProvider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  try {
    const contract = new ethers.Contract(address, proxyAbi, readProvider);
    const implAddress = await contract.implementation();

    const sourcifyData = await api.getContract(implAddress);
    const { contractAbi: implAbi } = parseSourcifyOutput(sourcifyData?.data);

    return implAbi;
  } catch (e) {
    return [];
  }
};

const checkIsContractProxy = (abi: any): boolean => {
  if (!abi) return false;

  const fallback = abi.find((item: any) => item.type === 'fallback');
  if (!fallback) return false;

  const implementation = abi.find(
    (item: any) => item.name === 'implementation',
  );
  if (
    !implementation ||
    implementation.type !== 'function' ||
    implementation.stateMutability !== 'view' ||
    implementation.outputs[0]?.type !== 'address'
  )
    return false;

  return true;
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
    status: sourcifyData.status,
  };
};

export default memo(ContractDetails);
