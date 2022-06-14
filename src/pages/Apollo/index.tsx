import Loader from '../../components/Loader';
import useSortData from '../../hooks/useSortData';
import {getApollosData} from '../../services/apollo.service';
import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import {Content} from 'components/Content';
import React from 'react';

export const Apollo = () => {
  const {ref, sortTerm, setSortTerm, renderData, loading} = useSortData(
    getApollosData,
    null,
    'address',
  );
  console.log('renderData', renderData);
  return (
    <Content>
      <Content.Header>
        <MainInfoApollo/>
      </Content.Header>
      <Content.Body>
        <div className="apollo_main">
          <ApolloBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm}/>
          <div
            className="apollo_main_table"
            style={{gridTemplateColumns: `repeat(${6}, auto)`}}
          >
            <ApolloBlocksHeader/>
            {renderData && renderData.data && renderData.data.length
              ? renderData.data.map((item: any, index: number) => renderData.data.length - 1 === index && renderData?.pagination?.hasNext ? (
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
              ))
              : null}
          </div>
          {!loading && renderData?.pagination?.hasNext && <Loader/>}
        </div>
      </Content.Body>
    </Content>
  );
};
