import BundleDetailsBlock from '../BundleDetailsBlock';
import Loader from 'components/Loader';
import useAsyncStoreData from 'hooks/useAsyncStoreData';
import { useEffect, useRef, useState } from 'react';
import {
  getBundleAssetsData,
  getBundleData,
  getBundleEventsData,
} from 'services/bundle.service';

const BundleDetailsBlocks = () => {
  const [tab, setTab] = useState('assets');
  const tableRef = useRef<any>(null);

  useEffect(() => {
    if (tableRef.current) {
      tableRef.current.scrollLeft = 0;
    }
  }, [tab]);

  const {
    ref: assetsRef,
    renderData: assetsData,
    hasNext: assersNext,
  } = useAsyncStoreData(getBundleAssetsData);
  const {
    ref: eventsRef,
    renderData: eventsData,
    hasNext: eventsNext,
  } = useAsyncStoreData(getBundleEventsData);

  const hasNext = tab === 'assets' ? assersNext : eventsNext;

  const { renderData } = useAsyncStoreData(getBundleData);

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

      <div className="bundle_details_blocks_table" ref={tableRef}>
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
        {hasNext && <Loader />}
      </div>
    </div>
  );
};

export default BundleDetailsBlocks;
