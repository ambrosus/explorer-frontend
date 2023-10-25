import { FC } from 'react';

type IAtlasBlocksHeader = {
  pageTitle?: string;
  isRetired?: boolean
};

const AtlasBlocksHeader: FC<IAtlasBlocksHeader> = ({ pageTitle, isRetired }) => {
  return isRetired ? (
    <div className="atlas_blocks_header atlas_blocks_header_retired">
      <div className="atlas_blocks_header_cell">Address</div>
      <div className="atlas_blocks_header_cell">Status</div>
      <div className="atlas_blocks_header_cell">Blocked amount</div>
      <div className="atlas_blocks_header_cell">Date of unlock</div>
    </div>
    ) : (
    <div className="atlas_blocks_header">
      <div className="atlas_blocks_header_cell">Rank</div>
      <div className="atlas_blocks_header_cell">Address</div>
      <div className="atlas_blocks_header_cell">Status</div>
      <div className="atlas_blocks_header_cell">Total {pageTitle}</div>
      <div className="atlas_blocks_header_cell">Balance</div>
      <div className="atlas_blocks_header_cell">Stake</div>
    </div>
  );
};

export default AtlasBlocksHeader;
