import { FC } from 'react';

const BlocksHeader: FC = () => {
  return (
    <div className="blocks_blocks_header">
      <div className="blocks_blocks_header_cell">Block</div>
      <div className="blocks_blocks_header_cell">Validator</div>
      <div className="blocks_blocks_header_cell">Block hash</div>
      <div className="blocks_blocks_header_cell">TXns</div>
      <div className="blocks_blocks_header_cell">Date</div>
      <div className="blocks_blocks_header_cell">Size</div>
    </div>
  );
};

export default BlocksHeader;
