import { NonParsedEvent } from './components/NonParsedEvent';
import { ParsedEvent } from './components/ParsedEvent';
import { Timestamp } from './components/helpers';
import FilterIcon from 'assets/icons/FilterIcon';
import { ethers } from 'ethers';
import { memo } from 'react';
import { useQuery } from 'react-query';
import { NavLink } from 'react-router-dom';
import { sliceData5 } from 'utils/helpers';

export interface IEventParsedData {
  name: string;
  type: string;
  value: any;
  indexed: boolean;
}

export interface IEvent {
  eventName: string | undefined; // event name, if abi present
  parsedData: IEventParsedData[]; // parsed event data, if abi present
  topics: string[]; // unparsed event topics (indexed params)
  data: string; // unparsed event data (non-indexed params)
  txHash: string;
  blockNumber: number;
  getTransaction: () => any;
  getBlock: () => any;
}

const EventDetails = ({
  eventRaw,
  iface,
  handleFilter,
}: {
  eventRaw: ethers.Event;
  iface: ethers.utils.Interface;
  handleFilter?: any;
}) => {
  const event = parseEvent(eventRaw, iface);

  const { data: blockData } = useQuery(
    `block ${event.blockNumber}`,
    async () => await event.getBlock(),
  );
  const { data: resTxData } = useQuery(
    `tx ${event.txHash}`,
    async () => await event.getTransaction(),
  );

  const methodId = resTxData?.data?.substring(0, 10);
  const timestamp = blockData?.timestamp;

  return (
    <>
      <div className="contract_events-body">
        <div className="contract_events-body-cells">
          <div
            className="contract_events-body-cell universall_light2"
            style={{ fontWeight: 600 }}
          >
            <NavLink
              rel="nofollow"
              to={`/tx/${event.txHash}/`}
              className="contract_events-body-navlink universall_light2"
            >
              {sliceData5(event.txHash)}
            </NavLink>
          </div>
          <Timestamp timestamp={timestamp} />
        </div>
        <div className="contract_events-body-cells">
          <div className="contract_events-body-subcell ">
            <NavLink
              rel="nofollow"
              to={`/block/${event.blockNumber}/`}
              className="contract_events-body-navlink universall_light2"
            >
              {event.blockNumber}
            </NavLink>
            {handleFilter && (
              <button
                className="universall_filter-btn"
                onClick={(e) => handleFilter(e, event.blockNumber)}
              >
                <FilterIcon />
              </button>
            )}
          </div>
        </div>

        <div
          className="contract_events-body-cells"
          style={{ height: 24, justifyContent: 'center' }}
        >
          {methodId}
        </div>

        <div className="contract_events-body-cells">
          {event.eventName && <ParsedEvent event={event} />}
          <NonParsedEvent event={event} handleFilter={handleFilter} />
        </div>
      </div>
    </>
  );
};

function parseEvent(item: ethers.Event, iface: ethers.utils.Interface) {
  let parsedLog: any;
  if (iface !== undefined) {
    try {
      parsedLog = iface.parseLog(item);
    } catch (e) {
      console.warn(e);
    }
  }

  const inputs = parsedLog?.eventFragment.inputs || [];
  const parsedData: IEventParsedData[] = inputs.map((input: any) => ({
    name: input.name,
    type: input.type,
    value: parsedLog?.args[input.name],
    indexed: input.indexed,
  }));

  const result: IEvent = {
    eventName: parsedLog?.name,
    parsedData: parsedData,
    topics: item.topics,
    data: item.data,
    txHash: item.transactionHash,
    getBlock: item.getBlock,
    getTransaction: item.getTransaction,
    blockNumber: item.blockNumber,
  };

  return result;
}

export default memo(EventDetails);
