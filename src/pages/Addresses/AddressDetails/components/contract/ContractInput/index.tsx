import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {ethers, providers} from "ethers";

const ContractInput = ({method, ...props}: any) => {


  return (
    <>
      <input type='text' {...props} />
    </>
  );
}

export default ContractInput;
