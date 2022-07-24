import API from 'API/api';
import { Content } from 'components/Content';
import Loader from 'components/Loader';
import { useActions } from 'hooks/useActions';
import useAsyncStoreData from 'hooks/useAsyncStoreData';
import { useTypedSelector } from 'hooks/useTypedSelector';
import BundleBlocksBody from 'pages/Bundles/components/BundleBlocksBody';
import BundleBlocksHeader from 'pages/Bundles/components/BundleBlocksHeader';
import BundleMainTabs from 'pages/Bundles/components/BundleMainTabs';
import { useEffect } from 'react';
import { getBundlesData } from 'services/bundle.service';

export const Bundles = () => {
  const { data } = useTypedSelector((state) => state.app);

  const { netInfo } = data || {};

  // const infoData = async () => {
  //   return await API.getInfo();
  // };

  const { ref: ref1, renderData: data2 } = useAsyncStoreData(getBundlesData);
  // const { renderData: data4 } = useAsyncStoreData(infoData);

  return (
    <Content>
      <Content.Header>
        <BundleMainTabs data={netInfo} />
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
