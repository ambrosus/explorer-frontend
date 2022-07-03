import { Content } from 'components/Content';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { observer } from 'mobx-react-lite';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { useParams } from 'react-router-dom';
import {
  getBundleInfo,
  getBundles1Data,
  getBundlesData,
} from 'services/bundle.service';
import bundle from 'store/bundle';

export const Bundles = observer(() => {
  const { ref, renderData } = useSortData(getBundlesData, '');
  const { address } = useParams();

  const { renderData: appData } = useSortData(getBundleInfo, '');
  // console.log(bundle.bundleDaxta)

  // bundle.getBundle();
  const res = bundle.getBundle();
  console.log(res);

  // getBundles1Data().then((res) => console.log(res));
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
            {renderData?.data?.length ? (
              renderData.data.map((item: any, index: number) => (
                <BundleBlocksBody
                  lastCardRef={renderData?.pagination?.hasNext ? ref : null}
                  key={index}
                  item={item}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </div>
        {renderData?.pagination?.hasNext && <Loader />}
      </Content.Body>
    </Content>
  );
});
