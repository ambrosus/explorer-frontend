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
  wrapString,
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
  isTableColumn,
  isIcon,
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
        className="address_blocks_cell universall_light2"
        style={{ fontWeight: '600' }}
      >
        {sliceData10(txhash as string)}
      </div>
    );
  const isMethod =
    method === null ? null : (
      <div className="address_blocks_cell" style={{ gap: 4 }}>
        {isIcon && from && from === address ? (
          <OutgoingTransaction />
        ) : (
          <IncomeTrasaction />
        )}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {wrapString(method)}
        </div>
      </div>
    );
  const isFrom =
    from === null ? (
      <div className="address_blocks_cell"></div>
    ) : //TODO ?
    address !== from && String(from).trim().length ? (
      <NavLink
        to={`/addresses/${from}/`}
        className="address_blocks_cell universall_light2"
      >
        {sliceData5(from as string)}
      </NavLink>
    ) : (
      <div className="address_blocks_cell universall_light2">
        {sliceData5(from as string)}
      </div>
    );
  const isTo =
    //TODO !ту
    to === null || to === undefined ? (
      <div className="address_blocks_cell"></div>
    ) : //TODO ?
    address !== to && String(to).trim().length ? (
      <NavLink
        to={`/addresses/${to}/`}
        style={{ display: 'content' }}
        className="address_blocks_cell universall_light2"
      >
        {sliceData5(to as string)}
      </NavLink>
    ) : (
      <div className="address_blocks_cell universall_light2">
        {sliceData5(to as string)}
      </div>
    );
  const isDate =
    date === null ? null : <div className="address_blocks_cell">{date}</div>;
  const isBlock =
    type === 'ERC-20_Tx' ? null : (
      <div className="address_blocks_cell">{block}</div>
    );

  const Icon = getTokenIcon(symbol as string);
  //TODO ?
  const isAmount =
    amount === null ? (
      <></>
    ) : (
      <div className="address_blocks_cell flex_between">
        {type !== 'ERC-20_Tx' ? (
          <span className="address_blocks_cell_icon">
            <Icon />
          </span>
        ) : (
          <></>
        )}
        {symbol &&
        symbol !== null &&
        symbol !== 'null' &&
        type !== 'ERC-20_Tx' ? (
          <span
            className="address_blocks_icon"
            style={{
              padding: '0 5px',
              //TODO вынести с ретурна
              cursor:
                (symbol !== 'AMB' &&
                  symbol !== 'null' &&
                  symbol !== null &&
                  type !== 'ERC-20_Tx') ||
                token.includes('token')
                  ? 'pointer'
                  : 'default',

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
              //TODO вынести с ретурна + отдельная функция
              addressData?.tokens?.forEach((item: TokenType) => {
                if (
                  (item.name === token && symbol !== 'AMB') ||
                  token.includes('token')
                ) {
                  onClick(item);
                  addFilter(item);
                  navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}`, {
                    replace: true,
                  });
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
        <span className="flex_row">{displayAmount(amount)}</span>
      </div>
    );

  const isTxFee =
    type === 'ERC-20_Tx' ? null : (
      <div className="address_blocks_cell_last">
        <span
          className="universall_indent_icon"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          {online}
        </span>
        <ReactTooltip />
        <span data-tip={String(txfee).length > 8 ? txfee : null}>
          {String(txfee).length > 8 ? String(txfee).slice(0, 8) : txfee}
        </span>
      </div>
    );

  const isToken =
    type === 'ERC-20_Tx' ? (
      <div
        className="address_blocks_cell_last universall_light2"
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
              {token ? token : ''}{' '}
              {token.includes('token')
                ? `(${getAmbTokenSymbol(token)})`
                : !symbol || symbol.trim() === 'null'
                ? '(AMB)'
                : `(${symbol})`}
            </div>
          </>
        ) : (
          <span
            className="address_blocks_cell_token  universall_light2"
            onClick={() => {
              //TODO вывести с ретурна
              addressData?.tokens?.forEach((item: TokenType) => {
                if (
                  (item.name === token && symbol !== 'AMB') ||
                  token.includes('token')
                ) {
                  onClick(item);
                  addFilter(item);
                  navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}`, {
                    replace: true,
                  });
                } else {
                  return '';
                }
              });
            }}
          >
            <NavLink className="address_blocks_icon universall_light2" to={``}>
              {token ? token : ''}{' '}
              {token.includes('token')
                ? `(${getAmbTokenSymbol(token)})`
                : !symbol || symbol.trim() === 'null'
                ? '(AMB)'
                : `(${symbol})`}
            </NavLink>
          </span>
        )}
      </div>
    ) : (
      <></>
    );
  return (
    <div className={isTableColumn} ref={lastCardRef}>
      {isTxHash}
      {isMethod}
      {isFrom}
      {isTo}
      {isDate}
      {isBlock}
      {isAmount}
      {isTxFee}
      {isToken}
    </div>
  );
};

export default AddressBlock;
