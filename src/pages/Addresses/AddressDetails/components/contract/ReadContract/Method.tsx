import ContractInput from '../ContractInput';
import {BigNumber, ethers} from 'ethers';
import React, {useEffect} from 'react';

const Method = ({index, method}: any) => {
  const [result, setResult] = React.useState<any>(null);
  const contactAddress = '0x0E051C8C1cd519d918DB9b631Af303aeC85266BF';
  const [input, setInput] = React.useState<any>(null);
  const [open, setOpen] = React.useState<any>(true);
  const contractCall = async (method: any) => {
    console.log(method);
    try {
      let provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_EXPLORER_NETWORK,
      );

      const wallet = new ethers.Wallet(
        'c6856021db1f5c00619e4042327deeecda4adb6b4523015f96db155368480987',
        provider,
      );

      const contract = new ethers.Contract(contactAddress, [method], provider);
      let contractWithSigner = await contract.connect(wallet);

      // let getNodes = await contractWithSigner?.getNodes('1', '3')
      // console.log(getNodes);
      let value =
        input
          ? await contractWithSigner?.[`${method.name}`](input)
          : await contractWithSigner?.[`${method.name}`]();

      setResult(value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      className="method"
    >
      <div className="method-toggle"
           onClick={() => setOpen((prev: any) => !prev)}>
        {
          open
            ? (<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="6" width="10" height="2" rx="1" transform="rotate(-180 10 6)" fill="#808A9D"/>
              <rect x="4" y="10" width="10" height="2" rx="1" transform="rotate(-90 4 10)" fill="#808A9D"/>
            </svg>)
            : (<svg width="10" height="2" viewBox="0 0 10 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="2" width="10" height="2" rx="1" transform="rotate(-180 10 2)" fill="#808A9D"/>
              </svg>
            )
        }


      </div>
      <div className="method-name">
        <span>{index + 1}. </span>
        <span> &nbsp;{method?.name ?? 'name'}</span>
      </div>
      {open && (
        <>
          <div className="method-params">
            {method?.inputs?.map((param: any, index: number) => {
              return (
                <div key={index} className="method-params-param">
                  <div className="method-params-param-name">
                    {param.name} ( {param?.type} )
                  </div>
                  <ContractInput
                    key={index}
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    method={method}
                    placeholder={param?.type}/>
                </div>
              )
            }) ?? null}
            <button className="ctr-btn" onClick={() => contractCall(method)}>
              Query
            </button>
          </div>
          <div>
            <div>
              {method?.outputs?.length > 0 && (
                <div>
                  <div className='remaining'>
                    <svg
                      style={{marginRight: '0.2rem'}}
                      width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 0V9.5H7.5" stroke="#A6B0C3"/>
                    </svg>
                    remaining {method.outputs[0].type} :
                  </div>

                </div>
              )}
            </div>
            {
              result &&
              <div className="method-result">
                {
                  typeof result === 'string' || result?.toString()
                    ? `${result}` : JSON.stringify(result)

                }
              </div>
            }
          </div>
        </>
      )}

    </div>
  );
};

export default Method;
