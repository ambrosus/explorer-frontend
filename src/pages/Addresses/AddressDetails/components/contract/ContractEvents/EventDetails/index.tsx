import EventDetailsItem from './EventDetailsItem';
import EventModal from './EventsModal';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import FilterIcon from 'assets/icons/FilterIcon';
import useHover from 'hooks/useHover';
import moment from 'moment';
import { useState } from 'react';
import { memo } from 'react';
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
  handleFindSubmit,
  inputsData,
  nonTopics,
}: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);

  const toggleMethod = () => {
    setIsShow((prev) => !prev);
  };

  const [hoverRef, isHovered] = useHover<HTMLDivElement>();
  const [isShowBtn, setIsShowBtn] = useState<boolean>(false);
  const HandleClick = () => {
    setIsShowBtn((prev) => !prev);
  };

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
        <div
          className="contract_events-body-cells"
          onClick={(e) => handleFindSubmit(e, blockNumber)}
        >
          <div className="contract_events-body-subcell universall_light2 universall_cursor">
            {blockNumber}
            <button className="universall_filter-btn">
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
              {isShow ? <ArrowUpBig /> : <ArrowDownBig />}
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

          <div className="contract_events-body-modal">
            {isShow &&
              inputsData.map((input: any, index: any) => (
                <EventModal
                  key={index}
                  type={input.type}
                  name={input.name}
                  value={input.value}
                  indexed={input.indexed}
                />
              ))}
          </div>
          {topics.map((topic: any, index: any) => {
            const isZeroTopic =
              index === 0
                ? 'contract_events-body-subcell universall_light3 universall_cursor'
                : '';

            return (
              <div
                className="contract_events-body-cell"
                onClick={(e) => handleFindSubmit(e, topic)}
              >
                <div className={isZeroTopic}>{`[topic${index}]`}</div>
                <pre className={isZeroTopic}>
                  {topic}
                  {index === 0 && (
                    <button className="universall_filter-btn">
                      <FilterIcon />
                    </button>
                  )}
                </pre>
              </div>
            );
          })}
          <div style={{ position: 'relative' }}>
            {/* {nonTopics.map((nonTopic: any, index: any) => (
              <div className="contract_events-body-cell" key={index}>
                <button
                  className="contract_events-body-cell-btn"
                  onClick={HandleClick}
                >
                  {'Address'} {isShowBtn ? <ArrowUp /> : <ArrowDown />}
                </button>
                <div>{nonTopic.value.toString()}</div>
              </div>
            ))} */}
            {isShowBtn && (
              <div className="contract_events-body-value">
                {typesOfValue.map((value: any, index: any) => (
                  <button
                    className="contract_events-body-value-btn"
                    key={index}
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(EventDetails);

const typesOfValue = ['Hex', 'Number', 'Text', 'Address'];
