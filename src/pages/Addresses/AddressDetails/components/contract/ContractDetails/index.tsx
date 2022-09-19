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

  const sourcifyFiles = contractInfo?.data?.files || [];
  const sourcifyMetadata = parseMetadata(sourcifyFiles);
  const contractAbi = sourcifyMetadata.output?.abi;

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
      default:
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

export default memo(ContractDetails);
