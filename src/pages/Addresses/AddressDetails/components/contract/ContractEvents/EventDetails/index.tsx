import EventDetailsItem from './EventDetailsItem';
import EventTopics from './EventTopics';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import FilterIcon from 'assets/icons/FilterIcon';
import useHover from 'hooks/useHover';
import moment from 'moment';
import { FormEvent, useState } from 'react';
import { calcTime, sliceData5 } from 'utils/helpers';

const EventDetails = ({
  addressFrom,
  addressTo,
  blockNumber,
  event,
  inputs,
  methodId,
  timestamp,
  topics,
  txHash,
  handleFindValue,
}: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleMethod = () => {
    setIsShow((prev) => !prev);
  };

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <>
      <div className="contract_events-body">
        <div className="contract_events-body-cells">
          <div className="contract_events-body-cell universall_light2">
            {sliceData5(txHash)}
          </div>
          <div
            ref={hoverRef}
            className="contract_events-body-cell universall_light3"
          >
            {calcTime(timestamp)}
            {isHovered && (
              <div className="contract_events-body-cell-hovered">
                <span className="universall_triangle"></span>
                <span className="contract_events-body-cell-time">
                  {moment(timestamp * 1000).format('MMM-D-YYYY h:mm:ss a')}
                </span>
              </div>
            )}
          </div>
        </div>
        <div className="contract_events-body-cells">
          <div className="contract_events-body-subcell universall_light2">
            {blockNumber}
            <button className="universall_filter-btn" onClick={handleFindValue}>
              <FilterIcon />
            </button>
          </div>
        </div>
        <div
          className="contract_events-body-cells"
          style={{ height: 24, justifyContent: 'center' }}
        >
          {methodId}
        </div>
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
              {inputs?.map((input: any, index: any) => (
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
                  {addressFrom}
                </div>
              </div>
              <div className="contract_events-body-modal-cell">
                <div>address to</div>
                <div className="contract_events-body-modal-address">
                  {addressTo}
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
            <button
              className="contract_events-body-cell-btn"
              onClick={handleFindValue}
            >
              Address
            </button>
            <div>0x000000000000000000000000000000003f7a7530</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
