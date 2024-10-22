import Method from './Method';
import { injected } from '@wagmi/core';
import { useAccount, useConnect } from 'wagmi';

const WriteContract = (props: any) => {
  const { contractAbi, contractAddress } = props;

  const { isConnected } = useAccount();
  const { connect } = useConnect();

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
        <ConnectBtn
          onClick={() => connect({ connector: injected() })}
          isConnected={isConnected}
        />
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
