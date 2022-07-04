import { Currency } from '../../../../../components/UI/Currency';
import Minus from 'assets/icons/Minus';
import Plus from 'assets/icons/Plus';
import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import IncomeTrasaction from 'assets/icons/StatusAction/IncomeTrasaction';
import OutgoingTransaction from 'assets/icons/StatusAction/OutgoingTransaction';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import {
  AddressBlockProps,
  TokenType,
} from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { TParams } from 'types';
import {
  displayAmount,
  getAmbTokenSymbol,
  getTokenIcon,
  scientificToDecimal,
  sliceData10,
  sliceData5,
  wrapString,
} from 'utils/helpers';

export const Tooltip = React.memo(({ val }: any) => {
  return val?.length > 8 ? (
    <ReactTooltip
      overridePosition={({ left, top }) => ({ left: left - 30, top })}
      id={val}
      effect="solid"
    >
      {val}
    </ReactTooltip>
  ) : (
    <></>
  );
});

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
  inners,
  hashOnClick,
}) => {
  const { addFilter } = useActions();
  const { address, type }: TParams = useParams();

  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded((state: boolean) => !state);

  const { data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );

  const handleHashClick = () => {
    if (hashOnClick) {
      hashOnClick(txhash);
    }
  };

  const isTxHash: JSX.Element | null =
    txhash === null ? null : (
      <div
        className="address_blocks_cell address_blocks_cell-hash"
        style={{
          fontWeight: '600',
        }}
      >
        {inners && (
          <button onClick={handleExpand} className="address_blocks_plus">
            {isExpanded ? <Minus /> : <Plus />}
          </button>
        )}
        <span className="universall_light2" onClick={handleHashClick}>
          {sliceData10(txhash as string)}
        </span>
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
      <div className="address_blocks_cell">
        <NavLink
          className="address_blocks_icon universall_light2"
          to={`/blocks/${block}`}
        >
          {block}
        </NavLink>
      </div>
    );

  const Icon = getTokenIcon(symbol as string);
  //TODO ?
  const handleBlock = () => {
    addressData?.tokens?.forEach((item: TokenType) => {
      if (
        (item.name === token && symbol !== 'AMB') ||
        (token.includes('token') && item.name === token)
      ) {
        onClick(item);
        addFilter(item);
        navigate(`/addresses/${address}/ERC-20_Tx/${item.contract}`);
      } else {
        return '';
      }
    });
  };

  const isSymbolERC =
    (symbol !== ('AMB' || 'null' || null) && type !== 'ERC-20_Tx') ||
    token.includes('token');

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
        {symbol !== (null || 'null') && type !== 'ERC-20_Tx' && (
          <span
            className="address_blocks_icon"
            style={{
              padding: '0 5px',
              cursor: isSymbolERC ? 'pointer' : 'default',
              textDecoration: isSymbolERC ? 'underline' : 'none',
            }}
            onClick={handleBlock}
          >
            {type !== 'ERC-20_Tx' && token.includes('token')
              ? getAmbTokenSymbol(token)
              : symbol}
          </span>
        )}
        <span className="flex_row">
          <Currency value={displayAmount(amount) || 0} symbol=" " />
        </span>
      </div>
    );

  const isTxFee =
    type === 'ERC-20_Tx' ? null : (
      <div className="address_blocks_cell_last">
        <span
          className="universall_indent_icon"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <GreenCircle />
        </span>
        <Tooltip val={String(scientificToDecimal(txfee))} />
        <span data-tip data-for={scientificToDecimal(txfee)}>
          {String(scientificToDecimal(txfee)).length > 8
            ? String(scientificToDecimal(txfee)).slice(0, 8)
            : scientificToDecimal(txfee)}
        </span>
      </div>
    );

  const isToken =
    type === 'ERC-20_Tx' ? (
      <div
        className="address_blocks_cell_last universall_light2"
        style={{ fontWeight: '600', cursor: isLatest ? 'pointer' : 'default' }}
      >
        {type === 'ERC-20_Tx' && (
          <span className="universall_indent_icon">
            <Icon />
          </span>
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
            onClick={handleBlock}
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
    <>
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
      {isExpanded &&
        inners &&
        !!inners.length &&
        inners.map((transaction) => (
          <div key={transaction.hash} className="address_blocks_inner">
            <AddressBlock
              onClick={onClick}
              txhash={transaction.hash}
              method={transaction.type}
              from={transaction.from}
              to={transaction.to}
              date={moment(transaction.timestamp * 1000).fromNow()}
              block={transaction.blockNumber}
              amount={transaction.value.ether}
              txfee={transaction.gasCost.ether}
              token={`${transaction?.token ? transaction?.token : 'AMB'}`}
              symbol={`${transaction?.symbol ? transaction?.symbol : 'AMB'}`}
              isTableColumn={isTableColumn}
              inners={transaction.inners}
            />
          </div>
        ))}
    </>
  );
};

export default React.memo(AddressBlock);
