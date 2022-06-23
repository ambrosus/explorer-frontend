import { Content } from 'components/Content';
import useSortData from 'hooks/useSortData';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBundleData } from 'services/bundle.service';

export const Bundles = () => {
  const { address } = useParams();
  const [state, setState] = useState();
  console.log(useParams());

  useEffect(() => {
    if (address) {
      getBundleData(address).then((res) => setState(res));
    }
  }, []);
  // console.log(state);

  return (
    <Content>
      <Content.Header>
        <h1>Bundles</h1>
      </Content.Header>
      <Content.Body>
        <div>Bundles CONTENTdsad</div>
      </Content.Body>
    </Content>
  );
};
