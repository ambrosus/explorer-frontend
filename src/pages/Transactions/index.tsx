import API from '../../API/api';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { numberWithCommas } from '../../utils/helpers';
import { transactionsTabs } from '../../utils/sidePages';
import AddressBlock from '../Addresses/AddressDetails/components/AddressBlocks';
import { Account } from '../Atlas/atlas.interface';
import TabsNew from './components/TabsNew';
import { Content } from 'components/Content';
import moment from 'moment';

export const Transactions = () => {
  const { data: appData } = useTypedSelector((state: any) => state.app);

  return (
    <Content>
      <Content.Header>
        <div className="transactions_header">
          <h1>Transactions</h1>
          <span className="transactions_header_text">
            Total transactions
            <span className="transactions_header_num">
              {numberWithCommas(appData?.netInfo?.transactions?.total)}
            </span>
          </span>
        </div>
      </Content.Header>
      <Content.Body>
        <TabsNew
          withoutCalendar
          tabs={transactionsTabs}
          fetchData={API.getTransactions}
          fetchParams={{ type: '', page: '' }}
          render={(txs: Account[]) =>
            txs.map((tx: any, i: number) => (
              <AddressBlock
                isLatest={true}
                key={i}
                txhash={tx.hash}
                method={tx.type.split(':')[0]}
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
                hashOnClick={true}
              />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
