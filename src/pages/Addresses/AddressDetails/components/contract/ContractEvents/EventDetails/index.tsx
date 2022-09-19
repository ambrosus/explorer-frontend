import EventTopics from '../EventTopics';
import EventDetailsItem from './EventDetailsItem';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import FilterIcon from 'assets/icons/FilterIcon';
import useHover from 'hooks/useHover';
import moment from 'moment';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { calcTime, sliceData5 } from 'utils/helpers';

const EventDetails = ({
  txHash,
  blockNumber,
  topics,
  event,
  eventData,
  contract,
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
    console.log(txData);
  }, []);

  useEffect(() => {
    eventData?.getBlock().then((res: any) => setBlockData(res));
  }, []);
  const methodId = useMemo(
    () => txData?.data?.substring(0, 10),
    [txData?.data],
  );

  useEffect(() => {
    if (eventData.eventSignature) {
      // console.log(contract.interface.parseLog(eventData));
    }
  }, []);

  useEffect(() => {
    if (!!event) {
      const res = contract.interface.parseLog(eventData);
      const bigNuber = eventData.args.filter(
        (item: any) => item === 'BigNumber',
      );
      // console.log(bigNuber);

      // const res1 = contract.interface.getFunction(txData.data.substring(0, 10));
      // console.log(res1);

      setInputs(res?.eventFragment.inputs);
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
              {isHovered && (
                <div className="contract_events-body-cell-hovered">
                  <span className="universall_triangle"></span>
                  <span className="contract_events-body-cell-time">
                    {moment(blockData?.timestamp * 1000).format(
                      'MMM-D-YYYY h:mm:ss a',
                    )}
                  </span>
                </div>
              )}
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
          <div className="contract_events-body-cells">{methodId}</div>
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
