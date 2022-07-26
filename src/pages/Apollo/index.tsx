import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import { Content } from 'components/Content';
import HeadInfo from 'components/HeadInfo';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import { useParams } from 'react-router-dom';
import { getApollosData } from 'services/apollo.service';

export const Apollo = () => {
  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getApollosData,
    ' ',
  );

  const { data: appData } = useTypedSelector((state: any) => state.app);

  const {
    total = 0,
    online = 0,
    offline = 0,
    connecting = 0,
  } = appData?.netInfo?.apollos || 0;

  const { avgBlockTime = 0 } = appData?.netInfo || 0;

  const itemFirst: any = [
    {
      name: 'TOTAL NODES',
      value: total,
    },
    {
      name: 'ONLINE',
      value: online,
      style: {
        color: '#1acd8c',
      },
    },
    {
      name: 'OFFLINE',
      value: offline,
    },
    {
      name: 'CONNECTING',
      value: connecting,
    },
    {
      name: 'Avg block / prop. time',
      value: `${avgBlockTime} sec`,
    },
  ];

  return (
    <Content>
      <Content.Header>
        <h1 className="main_info_apollo_heading">Apollo Nodes</h1>
        <HeadInfo data={itemFirst} className="head_info" />
      </Content.Header>
      <Content.Body>
        <div className="apollo_main">
          <ApolloBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />
          <div
            className="apollo_main_table"
            style={{ gridTemplateColumns: `repeat(${6}, auto)` }}
          >
            <ApolloBlocksHeader />
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) =>
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext ? (
                    <ApolloBlocksBody
                      lastCardRef={ref}
                      key={index}
                      index={index + 1}
                      item={item}
                    />
                  ) : (
                    <ApolloBlocksBody
                      key={index}
                      index={index + 1}
                      item={item}
                    />
                  ),
                )
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader />}
        </div>
      </Content.Body>
    </Content>
  );
};
