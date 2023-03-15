import BundleDetailsBlocks from './components/BundleDetailsBlocks';
import BundleDetailsMainTabs from './components/BundlesDetailsMainTabs';
import { Content } from 'components/Content';
import NodeHeader from 'components/NodeHeader';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleDetailsMain from 'pages/Bundles/BundleDetails/components/BundleDetailsMain';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { getBundleData } from 'services/bundle.service';

const BundleDetails = () => {
  const { setAppDataAsync } = useActions();
  const { address } = useParams();

  useEffect(() => {
    setAppDataAsync(address);
  }, []);

  const { data } = useTypedSelector((state) => state.app);

  return (
    <Content>
      <Helmet>
        <meta name="robots" content="noindex" />
        <link rel="canonical" href="https://airdao.io/explorer/bundles/" />
        <title>Bundles. Ambrosus Network Explorer</title>
        <meta
          name="description"
          content="Explore Ambrosus Network Bundles: average bundle load, aprox bundle, bundle cost, entries total etc."
        />
      </Helmet>
      <Content.Header>
        <BundleDetailsMain />
        <NodeHeader getNodeData={getBundleData}>
          {({ node, index }: any) => (
            <BundleDetailsMainTabs key={index} data={node} />
          )}
        </NodeHeader>
      </Content.Header>
      <Content.Body>
        <BundleDetailsBlocks />
      </Content.Body>
    </Content>
  );
};

export default BundleDetails;
