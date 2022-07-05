import useHomeData from './useHomeData';
import BlocksContent from 'components/BlocksContent';
import BlocksContentMobile from 'components/BlocksContentMobile';
import Chart from 'components/Chart';
import { Content } from 'components/Content';
import FindWide from 'components/Find/FindWide';
import useDeviceSize from 'hooks/useDeviceSize';
import { useTypedSelector } from 'hooks/useTypedSelector';
import MainInfo from 'pages/Home/components/MainInfo';

export const Home: React.FC = () => {
  const data = useHomeData();
  const { FOR_BIG_TABLET } = useDeviceSize();
  const { data: appData } = useTypedSelector((state: any) => state.app);

  console.log(appData);

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
                  ? data.header.map((item: any) => (
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
