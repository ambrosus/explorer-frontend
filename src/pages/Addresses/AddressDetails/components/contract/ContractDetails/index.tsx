import React from 'react';
import {useParams} from "react-router-dom";
import {Code, ReadContract, WriteContract} from "../index";

const ContractDetails = () => {
  const {filtered} = useParams();

  return (
    <div className="contract-body">
      <div className="contract-body-header">
        Contract Source Code Verified (Exact Match)
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
