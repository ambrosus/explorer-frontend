import ContractInput from '../ContractInput';
import { ethers } from 'ethers';
import React from 'react';

const Method = ({ index, method }: any) => {
  const [result, setResult] = React.useState<any>(null);
  const contactAddress = '0x0E051C8C1cd519d918DB9b631Af303aeC85266BF';


  const contractCall = async (method: any) => {
    let provider = new ethers.providers.JsonRpcProvider(
      process.env.REACT_APP_EXPLORER_NETWORK,
    );

    const contract = new ethers.Contract(contactAddress, [method], provider);


    let value = await contract?.[`${method.name}`]();
    setResult(value);
  };
  return (
    <div className="method">
      <div className="method-name">
        <span>{index + 1}. </span>
        <span> &nbsp;{method?.name ?? 'name'}</span>
      </div>
      <div className="method-params">
        {method?.inputs.map((param: any, index: number) => (
          <div key={index} className="method-params-param">
            <div className="method-params-param-name">
              {param.name} ( {param?.type} )
            </div>
            <ContractInput method={method} placeholder={param?.type} />
          </div>
        )) ?? null}
        <button className="ctr-btn" onClick={() => contractCall(method)}>
          Query
        </button>
      </div>
      <div>{result && `${result}`}</div>
    </div>
  );
};

export default Method;
