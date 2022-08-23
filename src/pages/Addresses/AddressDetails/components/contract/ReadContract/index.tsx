import Method from './Method';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';

const ReadContract = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address = '' } = useParams();

  const { data: contractData, isLoading } = useQuery(
    `read data ${address}`,
    () => getContractData(address),
  );

  const files = contractData?.data?.files || [];

  useEffect(() => {
    const res = files
      .filter((file: any) => file.name === 'metadata.json')
      .map((file: any) => JSON.parse(file.content))
      .map((file: any) => file.output.abi);

    setContractAbi(res[0]);
  }, [isLoading]);

  return (
    <div>
      <h2 className="contract-tab-title">Read Contract Information</h2>
      <div className="methods">
        {contractAbi
          ?.filter(
            (method: any) =>
              (method.stateMutability === 'view' ||
                method.stateMutability === 'pure') &&
              method.type === 'function',
          )
          .map((method: any, index: number) => {
            return (
              <Method
                key={index}
                index={index}
                method={method}
                buttonName={'Query'}
              />
            );
          })}
      </div>
    </div>
  );
};

export default ReadContract;
