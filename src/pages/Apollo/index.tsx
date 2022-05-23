import ApolloBlocksBody from './components/ApolloBlocksBody';
import ApolloBlocksHeader from './components/ApolloBlocksHeader';
import ApolloBlocksSort from './components/ApolloBlocksSort';
import MainInfoApollo from './components/MainInfoApollo';
import { Content } from 'components/Content';
import useSortData from 'hooks/useSortData';
import { getApolloData } from 'services/apollo.service';

export const Apollo = () => {
  const { ref, sortTerm, setSortTerm, accounts } = useSortData(getApolloData);

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
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
            <ApolloBlocksBody />
          </div>
        </div>
      </Content.Body>
    </Content>
  );
};
