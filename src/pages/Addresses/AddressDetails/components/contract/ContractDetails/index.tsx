import CodeContract from '../CodeContract';
import ReadContract from '../ReadContract';
import VerifyContract from '../VerifyContract';
import WriteContract from '../WriteContract';
import ContractHeader from './components/ContractHeader';
import ContractTabs from './components/ContractTabs';
import React, { memo } from 'react';

const ContractDetails = (props: any) => {
  const { contractInfo, address, selectedTab, setTransactionType } = props;

  function getTab() {
    switch (selectedTab) {
      case 'code':
        return (
          <div className="code_contract">
            <CodeContract />
          </div>
        );
      case 'read':
        return (
          <div className="read_contract">
            <ReadContract />
          </div>
        );
      case 'write':
        return (
          <div className="write_contract">
            <WriteContract />
          </div>
        );
      case 'verify':
        return (
          <div className="verify_contract">
            <VerifyContract />
          </div>
        );
      default:
        return (
          <div className="code_contract">
            <CodeContract />
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
        setTransactionType={setTransactionType}
      />

      <div className="contract-details">
        <div className="contract-body">
          {selectedTab !== 'verify' && <ContractHeader />}
          <div className="contract-body-content">{getTab()}</div>
        </div>
      </div>
    </div>
  );
};

export default memo(ContractDetails);
