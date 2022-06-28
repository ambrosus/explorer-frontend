import BundleDetailsBlock from '../BundleDetailsBlock';
import Loader from 'components/Loader';
import useSortData from 'hooks/useSortData';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  getBundleAssetsData,
  getBundleEventsData,
} from 'services/bundle.service';
import { bundleTabs } from 'utils/sidePages';

const BundleDetailsBlocks = () => {
  const { address, type } = useParams();

  const { ref, renderData, setSortTerm, loading } = useSortData(
    type === 'assets' ? getBundleAssetsData : getBundleEventsData,
    '',
  );
  console.log(renderData.data);

  const handleBundlesTab = (filter: any) => setSortTerm(filter);

  return (
    <div className="bundle_details_blocks">
      <div className="bundle_details_blocks_filters">
        {bundleTabs.map((filter) => (
          <NavLink
            key={filter.title}
            to={`/bundles/${address}/${filter.value}`}
            className={({ isActive }) =>
              `bundle_details_blocks_filters_cell ${
                isActive && 'blocks_content_mobile_active'
              }`
            }
            onClick={() => handleBundlesTab(filter.value)}
          >
            {filter.title}
          </NavLink>
        ))}
      </div>
      <div className="bundle_details_blocks_header">
        <div className="bundle_details_blocks_header_cell">Address</div>
      </div>
      {renderData?.data?.length ? (
        (type === 'assets' &&
          renderData?.data.map((data: any) => (
            <BundleDetailsBlock
              key={data._id}
              data={data.assetId}
              bundleRef={renderData?.pagination?.hasNext ? ref : null}
            />
          ))) ||
        (type === 'events' &&
          renderData?.data.map((data: any) => (
            <BundleDetailsBlock
              key={data._id}
              data={data.eventId}
              bundleRef={renderData?.pagination?.hasNext ? ref : null}
            />
          )))
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default BundleDetailsBlocks;
