import Method from './Method';
import { useConnectWalletModal } from '@airdao/ui-library';
import { useAccount } from 'wagmi';

const WriteContract = (props: any) => {
  const { contractAbi, contractAddress } = props;

  const { isConnected } = useAccount();
  const { toggleModal } = useConnectWalletModal();

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
        <ConnectBtn onClick={toggleModal} isConnected={isConnected} />
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
