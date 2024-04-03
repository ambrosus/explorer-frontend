import { FC } from 'react';

type IAtlasBlocksHeader = {
  pageTitle?: string;
  isRetired?: boolean;
};

const AtlasBlocksHeader: FC<IAtlasBlocksHeader> = ({
  pageTitle,
  isRetired,
}) => {
  return isRetired ? (
    <tr className="atlas_blocks_header atlas_blocks_header_retired">
      <th className="atlas_blocks_header_cell">Address</th>
      <th className="atlas_blocks_header_cell">Status</th>
      <th className="atlas_blocks_header_cell">Blocked amount</th>
      <th className="atlas_blocks_header_cell">Date of unlock</th>
    </tr>
  ) : (
    <tr className="atlas_blocks_header">
      <th className="atlas_blocks_header_cell">Rank</th>
      <th className="atlas_blocks_header_cell">Address</th>
      <th className="atlas_blocks_header_cell">Status</th>
      <th className="atlas_blocks_header_cell">Total {pageTitle}</th>
      <th className="atlas_blocks_header_cell">Balance</th>
      <th className="atlas_blocks_header_cell">Stake</th>
    </tr>
  );
};

export default AtlasBlocksHeader;
