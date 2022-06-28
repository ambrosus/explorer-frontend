import BundleDetailsBlock from '../BundleDetailsBlock';
import useSortData from 'hooks/useSortData';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  getBundleAssetsData,
  getBundleData,
  getBundleWithEntriesData,
} from 'services/bundle.service';
import { bundleTabs } from 'utils/sidePages';

const BundleDetailsBlocks = ({
  data,
  setSortTerm,
  sortTerm,
  bundleRef,
}: any) => {
  const { address, type } = useParams();

  // console.log(data?.events);

  const handleBundlesTab = (filter: any) => setSortTerm(filter);

  // const h2ref = useRef<any>(null);

  // useEffect(() => {
  //   h2ref.current.scrollIntoView();
  // }, [type]);

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
      {type === 'assets' &&
        data?.assets?.data.map((data: any) => (
          <BundleDetailsBlock key={data._id} data={data.assetId} />
        ))}
      {type === 'events' &&
        data?.events?.data.map((data: any) => (
          <BundleDetailsBlock key={data._id} data={data.eventId} />
        ))}
    </div>
  );
};

export default BundleDetailsBlocks;
