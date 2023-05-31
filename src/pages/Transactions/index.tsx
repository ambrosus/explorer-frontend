import { numberWithCommas } from '../../utils/helpers';
import { transactionsTabs } from '../../utils/sidePages';
import AddressBlock from '../Addresses/AddressDetails/components/AddressBlocks';
import TabsNew from './components/TabsNew';
import API2 from 'API/newApi';
import { Content } from 'components/Content';
import moment from 'moment';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';

export const Transactions = memo(() => {
  const [txData, setTxData] = useState<any>(null);

  useEffect(() => {
    API2.getInfo().then((res) => setTxData(res));
  }, []);

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/tx/" />
      </Helmet>
      <Content.Header>
        <div className="transactions_header">
          <h1>Transactions</h1>
          <span className="transactions_header_text">
            Total transactions
            <span className="transactions_header_num">
              {numberWithCommas(txData?.data.transactions?.total)}
            </span>
          </span>
        </div>
      </Content.Header>
      <Content.Body>
        <TabsNew
          withoutCalendar
          tabs={transactionsTabs}
          fetchData={API2.getTransactions}
          fetchParams={{ type: '', page: '' }}
          render={(txs: any) =>
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
                status={tx.status}
              />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
});
