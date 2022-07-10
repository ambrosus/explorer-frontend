import { Content } from 'components/Content';
import Loader from 'components/Loader';
import { useActions } from 'hooks/useActions';
import useAsyncStoreData from 'hooks/useAsyncStoreData';
import useSortData from 'hooks/useSortData';
import useStoreData from 'hooks/useStoreData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { getBundleInfo, getBundlesData } from 'services/bundle.service';
import removeArrayDuplicates from 'utils/helpers';

export const Bundles = () => {
  // const { getBundlesData } = useActions();
  const { renderData: appData } = useSortData(getBundleInfo, '');

  const { loading, data } = useTypedSelector((state) => state.bundles);

  const { bundlesData, bundleInfo } = data || {};

  const { ref, renderData } = useStoreData(
    bundlesData,
    getBundlesData,
    loading,
  );
  const { renderData: data1 } = useAsyncStoreData(getBundleInfo);
  const { ref: ref1, renderData: data2 } = useAsyncStoreData(getBundlesData);
  console.log(data2);

  return (
    <Content>
      <Content.Header>
        <BundleMainTabs data={data1} />
      </Content.Header>
      <Content.Body>
        <div className="bundles_blocks">
          <div className="bundles_blocks_heading">Recent Bundles</div>
          <div className="bundles_blocks_table">
            <BundleBlocksHeader />
            {data2?.data?.length ? (
              data2.data.map((item: any, index: number) => (
                <BundleBlocksBody
                  lastCardRef={data2?.pagination?.hasNext ? ref1 : null}
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
        {data2?.pagination?.hasNext && <Loader />}
      </Content.Body>
    </Content>
  );
};
