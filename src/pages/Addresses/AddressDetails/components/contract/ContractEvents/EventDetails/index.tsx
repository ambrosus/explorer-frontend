import EventTopics from '../EventTopics';
import EventDetailsItem from './EventDetailsItem';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import FilterIcon from 'assets/icons/FilterIcon';
import useHover from 'hooks/useHover';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { calcDataTime, calcTime, sliceData5 } from 'utils/helpers';
import { calcBundleTime } from 'utils/helpers';

const EventDetails = ({
  txHash,
  blockNumber,
  methodId,

  topics,
  contractAbi,
  event,
  addresses,
  eventData,
}: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const toggleMethod = () => {
    setIsShow((prev) => !prev);
  };
  const [inputs, setInputs] = useState([]);
  const [txData, setTxData] = useState<any>({});
  const [blockData, setBlockData] = useState<any>({});

  useEffect(() => {
    eventData?.getTransaction().then((res: any) => setTxData(res));
  }, []);

  useEffect(() => {
    eventData?.getBlock().then((res: any) => setBlockData(res));
  }, []);

  useEffect(() => {
    if (!!event) {
      const res = contractAbi
        ?.filter((item: any) => item.type === 'event')
        .find((item: any) => item.name === event);

      setInputs(res?.inputs);
    }
  }, []);

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div className="contract_events">
      <div className="contract_events-table">
        <div className="contract_events-heading">
          <div className="contract_events-heading-cell">Txn Hash</div>
          <div className="contract_events-heading-cell">Block</div>
          <div className="contract_events-heading-cell">Method ID</div>
          <div className="contract_events-heading-cell">Logs</div>
        </div>
        <div className="contract_events-body">
          <div className="contract_events-body-cells">
            <div className="contract_events-body-cell universall_light2">
              {sliceData5(txHash)}
            </div>
            <div
              ref={hoverRef}
              className="contract_events-body-cell universall_light3"
            >
              {calcTime(blockData?.timestamp)}
              {isHovered ? (
                <div className="contract_events-body-cell-hovered">
                  <span className="universall_triangle"></span>
                  <span className="contract_events-body-cell-time">
                    {moment(blockData?.timestamp * 1000).format(
                      'MMM-D-YYYY h:mm:ss a',
                    )}
                  </span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="contract_events-body-cells">
            <div className="contract_events-body-subcell universall_light2">
              {blockNumber}
              <button className="universall_filter-btn">
                <FilterIcon />
              </button>
            </div>
          </div>
          <div className="contract_events-body-cells">0x91c5bc0a</div>
          <div className="contract_events-body-cells">
            <div className="contract_events-body-transfer">
              <button
                className="contract_events-body-transfer"
                onClick={toggleMethod}
              >
                {isShow ? <ArrowDownBig /> : <ArrowUpBig />}
              </button>
              <span>{event}</span>
              <pre className="universall_ibm">
                (
                {inputs.map((input: any, index) => (
                  <EventDetailsItem key={index} input={input} index={index} />
                ))}
                )
              </pre>
            </div>
            {isShow && (
              <div className="contract_events-body-modal">
                <div className="contract_events-body-modal-cell">
                  <div>address from</div>
                  <div className="contract_events-body-modal-address">
                    {txData?.from}
                  </div>
                </div>
                <div className="contract_events-body-modal-cell">
                  <div>address to</div>
                  <div className="contract_events-body-modal-address">
                    {txData?.to}
                  </div>
                </div>
                <div className="contract_events-body-modal-cell">
                  <div>uint256 value</div>
                  <div>3761172685</div>
                </div>
              </div>
            )}

            {topics.map((topic: any, index: any) => (
              <EventTopics key={index} topic={topic} numberTopic={index} />
            ))}

            <div className="contract_events-body-cell">
              <button className="contract_events-body-cell-btn">Address</button>
              <div>0x000000000000000000000000000000003f7a7530</div>
            </div>
          </div>
        </div>
      </div>

      <label htmlFor="username" className="contract_events-find">
        Click me
        <input
          type="text"
          id="username"
          className="contract_events-find-input"
        />
      </label>
    </div>
  );
};

export default EventDetails;
