import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { LatestTransactionsProps, ResultHomePageData } from './home.interfaces';
import API from 'API/api';
import API2 from 'API/newApi';
import BlocksContent from 'components/BlocksContent';
import BlocksContentMobile from 'components/BlocksContentMobile';
import { Content } from 'components/Content';
import FindWide from 'components/Find/FindWide';
import useDeviceSize from 'hooks/useDeviceSize';
import MainInfo from 'pages/Home/components/MainInfo';
import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet';

export const Home: React.FC = () => {
  const [data, setData] = useState<ResultHomePageData>();
  const { setAppDataAsync } = useActions();

  const { FOR_BIG_TABLET } = useDeviceSize();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  useEffect(() => {
    const interval = setInterval(() => {
      setAppDataAsync();
      getHomePageData().then((result: ResultHomePageData) => setData(result));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const getHomeData = async () => await API2.getAddresses();

  useEffect(() => {
    const data = getHomeData();
    console.log(data);
  }, []);
  const header = useMemo(
    () =>
      appData && [
        { name: 'AMB PRICE', value: appData.tokenInfo.price_usd },
        { name: 'TOTAL SUPPLY', value: appData.netInfo.totalSupply },
        {
          name: 'TOTAL TRANSACTIONS',
          value: appData.netInfo.transactions.total,
        },
        { name: 'MARKET CAP', value: appData.tokenInfo.market_cap_usd },
        {
          name: 'NODES',
          value:
            appData.netInfo.apollos.online +
            appData.netInfo.atlases.total +
            appData.netInfo.hermeses.total,
        },
        { name: 'HOLDERS', value: appData.netInfo.accounts.withBalance },
      ],
    [appData],
  );

  const getHomePageData: () => Promise<ResultHomePageData> = async () => {
    const result: ResultHomePageData = {
      latestBlocks: (await API.getBlocks({ limit: 8 })).data,
      latestTransactions: (
        await API.getTransactions({ limit: 10, type: 'transactions' })
      ).data
        .filter((item: LatestTransactionsProps) => item.type !== 'BlockReward')
        .slice(0, 8),
    };

    return result;
  };

  return (
    <Content isLoading={!!data && !!appData}>
      <Helmet>
        <link rel="canonical" href="https://airdao.io/explorer/" />
        <title>AirDAO | Network Explorer</title>
      </Helmet>
      {data && appData && (
        <div className="home">
          <Content.Header>
            <h1 className="home_heading">Network Explorer</h1>
            <FindWide />
            <div className="home_info">
              <div className="home_info_table">
                {header
                  ? header.map((item: any) => (
                      <MainInfo
                        key={item.name}
                        name={item.name as string}
                        value={item.value}
                      />
                    ))
                  : null}
              </div>
            </div>
          </Content.Header>
          <Content.Body>
            {FOR_BIG_TABLET ? (
              <BlocksContent data={data} />
            ) : (
              <BlocksContentMobile data={data} />
            )}
          </Content.Body>
        </div>
      )}
    </Content>
  );
};
