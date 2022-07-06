import React from 'react';

const ContractHeader = () => (
  <div className="contract-body-header">
    <div className="contract-body-header-title">
      <h2>
        Contract Source Code &nbsp;
        <span className="verified-contract">Verified</span> &nbsp;
        <span className="match-contract">(Exact Match)</span>
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

export default ContractHeader;
