const BlockHeader = () => {
  return (
    <div className="blocks_block_header">
      <div className="blocks_block_header_cell">Block hash</div>
      <div className="blocks_block_header_cell">Method</div>
      <div className="blocks_block_header_cell">From</div>
      <div className="blocks_block_header_cell">To</div>
      <div className="blocks_block_header_cell">Date</div>
      <div className="blocks_block_header_cell">Amount</div>
    </div>
  );
};

export default BlockHeader;
