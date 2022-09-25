import EventDetails from './EventDetails';
import Discard from 'assets/icons/Discard';
import Search from 'assets/icons/Search';
import Loader from 'components/Loader';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
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
        console.log(inputs);

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
  const [filteredEvents, setFilteredEvents] = useState<any>([]);

  useEffect(() => {
    getEventData();
  }, [isSuccess]);

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setFilteredEvents(eventsToRender);
    setSearchValue(e.target.value);
  };

  const handleFindSubmit = (e: any) => {
    e.preventDefault();
    if (searchValue === '') {
      setFilteredEvents(eventsToRender);
    } else if (ethers.utils.isHexString(searchValue)) {
      setFilteredEvents(
        filteredEvents.filter((event: any) => event.topics[0] === searchValue),
      );
    } else if (!isNaN(Number(searchValue))) {
      setFilteredEvents(
        filteredEvents.filter(
          (event: any) => event.blockNumber === +searchValue,
        ),
      );
    }
  };

  const handleFindValue = (e: any, findValue: any) => {
    e.preventDefault();
    setSearchValue(findValue);

    if (ethers.utils.isHexString(findValue)) {
      setFilteredEvents(
        filteredEvents.filter((event: any) => event.topics[0] === findValue),
      );
    } else if (!isNaN(Number(findValue))) {
      setFilteredEvents(
        filteredEvents.filter((event: any) => event.blockNumber === +findValue),
      );
    }
  };
  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setPage((prev) => prev + 20);
  }, [inView]);

  return (
    <>
      <div className="contract_events">
        <div className="contract_events-table">
          <div className="contract_events-find">
            <form onSubmit={(e) => handleFindSubmit(e)}>
              <label className="contract_events-find-label" htmlFor="html">
                <pre className="contract_events-find-text">Filter by: </pre>
                <input
                  type="text"
                  id="html"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e)}
                  placeholder="Filter by  Block or Topic"
                  className="contract_events-find-input"
                />
                {searchValue === '' ? (
                  <button type="submit" className="contract_events-find-btn">
                    <Search fill={'#808A9D'} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="contract_events-find-btn"
                    onClick={() => setSearchValue('')}
                  >
                    <Discard />
                  </button>
                )}
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
            ?.slice(0, page)
            .sort(
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
                handleFindValue={handleFindValue}
                inputsData={item.inputsData}
                nonTopics={item.nonTopics}
                setSearchValue={setSearchValue}
              />
            ))}
          {eventsToRender.length !== 0 && <div ref={ref}></div>}
        </div>
      </div>
    </>
  );
};

export default memo(ContractEvents);
