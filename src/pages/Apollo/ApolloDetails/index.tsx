import ApolloDetailsBalance from './components/ApolloDetailsBalance';
import ApolloDetailsMain from './components/ApolloDetailsMain';
import ApolloDetailsMiningStats from './components/ApolloDetailsMiningStats';
import { Content } from 'components/Content';
import { sidePages } from 'utils/sidePages';

export const ApolloDetails = () => {
  const { transactionFilters } = sidePages;

  return (
    <Content>
      <Content.Header>
        <div className="apollo_details_header">
          <ApolloDetailsMain />
          <ApolloDetailsBalance />
          <ApolloDetailsMiningStats />
        </div>
      </Content.Header>
      <Content.Body>
        <></>
      </Content.Body>
    </Content>
  );
};
