import Method from '../ReadContract/Method';
import { useWeb3React } from '@web3-react/core';
// @ts-ignore
import { useAuthorization } from 'airdao-components-and-tools/hooks';
// @ts-ignore
import { metamaskConnector } from 'airdao-components-and-tools/utils';

const WriteContract = (props: any) => {
  const { contractAbi, contractAddress } = props;

  const web3ReactInstance = useWeb3React();
  const { loginMetamask } = useAuthorization(metamaskConnector);
  const { account } = web3ReactInstance;

  if (!contractAbi) return <></>;
  const writeMethods = contractAbi
    ?.filter(
      (method: any) =>
        method.type === 'function' &&
        !(
          method.stateMutability === 'view' || method.stateMutability === 'pure'
        ),
    )
    .map((el: any, i: number) => ({ ...el, name: el.name || 'name' + i }));

  return (
    <>
      <h2 className="contract-tab-title">
        {'Write Contract'}&nbsp;
        <ConnectBtn onClick={loginMetamask} isConnected={!!account} />
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
      &nbsp;{isConnected ? ' Connected to Web3' : ' Connect to Web3'}
    </button>
  );
};

export default WriteContract;
