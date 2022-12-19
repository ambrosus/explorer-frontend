import { Account } from '../apollo.interface';
import API from 'API/api';
import API2 from 'API/newApi';
import { Content } from 'components/Content';
import CopyBtn from 'components/CopyBtn';
import ExportCsv from 'components/ExportCsv';
import HeadInfo from 'components/HeadInfo';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import AddressBlock from 'pages/Addresses/AddressDetails/components/AddressBlocks';
import TabsNew from 'pages/Transactions/components/TabsNew';
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';
import {
  ambToUSD,
  statusMessage,
  formatDate,
  diffStyleToCell,
} from 'utils/helpers';
import { apolloDetailsSorting } from 'utils/sidePages';

export const ApolloDetails = memo(() => {
  const { getAddressData } = useActions();
  const { address = '' }: TParams = useParams();

  const { data: addressData } = useTypedSelector((state) => state?.addressData);

  const { data: appData } = useTypedSelector((state: any) => state?.app);
  useEffect(() => {
    getAddressData(address);
  }, []);

  // useEffect(() => {
  //   API2.getApollo(address).then((res) => console.log(res));
  // }, []);
  const { balance, stake, version } = addressData?.apolloInfo?.data || 0;
  const apolloData = addressData?.apolloInfo?.data;

  const initFilterData = formatDate(
    apolloData?.lastBlock?.timestamp
      ? (new Date(apolloData.lastBlock.timestamp * 1000) as any) / 1000
      : (new Date() as any) / 1000,
    true,
    false,
  );
  console.log(appData?.tokenInfo);

  const { price_usd } = appData?.tokenInfo || 0;
  const ambBalance = balance?.ether || 0;
  const ambStake = stake?.ether || 0;

  const usdBalance = +ambToUSD(ambBalance, price_usd);
  const usdStake = +ambToUSD(ambStake, price_usd);

  const isOffline = apolloData?.status === 'OFFLINE' ? '#bfc9e0' : undefined;

  const [rewards, setRewards] = useState<any>({
    blocksRewards: 0,
    transactionsRewards: 0,
    totalBlocks: 0,
  });
  const [isLoad, setIsLoad] = useState<boolean>(false);

  const [filterDate, setFilterDate] = useState<any>(() => initFilterData);
  const [dateRange, setDateRange] = useState<any>(null);

  useEffect(() => {
    if (apolloData?.lastBlock) {
      setFilterDate(() => initFilterData);
    }
  }, [apolloData]);

  const onSelect = (value: any, range: any) => {
    setFilterDate(value);
    setDateRange(range);
  };

  const fetchRewards = async () => {
    const date = filterDate.split('-');
    const fromDate = date[0];
    const toDate = date[1];
    const { data } = await API.getApolloRewards(apolloData?.address, {
      from: fromDate,
      to: toDate !== undefined ? toDate : null,
    });
    setRewards(data);
  };

  useEffect(() => {
    // need rewrite to useQuery
    if (filterDate) {
      fetchRewards();
      const timer = setTimeout(() => {
        setIsLoad(true);
      }, 500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [filterDate, isLoad]);
  const itemFirst: any = [
    {
      name: 'BALANCE',
      value: diffStyleToCell(ambBalance, usdBalance),

      // `${ambBalance.toFixed(2)} AMB / $ ${usdBalance.toFixed(2)}`,
    },
    {
      name: 'UPTIME',
      value: statusMessage(apolloData, 'ApolloDetails'),
      style: {
        color: '#16C784',
      },
    },
    {
      name: 'STAKE',
      value: diffStyleToCell(ambStake, usdStake),
    },
    {
      name: 'SOFTWARE',
      value: version,
    },
  ];

  const itemSecond: any = [
    {
      name: 'MINING STATS',
      value: filterDate,
      calendarBtn: (
        <div className="calendar_style">
          <ExportCsv
            initRange={dateRange}
            miningStats={onSelect}
            showText={false}
          />
        </div>
      ),
    },

    {
      name: 'BLOCK REWARDS',
      value: diffStyleToCell(
        rewards?.blocksRewards,
        ambToUSD(rewards?.blocksRewards, price_usd),
      ),
    },
    {
      name: 'TRANSACTIONS REWARDS',
      value: (
        <>
          {`${(rewards?.transactionsRewards || 0).toFixed(5)} AMB / `}
          <span style={{ fontWeight: 400 }}>
            {`$ ${ambToUSD(rewards.transactionsRewards, price_usd)}`}
          </span>
        </>
      ),
    },
    {
      name: 'TOTAL BLOCKS MINED',
      value: rewards.totalBlocks,
    },
  ];

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/apollo/" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Content.Header>
        <div className="apollo_details_main">
          <div className="apollo_details_main_nd">
            <h1>ND Apollo</h1>
            <div
              className="apollo_details_main_online"
              style={{ color: isOffline }}
            >
              {apolloData?.status ?? 'Loading...'}
            </div>
          </div>
          <div className="apollo_details_main_address">
            <div className="apollo_details_main_cell universall_bold">
              Address
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <div className="address_content">{address}</div>
              <CopyBtn />
            </div>
          </div>
        </div>
        <HeadInfo data={itemFirst} className="head_info" />
        <HeadInfo data={itemSecond} className="head_info" />
      </Content.Header>
      <Content.Body>
        <TabsNew
          tabs={apolloDetailsSorting}
          fetchData={API.getAccountTx}
          fetchParams={{ address, type: '', page: '' }}
          render={(txs: Account[]) =>
            txs.map((transaction: any) => (
              <AddressBlock
                key={transaction.hash}
                inners={transaction.inners}
                isLatest={true}
                txhash={transaction.hash}
                method={transaction.type}
                from={transaction.from}
                to={transaction.to}
                date={moment(transaction.timestamp * 1000).fromNow()}
                block={transaction.blockNumber}
                amount={transaction.value.ether}
                txfee={transaction.gasCost.ether}
                token={`${transaction?.token ? transaction?.token : 'AMB'}`}
                symbol={`${transaction?.symbol ? transaction?.symbol : 'AMB'}`}
                isTableColumn="address_blocks_cells"
                isIcon={true}
                status={transaction.status}
              />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
});
