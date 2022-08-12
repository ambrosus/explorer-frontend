import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { firstLetterUp } from 'utils/helpers';

const ContractHeader = () => {
  const { address } = useParams();
  const { getContractAddressData } = useActions();
  useEffect(() => {
    getContractAddressData(address);
  }, []);
  const { data } = useTypedSelector((state) => state?.sourcify);
  const { status, files } = data?.contractInfo?.data || [];

  return (
    <div className="contract-body-header">
      <div className="contract-body-header-title">
        <h2>
          {'Contract Source Code '}
          <span className="verified-contract">{'Verified '}</span>
          <span className="match-contract">{`(${status} Match)`}</span>
        </h2>
      </div>
      <div className="contract-body-header-info">
        <p>
          Contract Name:
          <span>LooksRareToken</span>
        </p>
        <p>
          Compiler Version:
          <span>v0.8.7+commit.e28d00a7</span>
        </p>
        <p>
          Optimization Enabled:
          <span>Yes with 888888 runs</span>
        </p>
        <p>
          Other Settings:
          <span>default evmVersion</span>
        </p>
      </div>
    </div>
  );
};

export default ContractHeader;
