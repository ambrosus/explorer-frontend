import { TParams } from '../../../../../../types';
import ContractInput from '../ContractInput';
import { BigNumber, ethers, providers } from 'ethers';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Method = ({ index, method }: any) => {
  const { filtered } = useParams<TParams>();
  const [result, setResult] = React.useState<any>(null);
  const [paybleValue, setPaybleValue] = React.useState<any>('0');
  const contactAddress = '0x0608595f49a90e8c707Dd1DE7af080f525A610aD';
  const [input, setInput] = React.useState<any>({});
  const [open, setOpen] = React.useState<any>(false);
  const contractCall = async (method: any) => {
    console.log(method);
    try {
      let provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_EXPLORER_NETWORK,
      );
      const { ethereum }: any = window;
      const providerOrSigner =
        filtered === 'write'
          ? new providers.Web3Provider(ethereum).getSigner()
          : provider;
      const contract = new ethers.Contract(
        contactAddress,
        [method],
        providerOrSigner,
      );

      const sortKeysInObjectByRightParamsSequence = (obj: any, method: any) => {
        const rightParamsSequence = method.inputs.map((input: any) => {
          return input.name;
        });

        let keys = Object.keys(obj).sort((a: any, b: any) => {
          return (
            rightParamsSequence.indexOf(a) - rightParamsSequence.indexOf(b)
          );
        });
        let newObj: any = {};
        keys.forEach((key: any) => {
          newObj[key] = obj[key];
        });

        console.log('newObj', newObj);
        return newObj;
      };
      const toSend =
        method?.stateMutability === 'payable'
          ? [
              ...Object.values(
                sortKeysInObjectByRightParamsSequence(input, method),
              ),
              { value: paybleValue },
            ]
          : [
              ...Object.values(
                sortKeysInObjectByRightParamsSequence(input, method),
              ),
            ];

      let value = toSend?.length
        ? await contract?.[`${method.name}`](...toSend)
        : await contract?.[`${method.name}`]();

      console.log(value);
      setResult(value);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (filtered === 'read' && !method?.inputs.length) {
      contractCall(method);
    }
  }, []);

  return (
    <div className="method">
      <div
        className="method-toggle"
        onClick={() => setOpen((prev: any) => !prev)}
      >
        {!open ? (
          <div className="open-btn">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="6"
                width="10"
                height="2"
                rx="1"
                transform="rotate(-180 10 6)"
                fill="#808A9D"
              />
              <rect
                x="4"
                y="10"
                width="10"
                height="2"
                rx="1"
                transform="rotate(-90 4 10)"
                fill="#808A9D"
              />
            </svg>
          </div>
        ) : (
          <div className="open-btn">
            <svg
              width="10"
              height="2"
              viewBox="0 0 10 2"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="10"
                y="2"
                width="10"
                height="2"
                rx="1"
                transform="rotate(-180 10 2)"
                fill="#808A9D"
              />
            </svg>
          </div>
        )}
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
                    value={input[param.name]}
                    onChange={(e: any) =>
                      setInput((prev: any) => {
                        return { ...prev, [param.name]: e.target.value };
                      })
                    }
                    method={method}
                    placeholder={param?.type}
                  />
                </div>
              );
            }) ?? null}
            {method?.stateMutability === 'payable' && (
              <div key={index} className="method-params-param">
                <div className="method-params-param-name">value ( uint )</div>
                <ContractInput
                  key={index}
                  value={paybleValue}
                  onChange={(e: any) => setPaybleValue(e.target.value)}
                  method={method}
                />
              </div>
            )}
            {filtered === 'read' && method?.inputs.length ? (
              <button
                className="ctr-btn"
                onClick={() => {
                  // if (filtered === 'read' && method?.inputs.length === 'payable') {
                  return contractCall(method);
                }}
              >
                Query
              </button>
            ) : null}
            {filtered === 'write' ? (
              <button
                className="ctr-btn"
                onClick={() => {
                  // if (filtered === 'read' && method?.inputs.length === 'payable') {
                  return contractCall(method);
                }}
              >
                Query
              </button>
            ) : null}
          </div>
          <div>
            <div>
              {method?.outputs?.length > 0 && (
                <div>
                  <div className="remaining">
                    <svg
                      style={{ marginRight: '0.2rem' }}
                      width="8"
                      height="10"
                      viewBox="0 0 8 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1 0V9.5H7.5" stroke="#A6B0C3" />
                    </svg>
                    remaining {method.outputs[0].type} :
                  </div>
                </div>
              )}
            </div>
            {result && filtered !== 'write' && (
              <div className="method-result">
                {/*{*/}
                {/*  typeof result === 'string'*/}
                {/*  ? `${result}`*/}
                {/*  : JSON.stringify(result)*/}
                {/*}*/}
                {`${result.toString()}`}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Method;
