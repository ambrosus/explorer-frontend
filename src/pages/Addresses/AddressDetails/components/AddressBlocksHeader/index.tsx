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
  const isTxHash =
    txhash === null ? null : (
      <div className="address_blocks_header_cell">{txhash} </div>
    );
  const isMethod =
    method === null ? null : (
      <div ref={methodRef} className="address_blocks_header_cell">
        {method}
      </div>
    );
  //TODO double code
  const isFrom =
    from === null ? null : (
      <div className="address_blocks_header_cell">{from}</div>
    );
  const isTo =
    to === null ? null : <div className="address_blocks_header_cell">{to}</div>;
  const isDate =
    date === null ? null : (
      <div className="address_blocks_header_cell">{date}</div>
    );
  const isBlock =
    block === null ? null : (
      <div className="address_blocks_header_cell">{block}</div>
    );
  const isAmount =
    amount === null ? null : (
      <div className="address_blocks_header_cell">{amount}</div>
    );
  const isTxFee =
    txfee === null ? null : (
      <div className="address_blocks_header_cell">{txfee}</div>
    );
  const isToken =
    token === null ? null : (
      <div className="address_blocks_header_cell">{token}</div>
    );
  //TODO убрать переменные
  return (
    <thead className={isTableColumn}>
      {isTxHash && <th>{isTxHash}</th>}
      {isMethod && <th>{isMethod}</th>}
      {isFrom && <th>{isFrom}</th>}
      {isTo && <th>{isTo}</th>}
      {isDate && <th>{isDate}</th>}
      {isBlock && <th>{isBlock}</th>}
      {isAmount && <th>{isAmount}</th>}
      {isTxFee && <th>{isTxFee}</th>}
      {isToken && <th>{isToken}</th>}
    </thead>
  );
};

export default AddressBlock;
