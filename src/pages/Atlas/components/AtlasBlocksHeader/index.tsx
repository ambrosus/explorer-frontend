import ApolloHeaderStatusModal from './ApolloHeaderStatusModal';
import { useState } from 'react';

const AtlasBlocksHeader = () => {
  const [isShow, setIsShow] = useState(true);
  return (
    <div className="atlas_blocks_header">
      <div className="atlas_blocks_header_cell">Rank</div>
      <div className="atlas_blocks_header_cell">Address</div>
      <div className="atlas_blocks_header_modal">
        <button
          className="atlas_blocks_header_cell"
          onClick={() => setIsShow(!isShow)}
        >
          Status
        </button>
        {isShow && <ApolloHeaderStatusModal />}
      </div>

      <div className="atlas_blocks_header_cell">Total atlas</div>
      <div className="atlas_blocks_header_cell">Balance</div>
      <div className="atlas_blocks_header_cell">Stake</div>
    </div>
  );
};

export default AtlasBlocksHeader;
