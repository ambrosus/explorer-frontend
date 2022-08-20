import Method from '../ReadContract/Method';
import { utils } from 'ethers';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';
import switchChainId from 'utils/switchChainId';

const WriteContract = () => {
  const { ethereum }: any = window;
  const [isConnected, setIsConnected] = useState<any>(false);
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address = '' } = useParams();

  const { data: contractData, isLoading } = useQuery(
    `write data ${address}`,
    () => getContractData(address),
  );

  const files = contractData?.data?.files || [];

  useEffect(() => {
    const res = files
      .filter((file: any) => file.name === 'metadata.json')
      .map((file: any) => JSON.parse(file.content))
      .map((file: any) => file.output.abi);

    setContractAbi(res[0] || []);
  }, [isLoading]);

  const btnhandler = () => {
    if (ethereum) {
      ethereum.request({ method: 'eth_requestAccounts' }).then(async () => {
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        const appChainId = utils.hexValue(
          +(process.env.REACT_APP_CHAIN_ID ?? 16718),
        );

        if (chainId !== appChainId) {
          await switchChainId(ethereum);
        }
        ethereum.on('chainChanged', (newChainId: any) => {
          if (newChainId !== appChainId) {
            window.location.reload();
          }
        });
        setIsConnected(true);
      });
    } else {
      window.open('https://metamask.io/', '_blank');
    }
  };

  return (
    <>
      <h2 className="contract-tab-title">
        {'Write Contract'}&nbsp;
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
            return (
              <Method
                key={index}
                index={index}
                method={method}
                buttonName={'Write'}
              />
            );
          })}
      </div>
    </>
  );
};

export default WriteContract;
