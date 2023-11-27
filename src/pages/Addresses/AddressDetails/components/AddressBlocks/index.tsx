import { Currency } from '../../../../../components/UI/Currency';
import Minus from 'assets/icons/Minus';
import Plus from 'assets/icons/Plus';
import GreenCircle from 'assets/icons/StatusAction/GreenCircle';
import IncomeTrasaction from 'assets/icons/StatusAction/IncomeTrasaction';
import OutgoingTransaction from 'assets/icons/StatusAction/OutgoingTransaction';
import moment from 'moment';
import { AddressBlockProps } from 'pages/Addresses/AddressDetails/address-details.interface';
import React, { useMemo, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
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
  inners,
  status,
  type,
  tokenData,
  tokens,
}) => {
  const { address }: TParams = useParams();

  const [isExpanded, setIsExpanded] = useState(false);
  const handleExpand = () => setIsExpanded((state: boolean) => !state);

  const isTxHash: JSX.Element | null = (
    <>
      {inners && (
        <button onClick={handleExpand} className="address_blocks_plus">
          {isExpanded ? <Minus /> : <Plus />}
        </button>
      )}
      <NavLink
        rel="nofollow"
        to={`/tx/${txhash}/`}
        className="address_blocks_cell address_blocks_cell-hash universall_light2"
        style={{ fontWeight: '600' }}
      >
        {sliceData10(txhash as string)}
      </NavLink>
    </>
  );

  const isMethod =
    method === null ? null : (
      <div className="address_blocks_cell" style={{ gap: 4 }}>
        {from && from === address ? (
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
        rel="nofollow"
        to={`/address/${from}/`}
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
        rel="nofollow"
        to={`/address/${to}/`}
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
          className="address_blocks_icon"
          style={{
            fontWeight: 400,
          }}
          to={`/block/${block}/`}
          rel="nofollow"
        >
          {block}
        </NavLink>
      </div>
    );

  const Icon = getTokenIcon(symbol as string, token, tokenData?.address);

  //TODO ?
  const handleBlock = () => {
    if (tokenData) {
      const currentToken = tokens.find(
        (el: any) => el.address === tokenData.address,
      );
      onClick(currentToken);
    }
  };

  const isSymbolERC =
    (symbol !== ('AMB' || 'null' || null) && type !== 'ERC-20_Tx') ||
    token.includes('token');

  const _symbol = useMemo(() => {
    if (tokenData?.address === '0x322269e52800e5094c008f3b01A3FD97BB3C8f5D') {
      return 'HPT';
    } else if (
      tokenData?.address === '0x7240d2444151d9A8c72F77306Fa10f19FE7C9182'
    ) {
      return 'TPT';
    } else if (
      tokenData?.address === '0xEB8386a50Edd613cc43f061E9C5A915b0443C5d4'
    ) {
      return 'PPT';
    } else if (
      tokenData?.address === '0xE984ACe36F2B6f10Fec8dd6fc1bB19c7b1D2F2c6'
    ) {
      return 'GPT';
    } else return symbol;
  }, [tokenData]);

  const tokenName = useMemo(() => {
    if (tokenData?.address === '0x322269e52800e5094c008f3b01A3FD97BB3C8f5D') {
      return 'Hera Pool Token';
    } else if (
      tokenData?.address === '0x7240d2444151d9A8c72F77306Fa10f19FE7C9182'
    ) {
      return 'Test1 Pool Token';
    } else if (
      tokenData?.address === '0xEB8386a50Edd613cc43f061E9C5A915b0443C5d4'
    ) {
      return 'Plutus Pool Token';
    } else if (
      tokenData?.address === '0xE984ACe36F2B6f10Fec8dd6fc1bB19c7b1D2F2c6'
    ) {
      return 'Plutus Pool Token';
    } else return token;
  }, [tokenData]);

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
            {_symbol}
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
          <GreenCircle status={status} />
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
        className="address_blocks_cell_last universall_light2 address_blocks_cell_token"
        style={{ fontWeight: '600', cursor: 'pointer' }}
      >
        {type === 'ERC-20_Tx' && (
          <span className="universall_indent_icon token_icon">
            <Icon />
          </span>
        )}
        <span
          className="address_blocks_cell_token  universall_light2"
          onClick={handleBlock}
        >
          <NavLink className={`address_blocks_icon universall_light2`} to={``}>
            {tokenName
              ? tokenName
              : `${tokenData.address.substring(
                  0,
                  4,
                )}...${tokenData.address.substring(
                  tokenData.address.length - 4,
                  tokenData.address.length,
                )}`}{' '}
            {token.includes('token')
              ? `(${getAmbTokenSymbol(token)})`
              : !_symbol || _symbol.trim() === 'null'
              ? '(AMB)'
              : `(${_symbol})`}
          </NavLink>
        </span>
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
              status={transaction.status}
            />
          </div>
        ))}
    </>
  );
};

export default React.memo(AddressBlock);
