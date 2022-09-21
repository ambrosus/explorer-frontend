import EventDetails from './EventDetails';
import Loader from 'components/Loader';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';

const ContractEvents = () => {
  const { address = '' } = useParams();
  const [eventsToRender, setEventsToRender] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>([]);

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

  const files = useMemo(
    () => contractData?.data?.files,
    [contractData?.data?.files],
  );
  const status = useMemo(() => contractData?.status, [contractData?.status]);

  const func = async () => {
    if (status === 200) {
      const res = files.find((file: any) => file.name === 'metadata.json');
      const parsedContent = JSON.parse(res?.content);
      const contract = new ethers.Contract(
        address,
        parsedContent.output.abi,
        provider,
      );

      const result = await contract?.queryFilter('*' as any);

      result.forEach(async (item: any) => {
        const blockData = await item.getBlock();
        const txData = await item.getTransaction();

        const methodId = txData?.data?.substring(0, 10);

        const parseLog = contract.interface.parseLog(item);

        const data = {
          txHash: item.transactionHash || null,
          timestamp: blockData.timestamp || null,
          blockNumber: item.blockNumber || null,
          event: item.event || null,
          methodId: methodId || null,
          inputs: parseLog?.eventFragment.inputs || [],
          addressFrom: txData.from || null,
          addressTo: txData.to || null,
          topics: item.topics || [],
        };
        isLoading &&
          setEventsToRender((prev: any) => {
            let res;
            if (prev === Array) {
              res = data;
            } else {
              res = [...prev, data];
            }
            return res;
          });
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    func();
  }, [isSuccess]);

  return (
    <>
      <div>{eventsToRender.length === 0 && <Loader />}</div>
      {eventsToRender
        ?.sort(
          (a: { blockNumber: number }, b: { blockNumber: number }) =>
            b.blockNumber - a.blockNumber,
        )
        .map((item: any, index: any) => (
          <EventDetails
            key={index}
            addressFrom={item.addressFrom}
            addressTo={item.addressTo}
            blockNumber={item.blockNumber}
            event={item.event}
            inputs={item.inputs}
            methodId={item.methodId}
            timestamp={item.timestamp}
            topics={item.topics}
            txHash={item.txHash}
          />
        ))}
    </>
  );
};

export default memo(ContractEvents);
