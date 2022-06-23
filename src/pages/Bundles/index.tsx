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
        <BundleMain />
        <BundleMain />
      </Content.Header>
      <Content.Body>
        <div>Bundles CONTENTdsad</div>
      </Content.Body>
    </Content>
  );
};
