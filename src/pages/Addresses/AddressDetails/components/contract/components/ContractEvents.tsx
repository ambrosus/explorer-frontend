import { Button } from '@airdao/ui-library';
import Discard from 'assets/icons/Discard';
import NotFoundIcon from 'assets/icons/Errors/NotFoundIcon';
import Search from 'assets/icons/Search';
import EventDetails from 'components/EventDetails';
import Loader from 'components/Loader';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useParams } from 'react-router-dom';
import { sliceData5 } from 'utils/helpers';

const BLOCK_RANGE = 1_000;
const EVENTS_PER_PAGE = 50;

const ContractEvents = ({ abi }: any) => {
  const { address } = useParams();

  const [fetchedEvents, setFetchedEvents] = useState<ethers.Event[]>([]);
  const [eventsToDisplay, setEventsToDisplay] = useState<number>(0);

  const [searchValue, setSearchValue] = useState('');
  const [findInputValue, setFindInputValue] = useState('');
  const [isShowFindResult, setIsShowFindResult] = useState(false);
  const [filterBy, setFilterBy] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [oldestBlock, setOldestBlock] = useState<number | undefined>(undefined);

  const { ref, inView } = useInView();

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );
  const contract = new ethers.Contract(address ?? '', abi, provider);

  const loadMoreEvents = async () => {
    setEventsToDisplay((prev) => prev + EVENTS_PER_PAGE);
    console.log('loadMoreEvents', eventsToDisplay, fetchedEvents.length);

    if (eventsToDisplay > fetchedEvents.length) {
      const newOldestBlock = !oldestBlock
        ? await getEventData()
        : await getEventData(oldestBlock - BLOCK_RANGE, oldestBlock);

      setOldestBlock(newOldestBlock);
    }
  };

  const getEventData = async (fromBlock?: number, toBlock?: number) => {
    if (isLoading) return;
    setIsLoading(true);

    const { events, oldestBlock } = await fetchEvents(
      contract,
      fromBlock,
      toBlock,
    );

    setFetchedEvents([...fetchedEvents, ...events]);
    setIsLoading(false);

    return oldestBlock;
  };

  useEffect(() => {
    loadMoreEvents();
  }, []);

  const filteredEvents = useMemo(() => {
    const eventsClamped = fetchedEvents.slice(0, eventsToDisplay);

    if (findInputValue === '') return eventsClamped;

    if (ethers.utils.isHexString(findInputValue)) {
      setFilterBy('Topic');
      return eventsClamped.filter(
        (event: any) => event.topics[0] === findInputValue,
      );
    }

    if (!isNaN(Number(findInputValue))) {
      setFilterBy('Block');
      return eventsClamped.filter(
        (event: any) => event.blockNumber === +findInputValue,
      );
    }

    return [];
  }, [fetchedEvents, findInputValue, eventsToDisplay]);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setFindInputValue(e.target.value);
    }
    setIsShowFindResult(false);
  };

  const handleFilter = (e: any, findValue: any) => {
    e.preventDefault();

    setSearchValue(findValue);
    setFindInputValue(findValue);
    setIsShowFindResult(true);
  };

  const clearFindValue = () => {
    setSearchValue('');
    setFindInputValue('');
    setIsShowFindResult(false);
  };

  useEffect(() => {
    loadMoreEvents();
  }, [inView]);

  return (
    <>
      <div className="contract_events">
        <div className="contract_events-table">
          <div className="contract_events-find">
            {isShowFindResult && (
              <pre className="contract_events-find-modal">
                {`Filtered by ${filterBy}: `}
                <span
                  className="contract_events-find-modal"
                  style={{ fontWeight: '600' }}
                >
                  {sliceData5(findInputValue)}
                </span>
                <button
                  type="submit"
                  className="contract_events-find-btn"
                  onClick={() => clearFindValue()}
                >
                  <Discard />
                </button>
              </pre>
            )}

            <form
              onSubmit={(e) => handleFilter(e, searchValue)}
              autoComplete="off"
            >
              <label
                className="contract_events-find-label"
                htmlFor="find-block"
              >
                <input
                  type="text"
                  id="find-block"
                  className="contract_events-find-input"
                  placeholder="Filter by  Block or Topic"
                  value={searchValue}
                  onChange={handleSearchChange}
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

          {filteredEvents.map((item, index) => (
            <EventDetails
              key={index}
              eventRaw={item}
              iface={contract.interface}
              handleFilter={handleFilter}
            />
          ))}

          {!isLoading && filteredEvents.length === 0 && (
            <div className="tabs_not_found">
              <NotFoundIcon />
              <span className="tabs_not_found_text">
                No results were found for this query.
              </span>
            </div>
          )}

          <div>{isLoading && <Loader />}</div>

          {!isLoading && oldestBlock !== 0 && (
            <>
              <center style={{ marginTop: '20px' }}>
                <Button
                  size={'large'}
                  type={'tetiary'}
                  onClick={() => loadMoreEvents()}
                >
                  Load more
                </Button>
              </center>
              <div ref={ref} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

async function fetchEvents(
  contract: ethers.Contract,
  fromBlock?: number,
  toBlock?: number,
) {
  if (toBlock === undefined) toBlock = await contract.provider.getBlockNumber();
  if (fromBlock === undefined) fromBlock = toBlock - BLOCK_RANGE;

  // 1000 attempts to find at least one event
  // in order to not confuse user with empty table
  for (let i = 0; i < 1000; i++) {
    if (fromBlock <= 0) fromBlock = 0;
    if (toBlock <= 0) break;

    console.log(`Loading events from ${fromBlock} to ${toBlock}...`);
    const events = await contract?.queryFilter('*' as any, fromBlock, toBlock);

    if (events.length > 0)
      return { events: events.reverse(), oldestBlock: fromBlock };

    fromBlock -= BLOCK_RANGE;
    toBlock -= BLOCK_RANGE;
  }

  return { events: [], oldestBlock: fromBlock };
}

export default memo(ContractEvents);
