import React from 'react';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { numberWithCommas } from '../../utils/helpers';
import { transactionsTabs } from '../../utils/sidePages';
import AddressBlock from '../Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import TabsNew from './components/TabsNew';
import { Content } from 'components/Content';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { Account } from 'pages/Addresses/addresses.interface';
import API from "../../API/api";

export const Transactions = () => {
  const navigate = useNavigate();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const redirectToDetails = (txhash: string | number) => {
    navigate(`/transactions/${txhash}`);
  };

  return (
    <Content>
      <Content.Header>
        <div className="transactions-header">
          <h1>Transactions</h1>
          <span className="transactions-header__text">
            Total transactions
            <span className="transactions-header__num">
              {numberWithCommas(appData?.netInfo?.transactions?.total)}
            </span>
          </span>
        </div>
      </Content.Header>
      <Content.Body>
        <TabsNew
          tabs={transactionsTabs}
          fetchData={API.getTransactions}
          render={(txs: Account[]) => (
            txs.map((tx: any, i: number) => (
              <AddressBlock
                isLatest={true}
                key={i}
                txhash={tx.hash}
                method={tx.type}
                from={tx.from}
                to={tx.to}
                date={moment(tx.timestamp * 1000).fromNow()}
                block={tx.blockNumber}
                amount={tx.value.ether}
                txfee={tx.gasCost.ether}
                token={`${tx?.token ? tx?.token : 'AMB'}`}
                symbol={`${tx?.symbol ? tx?.symbol : 'AMB'}`}
                isTableColumn="address_blocks_cells"
                isIcon={true}
                inners={tx.inners}
                hashOnClick={redirectToDetails}
              />
            ))
          )}
        />
      </Content.Body>
    </Content>
  );
};
