import { ethers, providers } from 'ethers';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ContractInput = ({ method, ...props }: any) => {
  return (
    <>
      <input type="text" {...props} />
    </>
  );
};

export default ContractInput;
