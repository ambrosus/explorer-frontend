import BundleDetailsBlocks from './components/BundleDetailsBlocks';
import BundleDetailsMainTabs from './components/BundlesDetailsMainTabs';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleDetailsMain from 'pages/Bundles/BundleDetails/components/BundleDetailsMain';
import { useEffect } from 'react';
import { getBundleData } from 'services/bundle.service';

const BundleDetails = () => {
  const { getBundlesData } = useActions();

  useEffect(() => {
    getBundlesData();
  }, []);

  const { data, loading } = useTypedSelector((state) => state.bundles);

  return (
    <Content>
      <Content.Header>
        <BundleDetailsMain />
        <NodeHeader getNodeData={getBundleData}>
          {({ node }: any) => <BundleDetailsMainTabs data={node} />}
        </NodeHeader>
      </Content.Header>
      <Content.Body>
        <BundleDetailsBlocks />
      </Content.Body>
    </Content>
  );
};

export default BundleDetails;
