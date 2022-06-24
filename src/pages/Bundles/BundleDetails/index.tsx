import BundleDetailsBody from './components/BundleDetailsBody';
import BundleDetailsMain from './components/BundleDetailsMain';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import Tabs2 from 'components/Tabs/Tabs2';
import useSortData from 'hooks/useSortData';
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
    address,
    '',
  );
  const [selectedToken, setSelectedToken] = useState<any>(null);
  console.log(renderData);

  return (
    <Content>
      <Content.Header>
        <NodeHeader getNodeData={getBundleData}>
          {({ node }: any) => {
            return (
              node && (
                <>
                  <BundleDetailsMain
                    bundle={node}
                    mainColumns="2fr 2fr 1.2fr"
                  />

                  <BundleDetailsMain
                    bundle={node}
                    mainColumns="2fr 1.8fr 1.5fr"
                  />
                </>
              )
            );
          }}
        </NodeHeader>
      </Content.Header>
      <Content.Body>
        <BundleDetailsBody />
      </Content.Body>
    </Content>
  );
};

export default BundleDetails;
