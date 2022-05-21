import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle';
import { LatestTransactionsProps } from 'pages/Home/home.interfaces';
import React from 'react';
import { calcTime, sliceData5 } from 'utils/helpers';

const LatestTransactions: React.FC<LatestTransactionsProps> = ({
  hash,
  status,
  timestamp,
  from,
  to,
  amount,
  type,
}) => {
  const isOnline = (status: string) => {
    switch (status) {
      case 'SUCCESS':
        return <GreenCircle />;

      case 'PENDING':
        return <OrangeCircle />;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="lastest_transactions_cells">
        <div className="lastest_transactions_cell">
          <div className="lastest_transactions_cell-content lastest_transactions_font_big">
            <span>{isOnline(status)}</span>
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
          <div className="lastest_transactions_cell-content lastest_transactions_font_small">
            {type}
          </div>
          <div className="lastest_transactions_cell-content lastest_transactions_font_big">{`${amount?.toFixed(
            5,
          )} AMB`}</div>
        </div>
      </div>
    </>
  );
};

export default LatestTransactions;
