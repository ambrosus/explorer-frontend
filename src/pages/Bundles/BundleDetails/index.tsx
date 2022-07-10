import BundleDetailsBlocks from './components/BundleDetailsBlocks';
import BundleDetailsMainTabs from './components/BundlesDetailsMainTabs';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import { useActions } from 'hooks/useActions';
import usePaginationData from 'hooks/usePaginationData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleDetailsMain from 'pages/Bundles/BundleDetails/components/BundleDetailsMain';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBundleData } from 'services/bundle.service';

const BundleDetails = () => {
  // const { getBundlesData } = useActions();
  const { address } = useParams();

  // useEffect(() => {
  //   getBundlesData(address);
  // }, []);

  // const { ref, renderData } = usePaginationData(getBundlesData);

  // const { data, loading } = useTypedSelector((state) => state.bundles);

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
