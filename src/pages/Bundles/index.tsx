import { Content } from 'components/Content';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMain from 'pages/Bundles/components/BundleMain';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBundleData, getBundlesData } from 'services/bundle.service';

export const Bundles = () => {
  const { ref, renderData, loading } = useSortData(getBundlesData, null, ' ');

  useEffect(() => {});

  return (
    <Content>
      <Content.Header>
        <h1 style={{ margin: '32px 0' }}>Bundles</h1>
        <BundleMain mainColumns="2fr 2fr 1.2fr" />
        <BundleMain mainColumns="2fr 1.8fr 1.5fr" />
      </Content.Header>
      <Content.Body>
        <BundleBlocksHeader />
        {/* <BundleBlocksBody /> */}

        {renderData && renderData.data && renderData.data.length
          ? renderData.data.map((item: any, index: number) => (
              <BundleBlocksBody
                lastCardRef={
                  renderData.data.length - 1 === index &&
                  renderData?.pagination?.hasNext
                    ? ref
                    : null
                }
                key={index}
                item={item}
              />
            ))
          : null}
        {!loading && renderData?.pagination?.hasNext && <Loader />}
      </Content.Body>
    </Content>
  );
};
