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
}) => {
  const methodRef = useRef(null);
  const isTxHash =
    txhash === null ? null : (
      <div className="address_blocks_header">{txhash}</div>
    );
  const isMethod =
    method === null ? null : (
      <div ref={methodRef} className="address_blocks_header">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 700,
            fontSize: '0.86rem',
            lineHeight: '1.77em',
            color: '#808A9D',
          }}
        >
          {method}
        </div>
      </div>
    );
  const isFrom =
    from === null ? null : <div className="address_blocks_header">{from}</div>;
  const isTo =
    to === null ? null : <div className="address_blocks_header">{to}</div>;
  const isDate =
    date === null ? null : <div className="address_blocks_header">{date}</div>;
  const isBlock =
    block === null ? null : (
      <div className="address_blocks_header">{block}</div>
    );
  const isAmount =
    amount === null ? null : (
      <div className="address_blocks_header">{amount}</div>
    );
  const isTxFee =
    txfee === null ? null : (
      <div className="address_blocks_header">{txfee}</div>
    );
  const isToken =
    token === null ? null : (
      <div className="address_blocks_header">
        {token && token[0].toUpperCase() + token.slice(1)}
      </div>
    );

  return (
    <>
      {isTxHash}
      {isMethod}
      {isFrom}
      {isTo}
      {isDate}
      {isBlock}
      {isAmount}
      {isTxFee}
      {isToken}
    </>
  );
};

export default AddressBlock;
