const BlocksHeader = () => {
  return (
    <tr className="blocks_blocks_header">
      <th className="blocks_blocks_header_cell">Block</th>
      <th className="blocks_blocks_header_cell">Validator</th>
      <th className="blocks_blocks_header_cell">Block hash</th>
      <th className="blocks_blocks_header_cell">TXns</th>
      <th className="blocks_blocks_header_cell">Date</th>
      <th className="blocks_blocks_header_cell">Size</th>
    </tr>
  );
};

export default BlocksHeader;
