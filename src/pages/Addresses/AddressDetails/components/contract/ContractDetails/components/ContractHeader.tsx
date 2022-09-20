import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React, { memo, useEffect, useState } from 'react';
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

  const filterFiles = sourcifyData?.files?.find(
    (file: any) => file.name === 'metadata.json',
  );
  const parsedFiles = JSON.parse(filterFiles?.content || '{}');
  const contractName: any = Object.values(
    parsedFiles?.settings?.compilationTarget || {},
  )[0];

  const optimizer = parsedFiles?.settings?.optimizer;

  return (
    <div className="contract-body-header">
      <div className="contract-body-header-title">
        <h2>
          {'Contract Source Code '}
          <span className="verified-contract">{'Verified '}</span>
          <span className="match-contract">{`(${firstLetterUp(
            sourcifyData?.status,
          )} Match)`}</span>
        </h2>
      </div>
      <div className="contract-body-header-info">
        <p>
          {'Contract Name: '}
          <span>{contractName}</span>
        </p>
        <p>
          {'Compiler Version: '}
          <span>{parsedFiles?.compiler?.version}</span>
        </p>
        <p>
          {'Optimization Enabled: '}
          <span>
            {`${
              optimizer?.enabled === true
                ? `Yes with ${optimizer?.runs} runs`
                : 'No'
            } `}
          </span>
        </p>
        <p>
          {'Other Settings: '}
          <span>{`evmVersion: ${firstLetterUp(
            parsedFiles?.settings?.evmVersion,
          )}`}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(ContractHeader);
