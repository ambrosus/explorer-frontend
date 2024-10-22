import CheckCircle from '../../../../../../../assets/icons/CheckCircle';
import Minus from '../../../../../../../assets/icons/Minus';
import Plus from '../../../../../../../assets/icons/Plus';
import WarningError from '../../../../../../../assets/icons/WarningError';
import Spinner from '../../../../../../../components/Spinner';
import { useEthersAdapter } from '@airdao/ui-library';
import { ethers } from 'ethers';
import React, { memo, useEffect, useMemo, useState } from 'react';

const Method = (props: any) => {
  const [open, setOpen] = React.useState<any>(false);

  const [inputValue, setInputValue] = React.useState<any>({});
  const [payableValue, setPayableValue] = React.useState<any>('0');

  const [result, setResult] = React.useState<any>(null);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [error, setError] = React.useState<any>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { address, isRead, index, method, buttonName } = props;
  const { signer } = useEthersAdapter();

  const readProvider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  const contractCall = async () => {
    setError('');
    setResult(null);
    try {
      setIsLoading(true);

      const providerOrSigner = isRead ? readProvider : signer;

      // @ts-ignore
      const contract = new ethers.Contract(address, [method], providerOrSigner);

      const methodArgs = method.inputs.map(
        // in right order
        (input: any) => inputValue[input.name],
      );
      if (method?.stateMutability === 'payable')
        methodArgs.push({ value: payableValue });

      const methodResponse = await contract[method.name](...methodArgs).then(
        (res: any) => (res.wait ? res.wait() : res),
      );

      if (methodResponse) {
        setResult(methodResponse);
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

    // don't reset results for read method without inputs
    if (!(isRead && method.inputs.length === 0)) {
      setResult(null);
      setResultMessage(null);
    }

    setInputValue('');
    setPayableValue(0);
  };

  // call read method without inputs on load (like etherscan do)
  useEffect(() => {
    if (isRead && method.inputs.length === 0) contractCall().then();
  }, []);

  return (
    <div className="method">
      <div className="method-toggle" onClick={toggleOpen}>
        <div className="open-btn">{!open ? <Plus /> : <Minus />}</div>
      </div>

      <div className="method-name" onClick={toggleOpen}>
        <span>{index + 1}. </span>
        <span style={{ paddingLeft: 8 }}> {method?.name ?? 'name'}</span>
      </div>

      {open && (
        <>
          <div className="method-params">
            {method?.inputs?.map((param: any, index: number) => {
              return (
                <MethodParam
                  key={index}
                  paramName={param.name}
                  paramType={param.type}
                  value={inputValue[param.name]}
                  onChange={(e: any) =>
                    setInputValue((prev: any) => {
                      return { ...prev, [param.name]: e.target.value };
                    })
                  }
                />
              );
            }) ?? null}

            {method?.stateMutability === 'payable' && (
              <MethodParam
                key={'__value'}
                paramName="value"
                paramType="uint"
                value={payableValue}
                onChange={(e: any) => setPayableValue(e.target.value)}
              />
            )}

            {!(isRead && method?.inputs.length === 0) && (
              <div className="contract-method">
                <button className="contract-method-btn" onClick={contractCall}>
                  {buttonName}
                </button>

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
              </div>
            )}
          </div>

          <div className="result">
            {isRead && method.outputs.length !== 0 && (
              <>
                <div className="remaining">
                  <ResultTypeSvg />
                  {method.outputs[0].type}:
                </div>
                <div className="method-result">
                  {result && result.toString()}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

const MethodParam = (props: any) => {
  const { paramName, paramType, value, onChange } = props;

  return (
    <div className="method-params-param">
      <div className="method-params-param-name">
        <span className="method-params-param-name">{paramName}</span>
        <span className="method-params-param-name" style={{ paddingLeft: 4 }}>
          ({paramType})
        </span>
      </div>

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={paramType}
      />
    </div>
  );
};

const ResultTypeSvg = () => {
  return (
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
  );
};

export default memo(Method);
