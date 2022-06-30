import API from '../../API/api';
import Loader from '../../components/Loader';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { numberWithCommas } from '../../utils/helpers';
import { transactionsTabs } from '../../utils/sidePages';
import AddressBlock from '../Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import AddressBlocksHeader from '../Addresses/AddressDetails/components/AddressBlocksHeader';
import TabsNew from './components/TabsNew';
import { Content } from 'components/Content';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';

export const Transactions = () => {
  const navigate = useNavigate();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const [txsData, setTxsData] = useState<any>({
    data: [],
    pagination: {
      hasNext: false,
      next: null,
    },
  });
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('');
  const { ref, inView } = useInView();

  useEffect(() => {
    getTransactions().then((response: any) => setTxsData(response));
  }, []);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      txsData.pagination &&
      txsData.pagination.hasNext
    ) {
      getTransactions({ type: tab, page: txsData.pagination.next }).then(
        (response: any) => {
          setTxsData((state: any) => ({
            data: [...state.data, ...response.data],
            pagination: response.pagination,
          }));
        },
      );
    }
  }, [inView]);

  const getTransactions = (params: object = {}) => {
    setLoading(true);

    return API.getTransactions({ ...params, limit: 50 }).finally(() =>
      setLoading(false),
    );
  };

  const handleTab = (type: string) => {
    setTxsData({
      data: [],
      pagination: {
        hasNext: false,
        next: null,
      },
    });

    getTransactions({ type }).then((response: any) => setTxsData(response));

    setTab(type);
  };

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
          onChange={handleTab}
          selectedItem={tab}
        />
        {!!txsData.data.length && (
          <AddressBlocksHeader
            txhash="txHash"
            method="Method"
            from="From"
            to="To"
            date="Date"
            block="Block"
            amount="Amount"
            txfee="txFee"
            token={null}
            methodFilters={null}
            isTableColumn={'address_blocks_cells'}
          />
        )}
        {!!txsData.data.length &&
          txsData.data.map((tx: any, i: number) => (
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
          ))}
        <div ref={ref} />
        {loading && <Loader />}
      </Content.Body>
    </Content>
  );
};
