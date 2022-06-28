import BundleDetailsBlocks from './components/BundleDetailsBlocks';
import BundleDetailsMainTabs from './components/BundlesDetailsMainTabs';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import useSortData from 'hooks/useSortData';
import BundleDetailsMain from 'pages/Bundles/BundleDetails/components/BundleDetailsMain';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  getBundleData,
  getBundleWithEntriesData,
} from 'services/bundle.service';
import { TParams } from 'types';

const BundleDetails = () => {
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
