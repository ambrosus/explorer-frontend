import useSortData from 'hooks/useSortData';
import { useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import {
  getBundleAssetsData,
  getBundleData,
  getBundleWithEntriesData,
} from 'services/bundle.service';
import { bundleTabs } from 'utils/sidePages';

const BundleDetailsBlocks = () => {
  const { address, type } = useParams();
  const { ref, renderData, sortTerm, setSortTerm, loading } = useSortData(
    getBundleWithEntriesData,
    type,
  );

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
      <div className="bundle_details_blocks_body">
        <div className="bundle_details_blocks_body_cell">
          0x50bb32056e8c090907a5995860fc9a096442b9074bdf09cf0247a1e145485e6b
        </div>
      </div>
    </div>
  );
};

export default BundleDetailsBlocks;
