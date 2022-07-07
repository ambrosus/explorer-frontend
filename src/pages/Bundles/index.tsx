import { Content } from 'components/Content';
import Loader from 'components/Loader';
import { useActions } from 'hooks/useActions';
import useSortData from 'hooks/useSortData';
import useStoreData from 'hooks/useStoreData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { useEffect } from 'react';
import { getBundleInfo, getBundlesData } from 'services/bundle.service';

export const Bundles = () => {
  const { getBundlesData } = useActions();

  useEffect(() => {
    getBundlesData();
  }, []);
  // const { ref, renderData } = useSortData(getBundlesData, '');

  const { renderData: appData } = useSortData(getBundleInfo, '');

  const { data } = useTypedSelector((state) => state.bundles);
  const { bundlesData } = data || {};

  const { ref, renderData: renderBundles } = useStoreData(bundlesData);

  console.log(renderBundles);

  return (
    <Content>
      <Content.Header>
        <BundleMainTabs data={appData} />
      </Content.Header>
      <Content.Body>
        <div className="bundles_blocks">
          <div className="bundles_blocks_heading">Recent Bundles</div>
          <div className="bundles_blocks_table">
            <BundleBlocksHeader />
            {renderBundles?.data?.length ? (
              renderBundles.data.map((item: any, index: number) => (
                <BundleBlocksBody
                  lastCardRef={renderBundles?.pagination?.hasNext ? ref : null}
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>

        {renderBundles?.pagination?.hasNext && <Loader />}
      </Content.Body>
    </Content>
  );
};
