import React, { memo } from 'react';
import { firstLetterUp } from 'utils/helpers';
import {NavLink} from "react-router-dom";

const ContractHeader = (props: any) => {
  const { status, metadata } = props;

  const contractName: any = Object.values(
    metadata?.settings?.compilationTarget || {},
  )[0];

  const optimizer = metadata?.settings?.optimizer;

  return (
    <div className="contract-body-header">
      <div className="contract-body-header-title">
        <h2>
          {'Contract Source Code '}
          <span className="verified-contract">{'Verified '}</span>
          <span className="match-contract">{`(${firstLetterUp(
            status,
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
          <span>{metadata?.compiler?.version}</span>
        </p>
        <p>
          {'Implementation address: '}
          <NavLink to={`/address/${props.implementationAddress}`}>{props.implementationAddress}</NavLink>
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
            metadata?.settings?.evmVersion,
          )}`}</span>
        </p>
      </div>
    </div>
  );
};

export default memo(ContractHeader);
