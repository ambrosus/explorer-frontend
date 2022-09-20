import Method from './Method';
import { memo, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';

const ReadContract = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address = '' } = useParams();

  const { data: contractData, isSuccess } = useQuery(
    `read data ${address}`,
    () => getContractData(address),
  );

  const files = contractData?.data?.files || [];
  const status = contractData?.status || '';

  useEffect(() => {
    if (status === 200) {
      const res = files.find((file: any) => file.name === 'metadata.json');
      const parsedContent = JSON.parse(res?.content);
      setContractAbi(parsedContent.output.abi);
    }
  }, [isSuccess]);

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

export default memo(ReadContract);
