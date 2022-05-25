import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import IncomeTrasaction from 'assets/icons/StatusAction/IncomeTrasaction';
import OrangeCircle from 'assets/icons/StatusAction/OrangeCircle';
import OutgoingTransaction from 'assets/icons/StatusAction/OutgoingTransaction';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import {
  AddressBlockProps,
  TokenType,
} from 'pages/Addresses/AddressDetails/address-details.interface';
import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { TParams } from 'types';
import {
  displayAmount,
  getAmbTokenSymbol,
  getTokenIcon,
  sliceData10,
  sliceData5,
} from 'utils/helpers';

const AddressBlock: React.FC<AddressBlockProps> = ({
  onClick,
  lastCardRef,
  isLatest,
  txhash,
  method,
  from,
  to,
  date,
  block,
  amount,
  txfee,
  token,
  symbol,
}) => {
  const online = txfee === 'Pending' ? <OrangeCircle /> : <GreenCircle />;
  const { addFilter } = useActions();
  const { address, type }: TParams = useParams();

  const navigate = useNavigate();
  const { data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );

  const isTxHash: JSX.Element | null =
    txhash === null ? null : (
      <div
        ref={lastCardRef}
        className="address_blocks_td universall_light2"
        style={{ fontWeight: '600' }}
      >
        {sliceData10(txhash as string)}
      </div>
    );
  const isMethod =
    method === null ? null : (
      <div className="address_blocks_td" style={{ gap: 4 }}>
        {from && from === address ? (
          <OutgoingTransaction />
        ) : (
          <IncomeTrasaction />
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {method.split('::').map((item, index) => (
            <span key={index + 1}>{item}</span>
          ))}
        </div>
      </div>
    );

  const isFrom =
    from === null ? null : address !== from && String(from).trim().length ? (
      <NavLink
        replace
        to={`/addresses/${from}/`}
        className="address_blocks_td universall_light2"
      >
        {sliceData5(from as string)}
      </NavLink>
    ) : (
      <div className="address_blocks_td universall_light2">
        {sliceData5(from as string)}
      </div>
    );
  const isTo =
    to === null ? null : address !== to ? (
      <NavLink
        replace
        to={`/addresses/${to}/`}
        style={{ display: 'content' }}
        className="address_blocks_td universall_light2"
      >
        {sliceData5(to as string)}
      </NavLink>
    ) : (
      <div className="address_blocks_td universall_light2">
        {sliceData5(to as string)}
      </div>
    );
  const isDate =
    date === null ? null : <div className="address_blocks_td">{date}</div>;
  const isBlock =
    type === 'ERC-20_Tx' ? null : (
      <div className="address_blocks_td">{block}</div>
    );

  const Icon = getTokenIcon(symbol as string);

  const isAmount =
    amount === null ? (
      <></>
    ) : (
      <div className="address_blocks_td flex-between">
        <span style={{ minWidth: 77 }} className="flex-row">
          {type !== 'ERC-20_Tx' ? (
            <span className="universall_indent_icon">
              <Icon />
            </span>
          ) : (
            <></>
          )}
          {displayAmount(amount)}
        </span>
        {symbol && symbol !== null && symbol !== 'null' ? (
          <span
            className="address_blocks_icon"
            style={{
              padding: '0 5px',
              cursor:
                (symbol !== 'AMB' &&
                  symbol !== 'null' &&
                  symbol !== null &&
                  type !== 'ERC-20_Tx') ||
                token.includes('token')
                  ? 'pointer'
                  : 'default',
              color: '#808a9d',
              textDecoration:
                (symbol !== 'AMB' &&
                  symbol !== 'null' &&
                  symbol !== null &&
                  type !== 'ERC-20_Tx') ||
                token.includes('token')
                  ? 'underline'
                  : 'none',
            }}
            onClick={() => {
              addressData?.tokens?.forEach((item: TokenType) => {
                if (
                  (item.name === token && symbol !== 'AMB') ||
                  token.includes('token')
                ) {
                  onClick(item);
                  addFilter(item);
                  navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}`);
                } else {
                  return '';
                }
              });
            }}
          >
            {type !== 'ERC-20_Tx' ? (
              <>
                {' '}
                {token.includes('token') ? getAmbTokenSymbol(token) : symbol}
              </>
            ) : (
              ''
            )}
          </span>
        ) : (
          <></>
        )}
      </div>
    );

  const isTxFee =
    type === 'ERC-20_Tx' ? null : (
      <div className="address_blocks_td" style={{ padding: 0 }}>
        <span
          className="universall_indent_icon"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {online}
        </span>
        <ReactTooltip />
        <span
          data-tip={String(txfee).length > 12 ? txfee : null}
          // cut to 6 character
        >
          {String(txfee).length > 12 ? String(txfee).slice(0, 12) : txfee}
        </span>
      </div>
    );
  const isToken =
    type === 'ERC-20_Tx' ? (
      <div
        className="address_blocks_td universall_light2"
        style={{ fontWeight: '600', cursor: isLatest ? 'pointer' : 'default' }}
      >
        {type === 'ERC-20_Tx' ? (
          <span className="universall_indent_icon">
            <Icon />
          </span>
        ) : (
          ''
        )}
        {!isLatest ? (
          <>
            <div className="address_blocks_icon universall_light2">
              {token ? token : ''} {!symbol ? '(AMB)' : `(${symbol})`}
            </div>
          </>
        ) : (
          <span
            className="address_blocks_td universall_light2"
            onClick={() => {
              addressData?.tokens.forEach((item: TokenType) => {
                if (item.name === token) {
                  onClick(item);
                  addFilter(item);
                  navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}/`);
                }
              });
            }}
          >
            <div className="address_blocks_icon universall_light2">
              {token ? token : ''}{' '}
              {!symbol || symbol.trim() === 'null' ? '(AMB)' : `(${symbol})`}
            </div>
          </span>
        )}
      </div>
    ) : (
      <></>
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
