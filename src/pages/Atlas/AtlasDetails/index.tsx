import AtlasDetailsHead from './components/AtlasDetailsHead';
import API from 'API/api';
import { Content } from 'components/Content';
import CopyBtn from 'components/CopyBtn';
import HeadInfo from 'components/HeadInfo';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import AddressBlock from 'pages/Addresses/AddressDetails/components/AddressBlocks';
import TabsNew from 'pages/Transactions/components/TabsNew';
import React, {useEffect, useMemo} from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';
import { ambToUSD, diffStyleToCell } from 'utils/helpers';
import { atlasDetailsSorting } from 'utils/sidePages';

export const AtlasDetails = () => {
  const { getAddressData } = useActions();
  const { address }: TParams = useParams();

  useEffect(() => {
    getAddressData(address);
  }, [address]);

  const { data: appData } = useTypedSelector((state: any) => state.app);
  const { data: addressData } = useTypedSelector((state) => state.addressData);

  const atlasData = addressData?.atlasInfo?.data || 0;

  const ambBalance = atlasData?.balance?.ether || 0;
  const ambStake = atlasData?.stake?.ether || 0;
  const price_usd = appData?.tokenInfo?.price_usd || 0;

  const usdBalance = +ambToUSD(ambBalance, price_usd);
  const usdStake = +ambToUSD(ambStake, price_usd);

  const available = atlasData?.payPeriods?.available || 0;
  const forecast = atlasData?.payPeriods?.current?.forecast || 0;

  const usdForecast = +ambToUSD(forecast, price_usd);
  const usdAvailable = +ambToUSD(available, price_usd);
  const nextPayDay = (startDay: any): any => {
    let today = moment().format('YYYY-MM-DD');
    let delta = moment(startDay).diff(today);

    if (delta < 0) {
      startDay = moment(startDay).add(28, 'days').format('YYYY-MM-DD');
      return nextPayDay(startDay);
    } else {
      return startDay;
    }
  };

  const itemFirst: any = [
    {
      name: 'BALANCE',
      value: diffStyleToCell(ambBalance, usdBalance),
    },

    {
      name: 'STAKE',
      value: diffStyleToCell(ambStake, usdStake),
    },
    {
      name: 'URL',
      value: (
        <a
          className="atlas_details_balance_fonts_bold"
          rel="noreferrer"
          target="_blank"
          href={atlasData?.url}
        >
          {atlasData?.url || 'Loading...'}
        </a>
      ),
    },
  ];

  const itemSecond: any = [
    {
      name: 'AVAILABLE PAYOUT BALANCE',
      value: diffStyleToCell(available, usdAvailable),
    },

    {
      name: 'FORECASTED REVENUE',
      value: diffStyleToCell(forecast, usdForecast),
    },
    {
      name: 'NEXT PAYOUT DATE',
      value: moment(nextPayDay('1970-01-01')).format('DD/MM/YYYY'),
    },
    {
      name: 'TOTAL BUNDLES',
      value: atlasData?.totalBundles || 0,
    },
  ];

  const fetchParams = useMemo(() => {
    return { address, type: '', page: '' };
  }, [address]);

  return (
    <Content>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/atlas/" />
        <meta name="robots" content="noindex" />
        <title>Atlas Nodes. Ambrosus Network Explorer</title>
        <meta
          name="description"
          content="Explore Ambrosus Network Atlas Nodes: total nodes, avg block / prop. time"
        />
      </Helmet>
      <Content.Header>
        <div className="atlas_details_main">
          <div className="atlas_details_main_nd">
            <h1>ND Atlas</h1>
            <div className="atlas_details_main_online">
              {atlasData?.state || 'Loading...'}
            </div>
          </div>
          <div className="atlas_details_main_address">
            <div className="atlas_details_main_cell universall_bold">
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
          tabs={atlasDetailsSorting}
          fetchData={API.getAccountTx}
          fetchParams={fetchParams}
          render={(txs: any) =>
            txs.map((transaction: any) => (
              <AddressBlock
                inners={transaction.inners}
                isLatest={true}
                key={transaction.hash}
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
                status={transaction.status}
              />
            ))
          }
        />
      </Content.Body>
    </Content>
  );
};
