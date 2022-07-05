import BundleDetailsBlock from '../BundleDetailsBlock';
import Loader from 'components/Loader';
import useAdressData from 'hooks/useAdressData';
import useSortData from 'hooks/useSortData';
import { useState } from 'react';
import {
  getBundleAssetsData,
  getBundleData,
  getBundleEventsData,
} from 'services/bundle.service';

const BundleDetailsBlocks = () => {
  const [tab, setTab] = useState('assets');

  const { ref: assetsRef, renderData: assetsData } = useSortData(
    getBundleAssetsData,
    '',
  );
  const { ref: eventsRef, renderData: eventsData } = useSortData(
    getBundleEventsData,
    '',
  );
  const { renderData } = useAdressData(getBundleData);

  return (
    <div className="bundle_details_blocks">
      <div className="bundle_details_blocks_filters">
        <button
          className={`bundle_details_blocks_filters_cell ${
            tab === 'assets' && 'blocks_content_mobile_active'
          }`}
          onClick={() => setTab('assets')}
        >
          Assets
          <span className="bundle_details_blocks_filters_span">
            {renderData?.data?.totalAssets}
          </span>
        </button>
        <button
          className={`bundle_details_blocks_filters_cell ${
            tab === 'events' && 'blocks_content_mobile_active'
          }`}
          onClick={() => setTab('events')}
        >
          Events
          <span className="bundle_details_blocks_filters_span">
            {renderData?.data?.totalEvents}
          </span>
        </button>
      </div>

      <div className="bundle_details_blocks_table">
        <div className="bundle_details_blocks_header">Address</div>
        {tab === 'assets' &&
          assetsData?.data?.length &&
          assetsData?.data.map((data: any) => (
            <BundleDetailsBlock
              key={data._id}
              data={data}
              tab={tab}
              bundleRef={assetsData?.pagination?.hasNext ? assetsRef : null}
            />
          ))}
        {tab === 'events' &&
          eventsData?.data?.length &&
          eventsData?.data.map((data: any) => (
            <BundleDetailsBlock
              key={data._id}
              data={data}
              tab={tab}
              bundleRef={eventsData?.pagination?.hasNext ? eventsRef : null}
            />
          ))}
        {(assetsData?.data?.length || eventsData?.data?.length) && <Loader />}
      </div>
    </div>
  );
};

export default BundleDetailsBlocks;
