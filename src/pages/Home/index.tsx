import { useTypedSelector } from '../../hooks/useTypedSelector';
import useHomeData from './useHomeData';
import BlocksContent from 'components/BlocksContent';
import BlocksContentMobile from 'components/BlocksContentMobile';
import { Content } from 'components/Content';
import FindWide from 'components/Find/FindWide';
import useDeviceSize from 'hooks/useDeviceSize';
import MainInfo from 'pages/Home/components/MainInfo';
import { useMemo } from 'react';

export const Home: React.FC = () => {
  const data = useHomeData();
  const { FOR_BIG_TABLET } = useDeviceSize();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  const header = useMemo(
    () =>
      appData && [
        { name: 'AMB PRICE', value: appData.total_price_usd },
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

  return (
    <Content isLoading={!!data && !!appData}>
      {data && appData && (
        <div className="home">
          <Content.Header>
            <h1 className="home_heading">Ambrosus Network Explorer</h1>
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
