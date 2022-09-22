import EventDetails from './EventDetails';
import Search from 'assets/icons/Search';
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

  const getEventData = async () => {
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

        const inputs = parseLog?.eventFragment.inputs || [];
        const inputsData = inputs.map((input: any) => {
          return {
            name: input.name,
            type: input.type,
            value: parseLog?.args[input.name],
            indexed: input.indexed,
          };
        });
        const nonTopics = inputsData.filter((input: any) => !input.indexed);

        const data = {
          txHash: item.transactionHash || null,
          timestamp: blockData.timestamp || null,
          blockNumber: item.blockNumber || null,
          event: item.event || null,
          methodId: methodId || null,
          addressFrom: txData.from || null,
          addressTo: txData.to || null,
          topics: item.topics || [],
          inputs,
          inputsData,
          nonTopics,
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

        isLoading &&
          setFilteredEvents((prev: any) => {
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
  const [searchValue, setSearchValue] = useState('');
  const [filteredEvents, setFilteredEvents] = useState<any>([]);

  useEffect(() => {
    getEventData();
  }, [isSuccess]);

  const handleFindValue = (e: any) => {
    e.preventDefault();
  };

  const handleSubmitFormEvent = (e: any) => {
    e.preventDefault();
    // const str = searchValue.substring(0, 2);

    if (searchValue === '') {
      setFilteredEvents(eventsToRender);
    } else if (ethers.utils.isHexString(searchValue)) {
      console.log('pusto');
      setFilteredEvents(
        filteredEvents.filter((event: any) => event.topics[0] === searchValue),
      );
    } else if (!isNaN(Number(searchValue))) {
      setFilteredEvents(
        filteredEvents.filter(
          (event: any) => event.blockNumber === +searchValue,
        ),
      );
    } else {
      console.log('pusto');
    }
    console.log(searchValue);
  };

  console.log(filteredEvents);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setFilteredEvents(eventsToRender);
    setSearchValue(e.target.value);
  };

  return (
    <>
      <div className="contract_events">
        <div className="contract_events-table">
          <div className="contract_events-find">
            <form onSubmit={(e) => handleSubmitFormEvent(e)}>
              <label className="contract_events-find-label" htmlFor="html">
                <input
                  type="text"
                  id="html"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e)}
                  placeholder="Filter by  Block or Topic"
                  className="contract_events-find-input"
                />
                <button type="submit" className="contract_events-find-btn">
                  <Search fill={'#808A9D'} />
                </button>
              </label>
            </form>
          </div>
          <div className="contract_events-heading">
            <div className="contract_events-heading-cell">Txn Hash</div>
            <div className="contract_events-heading-cell">Block</div>
            <div className="contract_events-heading-cell">Method ID</div>
            <div className="contract_events-heading-cell">Logs</div>
          </div>

          <div>{eventsToRender.length === 0 && <Loader />}</div>

          {filteredEvents
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
                searchValue={searchValue}
                uint256={item.uint256}
                handleFindValue={handleFindValue}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default memo(ContractEvents);
