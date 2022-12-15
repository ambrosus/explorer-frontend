import { useTypedSelector } from 'hooks/useTypedSelector';
import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  byteToMgb,
  calcDataTime,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

const BundleBlocksBody = ({ item }: any) => {
  const isBundle = (
    <NavLink
      rel="canonical"
      to={`${item?.bundleId}/`}
      className="bundle_blocks_body_cell"
      style={{ color: '#808A9D', fontWeight: 600 }}
    >
      {sliceData10(item?.bundleId, 12)}
    </NavLink>
  );

  const isBy = (
    <NavLink
      rel="canonical"
      to={`/address/${item.uploader}/`}
      className="bundle_blocks_body_cell"
      style={{ color: '#808A9D' }}
    >
      {sliceData5(item.uploader)}
    </NavLink>
  );

  const isCreated = (
    <div className="bundle_blocks_body_cell">
      {calcDataTime(item.uploadTimestamp)}
    </div>
  );

  const isDuration = (
    <div className="bundle_blocks_body_cell">
      {`${item.storagePeriods} year`}
    </div>
  );

  const isEntries = (
    <div className="bundle_blocks_body_cell">{`${item.totalAssets} assets / ${item.totalEvents} events`}</div>
  );
  const isSize = (
    <div className="bundle_blocks_body_cell">{`${byteToMgb(
      item.size,
    )} Mb`}</div>
  );

  const isBlock = (
    <div className="bundle_blocks_body_cell">
      <NavLink
        rel="canonical"
        className="address_blocks_icon"
        style={{
          fontWeight: 400,
        }}
        to={`/blocks/${item.block.number}/`}
      >
        {item.block.number}
      </NavLink>
    </div>
  );
  const isBundleCost = (
    <div className="bundle_blocks_body_cell">
      {`${item.uploadFee.ether} AMB`}
    </div>
  );

  return (
    <div className="bundle_blocks_body">
      {isBundle}
      {isBy}
      {isCreated}
      {isDuration}
      {isEntries}
      {isSize}
      {isBlock}
      {isBundleCost}
    </div>
  );
};

export default BundleBlocksBody;
