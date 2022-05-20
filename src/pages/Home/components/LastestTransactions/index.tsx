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
      <div className="lastestTransactions__cells">
        <div className="lastestTransactions__cell">
          <div className="lastestTransactions__cell-content lastestTransactions__font-big">
            <span>{isOnline(status)}</span>
            {sliceData5(hash)}
          </div>

          <div className="lastestTransactions__p lastestTransactions__font-small">
            <span style={{ marginRight: 16 }}></span>
            {calcTime(timestamp)}
          </div>
        </div>

        <div className="lastestTransactions__cell">
          <div className="lastestTransactions__cell-content">
            <div className="lastestTransactions__font-small">From</div>
            <div className="lastestTransactions__font-big lastestTransactions__margin-left">
              {sliceData5(from)}
            </div>
          </div>
          <div className="lastestTransactions__cell-content">
            <div className="lastestTransactions__font-small">To</div>
            <div className="lastestTransactions__font-big lastestTransactions__margin-left">
              {sliceData5(to)}
            </div>
          </div>
        </div>
        <div className="lastestTransactions__cell">
          <div className="lastestTransactions__cell-content lastestTransactions__font-small">
            {type}
          </div>
          <div className="lastestTransactions__cell-content lastestTransactions__font-big">{`${amount?.toFixed(
            5,
          )} AMB`}</div>
        </div>
      </div>
    </>
  );
};

export default LatestTransactions;
