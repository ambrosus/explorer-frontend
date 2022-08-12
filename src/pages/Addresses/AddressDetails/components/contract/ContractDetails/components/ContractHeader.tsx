import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { firstLetterUp } from 'utils/helpers';

const ContractHeader = () => {
  const { address } = useParams();
  const { getContractAddressData } = useActions();
  useEffect(() => {
    getContractAddressData(address);
  }, []);

  const [contractInfo, setContractInfo] = useState([]);
  const { data } = useTypedSelector((state) => state?.sourcify);
  const sourcifyData = data?.contractInfo?.data;
  // const files = data?.contractInfo?.data?.files;

  const res = sourcifyData?.files?.find(
    (file: any) => file.name === 'metadata.json',
  );
  const res1 = JSON.parse(res?.content || '{}');
  const res2 = Object.values(res1?.settings?.compilationTarget || {})[0];

  return (
    <div className="contract-body-header">
      <div className="contract-body-header-title">
        <h2>
          {'Contract Source Code '}
          <span className="verified-contract">{'Verified '}</span>
          <span className="match-contract">{`(${sourcifyData?.status} Match)`}</span>
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
