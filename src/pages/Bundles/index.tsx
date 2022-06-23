import { Content } from 'components/Content';
import useSortData from 'hooks/useSortData';
import BundleMain from 'pages/Bundles/components/BundleMain';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBundleData, getBundlesData } from 'services/bundle.service';

export const Bundles = () => {
  const { ref, renderData, loading } = useSortData(getBundlesData, null);

  console.log(renderData);

  return (
    <Content>
      <Content.Header>
        <h1 style={{ margin: '32px 0' }}>Bundles</h1>
        <BundleMain mainColumns="2fr 2fr 1.2fr" />
        <BundleMain mainColumns="2fr 1.8fr 1.5fr" />
      </Content.Header>
      <Content.Body>
        <div>Bundles CONTENTdsad</div>
      </Content.Body>
    </Content>
  );
};
