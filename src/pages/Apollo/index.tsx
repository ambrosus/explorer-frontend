import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import { Content } from 'components/Content';
import ViewMoreBtn from 'components/ViewMoreBtn';
import useSortData from 'hooks/useSortData';
import { getApolloData } from 'services/apollo.service';

export const Apollo = () => {
  const { sortTerm, setSortTerm } = useSortData(getApolloData);

  const num = 6;

  return (
    <Content>
      <Content.Header>
        <MainInfoApollo />
      </Content.Header>
      <Content.Body>
        <div className="apollo_main">
          <ApolloBlocksSort sortTerm={sortTerm} setSortTerm={setSortTerm} />

          <div
            className="apollo_main_table"
            style={{ gridTemplateColumns: `repeat(${num}, auto)` }}
          >
            <ApolloBlocksHeader />
            <ApolloBlocksBody isOnline={true} />
            <ApolloBlocksBody isOnline={true} />
            <ApolloBlocksBody isOnline={true} />
            <ApolloBlocksBody isOnline={false} />
            <ApolloBlocksBody isOnline={true} />
            <ApolloBlocksBody isOnline={true} />
            <ApolloBlocksBody isOnline={false} />
          </div>
          <ViewMoreBtn nameBtn={'Load more'} onclick={null} />
        </div>
      </Content.Body>
    </Content>
  );
};
