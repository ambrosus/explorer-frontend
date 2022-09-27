import EventDetails from './EventDetails';
import Discard from 'assets/icons/Discard';
import NotFoundIcon from 'assets/icons/Errors/NotFoundIcon';
import Search from 'assets/icons/Search';
import Loader from 'components/Loader';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getContractData } from 'services/contract.service';
import { sliceData5 } from 'utils/helpers';

const ContractEvents = () => {
  const { address = '' } = useParams();

  const [eventsToRender, setEventsToRender] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  const [findInputValue, setFindInputValue] = useState('');
  const [isShowFindResult, setIsShowFindResult] = useState(false);
  const [filterBy, setFilterBy] = useState('');
  const [isLoad, setIsLoad] = useState(false);

  const provider = new ethers.providers.JsonRpcProvider(
    process.env.REACT_APP_EXPLORER_NETWORK,
  );

  const { data: contractData, isSuccess } = useQuery(
    `events data ${address}`,
    () => getContractData(address),
  );

  const getEventData = async () => {
    if (contractData?.status === 200) {
      setIsLoad(false);
      const res = contractData?.data?.files?.find(
        (file: any) => file.name === 'metadata.json',
      );
      const parsedContent = JSON.parse(res?.content);
      const contract = new ethers.Contract(
        address,
        parsedContent.output.abi,
        provider,
      );

      const eventsArr = await contract?.queryFilter('*' as any);

      const result = eventsArr.map((item: any) => {
        const blockData = item.getBlock();
        const txData = item.getTransaction();

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

        return data;
      });

      setEventsToRender(result);
      setIsLoad(true);
    }
  };

  useEffect(() => {
    getEventData();
  }, [isSuccess]);

  const filteredEvents = useMemo(() => {
    if (findInputValue === '') {
      return eventsToRender;
    }
    if (ethers.utils.isHexString(findInputValue)) {
      setFilterBy('Topic');
      return eventsToRender.filter(
        (event: any) => event.topics[0] === findInputValue,
      );
    } else if (!isNaN(Number(findInputValue))) {
      setFilterBy('Block');
      return eventsToRender.filter(
        (event: any) => event.blockNumber === +findInputValue,
      );
    } else {
      return [];
    }
  }, [eventsToRender, findInputValue]);

  const handleSearchChange = (e: any) => {
    e.preventDefault();
    setSearchValue(e.target.value);
    if (e.target.value === '') {
      setFindInputValue(e.target.value);
    }
    setIsShowFindResult(false);
  };

  const handleFindSubmit = (e: any, findValue: any) => {
    e.preventDefault();

    setSearchValue(findValue);
    setFindInputValue(findValue);
    setIsShowFindResult(true);
  };

  const { ref, inView } = useInView();
  const [page, setPage] = useState(0);

  const clearFindValue = () => {
    setSearchValue('');
    setFindInputValue('');
    setIsShowFindResult(false);
  };

  useEffect(() => {
    setPage((prev) => prev + 20);
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
                  style={{
                    fontWeight: '600',
                  }}
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

            <form onSubmit={(e) => handleFindSubmit(e, searchValue)}>
              <label
                className="contract_events-find-label"
                htmlFor="find-block"
              >
                <input
                  type="text"
                  id="find-block"
                  value={searchValue}
                  onChange={handleSearchChange}
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
            .sort(
              (a: { blockNumber: number }, b: { blockNumber: number }) =>
                b.blockNumber - a.blockNumber,
            )
            ?.slice(0, page)

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
                handleFindSubmit={handleFindSubmit}
                inputsData={item.inputsData}
                nonTopics={item.nonTopics}
                setSearchValue={setSearchValue}
              />
            ))}
          {filteredEvents.length === 0 && isLoad && (
            <div className="tabs_not_found">
              <NotFoundIcon />
              <span className="tabs_not_found_text">
                No results were found for this query.
              </span>
            </div>
          )}
          {eventsToRender.length !== 0 && <div ref={ref}></div>}
        </div>
      </div>
    </>
  );
};

export default memo(ContractEvents);
