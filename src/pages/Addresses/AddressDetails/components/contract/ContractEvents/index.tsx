import EventDetails from './EventDetails';
import { ethers, EventFilter } from 'ethers';
import { memo } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';

const ContractEvents = () => {
  const [contractAbi, setContractAbi] = useState<any>([]);
  const { address = '' } = useParams();

  const { data: contractData, isLoading } = useQuery(
    `events data ${address}`,
    () => getContractData(address),
  );
  const [contractRes, setContractRes] = useState<any>();

  const files = contractData?.data?.files || [];
  const status = contractData?.status || '';

  useEffect(() => {
    if (status === 200) {
      const res = files.find((file: any) => file.name === 'metadata.json');
      const parsedContent = JSON.parse(res?.content);

      setContractAbi(parsedContent.output.abi);
    }
  }, [isLoading]);

  let provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  const contract = useMemo(
    () => new ethers.Contract(address, contractAbi, provider),
    [address],
  );

  const {
    data: eventsData = [],
    isSuccess,

    isFetching,
  } = useQuery(
    `events details data ${address}`,
    async () => {
      const block = await provider.getBlockNumber();

      return contract.queryFilter('*' as any, block - 3000, block);
    },
    { suspense: true },
  );

  useEffect(() => {
    // console.log(eventsData);
    eventsData[0].getBlock().then((res) => console.log(res));
    eventsData[0]?.getTransaction().then((res) => console.log(res));
    eventsData[0]?.getTransactionReceipt().then((res) => console.log(res));
    // console.log(eventsData[0]);
  }, [isSuccess]);
  // console.log(contractAbi);

  return (
    <>
      {/* {isSuccess &&
        eventsData
          ?.sort((a, b) => b.blockNumber - a.blockNumber)
          .map((event, index) => (
            <EventDetails
              key={index}
              txHash={event.transactionHash}
              blockNumber={event.blockNumber}
              topics={event.topics}
              contractAbi={contractAbi}
            />
          ))} */}
    </>
  );
};

export default memo(ContractEvents);
