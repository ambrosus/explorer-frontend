import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  byteToMgb,
  calcDataTime,
  calcTime,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

const BundleBlocksBody = ({ lastCardRef, item }: any) => {
  const isTxHash = (
    <NavLink
      to={`${item?.bundleId}`}
      className="bundle_blocks_body_cell"
      style={{ color: '#808A9D' }}
    >
      {sliceData10(item?.bundleId, 12)}
    </NavLink>
  );

  const isBy = (
    <div className="bundle_blocks_body_cell" style={{ color: '#808A9D' }}>
      {sliceData5(item.uploader)}
    </div>
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
    <div className="bundle_blocks_body_cell">{item.block.number}</div>
  );
  const isBundleCost = (
    <div className="bundle_blocks_body_cell">
      {`${item.uploadFee.ether} AMB`}
    </div>
  );

  return (
    <div className="bundle_blocks_body" ref={lastCardRef}>
      {isTxHash}
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