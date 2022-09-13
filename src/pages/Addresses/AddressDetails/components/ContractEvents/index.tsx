import EventDetails from './EventDetails';
import ArrowDownBig from 'assets/icons/Arrows/ArrowDownBig';
import FilterIcon from 'assets/icons/FilterIcon';
import { memo } from 'react';

const ContractEvents = () => {
  return (
    <>
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
                0xfa...485b
              </div>
              <div className="contract_events-body-cell universall_light3">
                10 days 21 hrs ago
              </div>
            </div>
            <div className="contract_events-body-cells">
              <div className="contract_events-body-subcell universall_light2">
                1377299
                <button className="universall_filter-btn">
                  <FilterIcon />
                </button>
              </div>
            </div>
            <div className="contract_events-body-cells">0x91c5bc0a</div>
            <div className="contract_events-body-cells">
              <div className="contract_events-body-transfer">
                <button className="contract_events-body-transfer">
                  <ArrowDownBig />
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
                  {' '}
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
              <div className="contract_events-body-cell">
                <div className="contract_events-body-subcell universall_light3">
                  [topic0]
                </div>
                <pre className="contract_events-body-subcell universall_light3">
                  0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
                  <button className="universall_filter-btn">
                    <FilterIcon />
                  </button>
                </pre>
              </div>
              <div className="contract_events-body-cell">
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
              </div>
              <div className="contract_events-body-cell">
                <button className="contract_events-body-cell-btn">
                  Address
                </button>
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
      <EventDetails />
    </>
  );
};

export default memo(ContractEvents);
