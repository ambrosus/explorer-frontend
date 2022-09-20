import Method from '../ReadContract/Method';
import { utils } from 'ethers';
import { useState } from 'react';
import switchChainId from 'utils/switchChainId';

const WriteContract = (props: any) => {
  const { contractAbi, contractAddress } = props;

  const { ethereum }: any = window;
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const writeMethods = contractAbi.filter(
    (method: any) =>
      method.type === 'function' &&
      !(method.stateMutability === 'view' || method.stateMutability === 'pure'),
  );

  const connectHandler = () => {
    if (!ethereum) {
      window.open('https://metamask.io/', '_blank');
      return;
    }

    ethereum.request({ method: 'eth_requestAccounts' }).then(async () => {
      const chainId = await ethereum.request({ method: 'eth_chainId' });
      const appChainId = utils.hexValue(
        +(process.env.REACT_APP_CHAIN_ID ?? 16718),
      );

      if (chainId !== appChainId) await switchChainId(ethereum);

      // todo ????
      ethereum.on('chainChanged', (newChainId: any) => {
        if (newChainId !== appChainId) {
          window.location.reload();
        }
      });

      setIsConnected(true);
    });
  };

  return (
    <>
      <h2 className="contract-tab-title">
        {'Write Contract'}&nbsp;
        <ConnectBtn onClick={connectHandler} isConnected={isConnected} />
      </h2>

      <br />

      <div className="methods">
        {writeMethods.map((method: any, index: number) => {
          return (
            <Method
              key={index}
              index={index}
              method={method}
              buttonName={'Write'}
              address={contractAddress}
              isRead={false}
            />
          );
        })}
      </div>
    </>
  );
};

const ConnectBtn = ({ isConnected, onClick }: any) => {
  return (
    <button className="ctr-btn" onClick={onClick}>
      {isConnected ? (
        <span className="greenCircle" />
      ) : (
        <span className="redCircle" />
      )}
      &nbsp; Connect to Web3
    </button>
  );
};

export default WriteContract;
