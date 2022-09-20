import EventDetails from './EventDetails';
import Loader from 'components/Loader';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';

const ContractEvents = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);
  const [contract, setContract] = useState<any>();

  const { address = '' } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const provider = useMemo(
    () =>
      new ethers.providers.JsonRpcProvider(
        process.env.REACT_APP_EXPLORER_NETWORK,
      ),
    [process.env.REACT_APP_EXPLORER_NETWORK],
  );

  const { data: contractData, isSuccess } = useQuery(
    `events data ${address}`,
    () => getContractData(address),
  );
  const [eventsData, setEventsData] = useState<any>([]);

  const files = contractData?.data?.files;
  const status = contractData?.status || '';
  const [eventsToRender, setEventsToRender] = useState<any>([]);

  const func = async () => {
    if (status === 200) {
      const res = files.find((file: any) => file.name === 'metadata.json');
      const parsedContent = JSON.parse(res?.content);
      const contract = new ethers.Contract(
        address,
        parsedContent.output.abi,
        provider,
      );
      setContract(contract);
      setContractAbi(parsedContent.output.abi);

      const result = await contract?.queryFilter('*' as any);

      setEventsData(result);

      setIsLoading(false);
    }
  };

  useEffect(() => {
    func();
  }, [isSuccess]);

  useEffect(() => {
    // eventsData[0].getBlock().then((res) => console.log(res));
    // eventsData[0]?.getTransaction().then((res: any) => console.log(res));
    // eventsData[1]?.getTransaction().then((res: any) => console.log(res));
    // eventsData[0]?.getTransactionReceipt().then((res) => console.log(res));
    // console.log(eventsData[0]);
  }, [isLoading]);

  return (
    <>
      <div>{isLoading && <Loader />}</div>
      {eventsData
        ?.sort(
          (a: { blockNumber: number }, b: { blockNumber: number }) =>
            b.blockNumber - a.blockNumber,
        )
        .map((item: any, index: any) => (
          <EventDetails
            key={index}
            txHash={item.transactionHash}
            blockNumber={item.blockNumber}
            topics={item.topics}
            contractAbi={contractAbi}
            event={item.event}
            addresses={item.args}
            eventData={item}
            contract={contract}
          />
        ))}
    </>
  );
};

export default memo(ContractEvents);
