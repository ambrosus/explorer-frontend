import BundleDetailsBody from './components/BundleDetailsBody';
import BundleDetailsMainTabs from './components/BundleDetailsMainTabs';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import Tabs2 from 'components/Tabs/Tabs2';
import useSortData from 'hooks/useSortData';
import BundleDetailsMain from 'pages/Bundles/BundleDetails/components/BundleDetailsMain';
import BundleMain from 'pages/Bundles/components/BundleMain';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBundleData } from 'services/bundle.service';
import { TParams } from 'types';
import { byteToMgb } from 'utils/helpers';

const BundleDetails = () => {
  const { address, type = '' }: TParams = useParams();
  const { ref, sortTerm, setSortTerm, renderData, loading } = useSortData(
    getBundleData,
    '',
  );
  const [selectedToken, setSelectedToken] = useState<any>(null);

  // console.log(getBundleData(address).then((res) => console.log(res)));

  return (
    <Content>
      <Content.Header>
        <BundleDetailsMain />
        <NodeHeader getNodeData={getBundleData}>
          {({ node }: any) => <BundleDetailsMainTabs data={node} />}
        </NodeHeader>
      </Content.Header>
      <Content.Body>
        <BundleDetailsBody />
      </Content.Body>
    </Content>
  );
};

export default BundleDetails;
