import ContractEvents from '../ContractEvents';
import {
  CodeContract,
  ReadContract,
  WriteContract,
  VerifyContract,
} from '../index';
import ContractHeader from './components/ContractHeader';
import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

const ContractDetails = () => {
  const { filtered } = useParams();

  function getTab() {
    switch (filtered) {
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
      case 'events':
        return <ContractEvents />;
      default:
        return (
          <div className="code_contract">
            <CodeContract />
          </div>
        );
    }
  }

  return (
    <div className="contract-body">
      {filtered !== 'verify' && filtered !== 'events' && <ContractHeader />}
      <div className="contract-body-content">{getTab()}</div>
    </div>
  );
};

export default memo(ContractDetails);
