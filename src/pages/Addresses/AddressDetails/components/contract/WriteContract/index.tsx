import { useActions } from '../../../../../../hooks/useActions';
import { useTypedSelector } from '../../../../../../hooks/useTypedSelector';
import switchChainId from '../../../../../../utils/switchChainId';
import Method from '../ReadContract/Method';
import { utils } from 'ethers';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const WriteContract = () => {
  const { ethereum }: any = window;
  const [isConnected, setIsConnected] = useState<any>(false);
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address } = useParams();

  const { getContractAddressData } = useActions();
  useEffect(() => {
    getContractAddressData(address);
  }, []);
  const { data } = useTypedSelector((state) => state?.sourcify);

  const files = data?.contractInfo?.data?.files || [];

  useEffect(() => {
    const res = files
      .filter((file: any) => file.name === 'metadata.json')
      .map((file: any) => JSON.parse(file.content))
      .map((file: any) => file.output.abi);

    setContractAbi(res[0] || []);
  }, [files]);

  const btnhandler = () => {
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' }).then(async () => {
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        const hexChainId = utils.hexValue(+chainId);

        //TODO: get from .env
        if (hexChainId !== '0x5618') {
          await switchChainId(ethereum, '22040');
        }
        ethereum.on('chainChanged', (newChainId: any) => {
          if (newChainId !== '0x5618') {
            window.location.reload();
          }
        });
        setIsConnected(true);
      });
    } else {
      alert('install metamask extension!!');
    }
  };

  return (
    <>
      <h2 className="contract-tab-title">
        Contract Source Code&nbsp;
        <button className="ctr-btn" onClick={btnhandler}>
          {isConnected ? (
            <span className="greenCircle" />
          ) : (
            <span className="redCircle" />
          )}
          &nbsp; Connect to Web3
        </button>
      </h2>

      <br />

      <div className="methods">
        {contractAbi
          // .filter(
          //   (method: any) => !method.constant && method.type === 'function',
          // )
          .filter(
            (method: any) =>
              method.stateMutability !== 'view' &&
              method.stateMutability !== 'pure' &&
              method.type === 'function',
          )
          .map((method: any, index: number) => {
            return <Method key={index} index={index} method={method} />;
          })}
      </div>
    </>
  );
};

export default WriteContract;
