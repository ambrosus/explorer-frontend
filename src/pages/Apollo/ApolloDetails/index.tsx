import ApolloDetailsBalance from './components/ApolloDetailsBalance';
import ApolloDetailsMain from './components/ApolloDetailsMain';
import ApolloDetailsMiningStats from './components/ApolloDetailsMiningStats';
import { Content } from 'components/Content';

export const ApolloDetails = () => {
  return (
    <Content>
      <Content.Header>
        <div className="apollo_details_header">
          <ApolloDetailsMain />
          <ApolloDetailsBalance />
          {/* <ApolloDetailsMiningStats /> */}
        </div>
      </Content.Header>
      <Content.Body>
        <></>
      </Content.Body>
    </Content>
  );
};
