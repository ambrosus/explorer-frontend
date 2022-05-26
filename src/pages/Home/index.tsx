import { LatestTransactionsProps, ResultHomePageData } from './home.interfaces';
import API from 'API/api';
import BlocksContent from 'components/BlocksContent';
import BlocksContentMobile from 'components/BlocksContentMobile';
import Chart from 'components/Chart';
import { Content } from 'components/Content';
import FindWide from 'components/Find/FindWide';
import { useTypedSelector } from 'hooks/useTypedSelector';
import useWindowSize from 'hooks/useWindowSize';
import MainInfo from 'pages/Home/components/MainInfo';
import React, { useEffect, useState } from 'react';

export const Home: React.FC = () => {
  const [data, setData] = useState<ResultHomePageData>();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const getHomePageData: () => Promise<ResultHomePageData> = async () => {
    const result: ResultHomePageData = {
      header: [],
      latestBlocks: (await API.getBlocks({ limit: 8 })).data,
      latestTransactions: (await API.getTransactions({ limit: 3000 })).data
        .filter((item: LatestTransactionsProps) => item.type !== 'BlockReward')
        .slice(0, 8),
    };

    result.header = (await appData) && [
      { name: 'MARKET CAP', value: appData.tokenInfo.market_cap_usd },
      { name: 'TOTAL SUPPLY', value: appData.netInfo.totalSupply },
      {
        name: 'TOTAL TRANSACTIONS',
        value: appData.netInfo.transactions.total,
      },
      { name: 'BUNDLES', value: appData.netInfo.totalBundles },
      {
        name: 'NODES',
        value:
          appData.netInfo.apollos.online +
          appData.netInfo.atlases.total +
          appData.netInfo.hermeses.total,
      },
      { name: 'HOLDERS', value: appData.netInfo.accounts.withBalance },
    ];
    return result;
  };
  useEffect(() => {
    getHomePageData().then((result: ResultHomePageData) => setData(result));
  }, [appData, data]);

  const { width } = useWindowSize();

  return (
    <Content isLoading={!!data}>
      {data && (
        <div className="home">
          <Content.Header>
            <h1 className="home_heading">Ambrosus Network Explorer</h1>
            <FindWide />
            <div className="home_info">
              <div className="home_info_table">
                {data?.header?.length
                  ? data.header.map((item) => (
                      <MainInfo
                        key={item.name}
                        name={item.name as string}
                        value={item.value}
                      />
                    ))
                  : null}
              </div>
              <Chart />
            </div>
          </Content.Header>
          <Content.Body>
            {width > 900 ? (
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
