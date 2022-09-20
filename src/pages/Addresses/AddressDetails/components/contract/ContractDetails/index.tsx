import Loader from '../../../../../../components/Loader';
import CodeContract from '../CodeContract';
import ContractEvents from '../ContractEvents';
import ReadContract from '../ReadContract';
import VerifyContract from '../VerifyContract';
import WriteContract from '../WriteContract';
import ContractHeader from './components/ContractHeader';
import ContractTabs from './components/ContractTabs';
import { ethers } from 'ethers';
import React, { memo } from 'react';
import { Navigate } from 'react-router-dom';

const ContractDetails = (props: any) => {
  const { contractInfo, address, selectedTab } = props;

  if (!contractInfo) {
    // we need contract info to render tabs, but this was render before sourcify response.
    // show loader until we get contract info
    return <Loader />;
  }

  const { sourcifyFiles, sourcifyMetadata, contractAbi } = parseSourcifyOutput(
    contractInfo?.data,
  );
  const isContractVerified = !!contractAbi;
  const isContractProxy = checkIsContractProxy(contractAbi);

  const allowedTabs = ['events'];
  if (isContractVerified) allowedTabs.push('code', 'read', 'write');
  if (!isContractVerified) allowedTabs.push('verify');
  if (isContractProxy) allowedTabs.push('readAsProxy', 'writeAsProxy');

  // if wrong tab selected, redirect to /code or /verify tab
  if (!allowedTabs.includes(selectedTab)) {
    const redirectTab = isContractVerified ? 'code' : 'verify';
    return <Navigate to={`/addresses/${address}/contract/${redirectTab}`} />;
  }

  const proxyData = {
    implementationAddress: null,
    implementationAbi: [],
  };
  if (isContractProxy) {
    const readProvider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_EXPLORER_NETWORK,
    );
    const contract = new ethers.Contract(address, contractAbi, readProvider);

    proxyData.implementationAddress = contract
      .implementation()
      .then((res: any) => {
        // todo get implementation abi
        // todo maybe write some info about implementation in contract header
        // todo merge proxy and implementation abi and use it for events tab
      });
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
              contractAbi={proxyData.implementationAbi}
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
              contractAbi={proxyData.implementationAbi}
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
        return <ContractEvents />;
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
