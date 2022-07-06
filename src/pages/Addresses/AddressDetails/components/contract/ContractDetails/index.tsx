import React from 'react';
import {useParams} from "react-router-dom";
import {Code, ReadContract, WriteContract} from "../index";

const ContractDetails = () => {
  const {filtered} = useParams();

  return (
    <div className="contract-body">
      <div className="contract-body-header">
        <div className="contract-body-header-title">
          <h2>
            Contract Source Code &nbsp;
            <span className='verified-contract'>Verified</span> &nbsp;
            <span className='match-contract'>(Exact Match)</span>
          </h2>
        </div>
        <div className="contract-body-header-info">
          <p>
            Contract Name:
            <span>
               LooksRareToken
            </span>
          </p>
          <p>
            Compiler Version:
            <span>
               v0.8.7+commit.e28d00a7
            </span>
          </p>
          <p>
            Optimization Enabled:
            <span>
               Yes with 888888 runs
            </span>
          </p>
          <p>
            Other Settings:
            <span>
               default evmVersion
            </span>
          </p>
        </div>
      </div>
      <div className="contract-body-content">
        {filtered === 'code' && (
          <div className="contract_code">
            <Code/>
          </div>
        )}

        {filtered === 'read' && (
          <div className="contract_read">
            <ReadContract/>
          </div>
        )}

        {filtered === 'write' && (
          <div className="contract_write">
            <WriteContract/>
          </div>
        )}
      </div>
    </div>
  );
}

export default ContractDetails;
