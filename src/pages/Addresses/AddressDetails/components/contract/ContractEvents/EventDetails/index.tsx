import EventTopics from '../EventTopics';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import ArrowUpBig from 'assets/icons/Arrows/ArrowUpBig';
import FilterIcon from 'assets/icons/FilterIcon';
import { useState } from 'react';
import { sliceData5 } from 'utils/helpers';

const EventDetails = ({
  txHash,
  blockNumber,
  methodId,
  txData,
  topics,
  contractAbi,
}: any) => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const toggleMethod = () => {
    setIsShow((prev) => !prev);
  };

  const res = contractAbi?.filter((item: any) => item.type === 'event');

  // console.log(contractAbi);

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
            <div className="contract_events-body-cell universall_light3">
              10 days 21 hrs ago
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
              <span>Transfer</span>
              <span className="universall_ibm">(index_topic_1</span>
              <span className="universall_semibold universall_green universall_ibm">
                address
              </span>
              <span className="universall_semibold universall_red universall_ibm">
                from,
              </span>
              <span className="">index_topic_2</span>
              <span className="universall_semibold universall_green universall_ibm">
                address
              </span>
              <span className="universall_semibold universall_red universall_ibm">
                to,
              </span>
              <span className="universall_semibold universall_green universall_ibm">
                uint256
              </span>
              <span className="universall_semibold universall_red universall_ibm">
                value)
              </span>
            </div>
            {isShow && (
              <div className="contract_events-body-modal">
                <div className="contract_events-body-modal-cell">
                  <div>address from</div>
                  <div className="contract_events-body-modal-address">
                    0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
                  </div>
                </div>
                <div className="contract_events-body-modal-cell">
                  <div>address to</div>
                  <div className="contract_events-body-modal-address">
                    0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640
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

            {/* <div className="contract_events-body-cell">
              <div>[topic1]</div>
              <div>
                0x000000000000000000000000771a41d9bdcb0626e22e98c872be850e70f86d77
              </div>
            </div>
            <div className="contract_events-body-cell">
              <div>[topic2]</div>
              <div>
                0x000000000000000000000000771a41d9bdcb0626e22e98c872be850e70f86d77
              </div>
            </div> */}
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
