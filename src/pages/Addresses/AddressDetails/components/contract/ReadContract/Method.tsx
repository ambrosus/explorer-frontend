import ContractInput from '../ContractInput';
import CheckCircle from 'assets/icons/CheckCircle';
import Minus from 'assets/icons/Minus';
import Plus from 'assets/icons/Plus';
import WarningError from 'assets/icons/WarningError';
import Spinner from 'components/Spinner';
import { ethers, providers } from 'ethers';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const Method = ({ index, method, buttonName }: any) => {
  const { filtered } = useParams<TParams>();
  const [result, setResult] = React.useState<any>(null);
  const [paybleValue, setPaybleValue] = React.useState<any>('0');
  const [error, setError] = React.useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address = '' } = useParams();
  const [inputValue, setInputValue] = React.useState<any>({});
  const [open, setOpen] = React.useState<any>(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const contractCall = async () => {
    setError('');
    setResult(null);
    try {
      setIsLoading(true);
      let provider = new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_EXPLORER_NETWORK,
      );
      const { ethereum }: any = window;
      const providerOrSigner =
        filtered === 'write'
          ? new providers.Web3Provider(ethereum).getSigner()
          : provider;
      const contract = new ethers.Contract(address, [method], providerOrSigner);

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

        return newObj;
      };
      const toSend =
        method?.stateMutability === 'payable'
          ? [
              ...Object.values(
                sortKeysInObjectByRightParamsSequence(inputValue, method),
              ),
              { value: paybleValue },
            ]
          : [
              ...Object.values(
                sortKeysInObjectByRightParamsSequence(inputValue, method),
              ),
            ];

      let value;
      if (toSend?.length) {
        value = await contract?.[`${method.name}`](...toSend).then((res: any) =>
          res.wait ? res.wait() : res,
        );
      } else {
        value = await contract?.[`${method.name}`]();
      }

      console.log(value, 'method');

      if (value) {
        setResult(value);
        setResultMessage('Success!');
      }
    } catch (e: any) {
      if (e.message) {
        setError(e.message);
      }
    }
    setIsLoading(false);
  };

  const renderError = useMemo(() => error.split(' ('), [error]);

  const toggleOpen = () => {
    setOpen(!open);
    setError('');
    setResultMessage(null);
    setInputValue('');
    setPaybleValue(0);
  };

  useEffect(() => {
    if (filtered === 'read' && !method?.inputs.length) {
      contractCall();
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
            <Plus />
          </div>
        ) : (
          <div className="open-btn">
            <Minus />
          </div>
        )}
      </div>
      <div className="method-name" onClick={() => toggleOpen()}>
        <span>{index + 1}. </span>
        <span style={{ paddingLeft: 8, textTransform: 'capitalize' }}>
          {' '}
          {method?.name ?? 'name'}
        </span>
      </div>
      {open && (
        <>
          <div className="method-params">
            {method?.inputs?.map((param: any, index: number) => {
              return (
                <div key={index} className="method-params-param">
                  <div className="method-params-param-name">
                    <span className="method-params-param-name universall_capitalize">
                      {param.name}
                    </span>
                    <span
                      className="method-params-param-name"
                      style={{ paddingLeft: 4 }}
                    >
                      ({param?.type})
                    </span>
                  </div>

                  <input
                    type="text"
                    key={index}
                    value={inputValue[param.name]}
                    onChange={(e: any) =>
                      setInputValue((prev: any) => {
                        return { ...prev, [param.name]: e.target.value };
                      })
                    }
                    placeholder={param?.type}
                  />
                </div>
              );
            }) ?? null}
            {method?.stateMutability === 'payable' && (
              <div key={index} className="method-params-param">
                <div className="method-params-param-name">value ( uint )</div>
                <input
                  type="text"
                  key={index}
                  value={paybleValue}
                  onChange={(e: any) => setPaybleValue(e.target.value)}
                />
              </div>
            )}
            {((filtered === 'read' && method?.inputs.length) ||
              filtered === 'write') && (
              <button className="contract-method" onClick={contractCall}>
                <span className="contract-method-btn">{buttonName} </span>
                {isLoading && <Spinner />}

                {result && resultMessage && (
                  <span className="contract-method-sucess">
                    <CheckCircle /> &nbsp;&nbsp; {resultMessage}
                  </span>
                )}

                {error && (
                  <>
                    <span className="contract-method-icon">
                      <WarningError />
                    </span>
                    <span className="contract-method-message">
                      {renderError[0]}
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
          <div className="result">
            {method?.outputs?.length > 0 && (
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
                remaining {method.outputs[0].type}:
              </div>
            )}
            {result && filtered !== 'write' && (
              <div className="method-result">{`${result.toString()}`}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default memo(Method);
