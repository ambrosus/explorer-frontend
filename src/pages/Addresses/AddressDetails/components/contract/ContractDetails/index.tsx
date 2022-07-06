import { Code, ReadContract, WriteContract } from '../index';
import ContractHeader from './components/ContractHeader';
import React from 'react';
import { useParams } from 'react-router-dom';

const ContractDetails = () => {
  const { filtered } = useParams();

  function getTab() {
    switch (filtered) {
      case 'code':
        return (
          <div className="contract_code">
            <Code />
          </div>
        );
      case 'read':
        return (
          <div className="contract_read">
            <ReadContract />
          </div>
        );
      case 'write':
        return (
          <div className="contract_write">
            <WriteContract />
          </div>
        );
      default:
        return (
          <div className="contract_code">
            <Code />
          </div>
        );
    }
  }

  return (
    <div className="contract-body">
      <ContractHeader />
      <div className="contract-body-content">{getTab()}</div>
    </div>
  );
};

export default ContractDetails;
