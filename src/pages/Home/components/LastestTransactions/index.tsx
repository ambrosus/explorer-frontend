import useDeviceSize from 'hooks/useDeviceSize';
import { LatestTransactionsProps } from 'pages/Home/home.interfaces';
import React from 'react';
import { calcTime, isOnline, sliceData5, wrapString } from 'utils/helpers';

const LatestTransactions: React.FC<LatestTransactionsProps> = ({
  hash,
  status,
  timestamp,
  from,
  to,
  amount,
  type,
}) => {
  const { FOR_SMALL_PHONE } = useDeviceSize();
  return (
    <>
      <div className="lastest_transactions_cells">
        <div className="lastest_transactions_cell">
          <div className="lastest_transactions_cell_content lastest_transactions_font_big">
            <span style={{ marginRight: 8 }}>{isOnline(status)}</span>
            {sliceData5(hash)}
          </div>

          <div className="lastest_transactions_p lastest_transactions_font_small">
            <span style={{ marginRight: 16 }}></span>
            {calcTime(timestamp)}
          </div>
        </div>

        <div className="lastest_transactions_cell">
          <div className="lastest_transactions_cell_content">
            <div className="lastest_transactions_font_small">From</div>
            <div className="lastest_transactions_font_big lastest_transactions_margin_left">
              {sliceData5(from)}
            </div>
          </div>
          <div className="lastest_transactions_cell_content">
            <div className="lastest_transactions_font_small">To</div>
            <div className="lastest_transactions_font_big lastest_transactions_margin_left">
              {sliceData5(to)}
            </div>
          </div>
        </div>
        <div className="lastest_transactions_cell">
          <div
            className="lastest_transactions_cell_content lastest_transactions_font_small"
            style={{
              flexDirection: 'column',
              gap: 0,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            {FOR_SMALL_PHONE ? type : wrapString(type)}
          </div>
          <div className="lastest_transactions_cell_content lastest_transactions_font_big">{`${amount?.toFixed(
            5,
          )} AMB`}</div>
        </div>
      </div>
    </>
  );
};

export default LatestTransactions;
