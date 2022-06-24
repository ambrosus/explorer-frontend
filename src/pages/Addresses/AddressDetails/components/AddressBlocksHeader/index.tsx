import { AddressBlockProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useRef } from 'react';

const AddressBlock: React.FC<AddressBlockProps> = ({
  txhash,
  method,
  from,
  to,
  date,
  block,
  amount,
  txfee,
  token,
  isTableColumn,
}) => {
  const methodRef = useRef(null);

  return (
    <div className={isTableColumn}>
      {txhash && <div className="address_blocks_header_cell">{txhash} </div>}
      {method && (
        <div ref={methodRef} className="address_blocks_header_cell">
          {method}
        </div>
      )}
      {from && <div className="address_blocks_header_cell">{from}</div>}
      {to && <div className="address_blocks_header_cell">{to}</div>}
      {date && <div className="address_blocks_header_cell">{date}</div>}
      {block && <div className="address_blocks_header_cell">{block}</div>}
      {amount && <div className="address_blocks_header_cell">{amount}</div>}
      {txfee && <div className="address_blocks_header_cell">{txfee}</div>}
      {token && <div className="address_blocks_header_cell">{token}</div>}
    </div>
  );
};

export default AddressBlock;
