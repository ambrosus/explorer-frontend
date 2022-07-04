import { Content } from 'components/Content';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { useParams } from 'react-router-dom';
import { getBundleInfo, getBundlesData } from 'services/bundle.service';

export const Bundles = () => {
  const { ref, renderData } = useSortData(getBundlesData, '');

  const { renderData: appData } = useSortData(getBundleInfo, '');
  // console.log(data);

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
};
