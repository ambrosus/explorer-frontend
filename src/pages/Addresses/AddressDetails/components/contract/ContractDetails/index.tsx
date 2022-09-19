import CodeContract from '../CodeContract';
import ContractEvents from '../ContractEvents';
import ReadContract from '../ReadContract';
import VerifyContract from '../VerifyContract';
import WriteContract from '../WriteContract';
import ContractHeader from './components/ContractHeader';
import ContractTabs from './components/ContractTabs';
import React, { memo } from 'react';

const ContractDetails = (props: any) => {
  const { contractInfo, address, selectedTab } = props;

  const { sourcifyFiles, sourcifyMetadata, contractAbi } =
    parseSourcifyOutput(contractInfo);
  const isContractVerified = !!contractAbi;

  if (!isContractVerified && selectedTab !== 'verify') {
    // todo redirect to verify tab
  }

  // only if contract verified
  if (isContractProxy(contractAbi)) {
    // todo get implementation address
    // todo get implementation abi
    // todo readAsProxy and writeAsProxy tab
    // todo maybe write some info about implementation in contract header
    // todo merge proxy and implementation abi and use it for events tab
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
            <ReadContract contractAbi={contractAbi} />
          </div>
        );
      case 'write':
        return (
          <div className="write_contract">
            <WriteContract contractAbi={contractAbi} />
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
      default:  // todo redirect to .../contract/
        return (
          <div className="code_contract">
            <CodeContract files={sourcifyFiles} abi={contractAbi} />
          </div>
        );
    }
  }

  return (
    <div className="contract">
      <ContractTabs
        contractInfo={contractInfo}
        address={address}
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

const isContractProxy = (abi: any): boolean => {
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
  const parseMetadata = (sourcifyFiles: any) => {
    const metadata = sourcifyFiles.find(
      (file: any) => file.name === 'metadata.json',
    );
    try {
      return JSON.parse(metadata?.content);
    } catch (e) {
      console.error(e);
      return {};
    }
  };

  const sourcifyFiles = sourcifyData?.data?.files || [];
  const sourcifyMetadata = parseMetadata(sourcifyFiles);
  const contractAbi = sourcifyMetadata.output?.abi;

  return { sourcifyFiles, sourcifyMetadata, contractAbi };
};

export default memo(ContractDetails);
