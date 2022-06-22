import AddressBlock from '../../pages/Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import ExportCsv from '../ExportCsv';
import Loader from '../Loader';
import NotFoundIcon from 'assets/icons/Errors/NotFoundIcon';
import SideMenu from 'assets/icons/SideMenu';
import Calendar from 'components/Calendar';
import useDeviceSize from 'hooks/useDeviceSize';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useTypedSelector } from 'hooks/useTypedSelector';
import moment from 'moment';
import {
  TabsProps,
  TransactionProps,
} from 'pages/Addresses/AddressDetails/address-details.interface';
import AddressBlocksHeader from 'pages/Addresses/AddressDetails/components/AddressBlocksHeader';
import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { setupStyle, toUniqueValueByBlock } from 'utils/helpers';
import { sidePages } from 'utils/sidePages';

const Tabs: FC<TabsProps> = ({
  data,
  lastCardRef,
  onClick,
  setTransactionType,
  pageNum,
  loading,
  transactionType,
}) => {
  const [isShow, setIsShow] = useState(false);
  const { address, type, filtered, tokenToSorted } = useParams();
  const [renderData, setRenderData] = useState<any>(null);
  const [notFound, setNotFound] = useState<any>(false);
  const { data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );
  const mobileCalendarRef = useRef(null);

  const { transactionFilters, ERC20Filters, methodFilters } = sidePages;

  const headerBlock: any = type === 'ERC-20_Tx' ? null : 'Block';
  const headerTxfee: any = type === 'ERC-20_Tx' ? null : 'txFee';
  const headerToken: any = type === 'ERC-20_Tx' ? 'token' : null;

  const noDtaFound = () => {
    if (pageNum < addressData?.meta?.totalPages && type !== 'ERC-20_Tx') {
      return false;
    } else {
      setTimeout(() => {
        if (!loading && !renderData?.length) {
          setNotFound(true);
        } else {
          setNotFound(false);
        }
      }, 500);
    }
    return notFound;
  };
  useOnClickOutside(mobileCalendarRef, () => setIsShow(false));

  useLayoutEffect(() => {
    if (
      addressData?.latestTransactions?.length &&
      type === 'ERC-20_Tx' &&
      !filtered
    ) {
      setRenderData(toUniqueValueByBlock(addressData.latestTransactions));
    }

    if (addressData && !loading) {
      if (data?.length && type !== 'ERC-20_Tx' && !filtered) {
        if (type === 'transfers') {
          let transfersDataTx: TransactionProps[];
          setRenderData((prev: any) => {
            if (prev === null) {
              transfersDataTx = data.filter(
                (item: TransactionProps) => item.method === 'Transfer',
              );
              return transfersDataTx
                ? toUniqueValueByBlock(transfersDataTx)
                : toUniqueValueByBlock(prev);
            } else {
              transfersDataTx = [...prev, ...data].filter(
                (item: TransactionProps) => item.method === 'Transfer',
              );
              return toUniqueValueByBlock(transfersDataTx) || [];
            }
          });
        } else {
          setRenderData(toUniqueValueByBlock(data));
        }
      }
      if (data?.length && filtered && type === 'ERC-20_Tx') {
        setRenderData(toUniqueValueByBlock(data));
      }
    }
    //TODO !!
  }, [data, filtered, type]);

  useEffect(() => {
    if (address || type || filtered || tokenToSorted) {
      setRenderData(null);
    }
  }, [address, type, filtered, tokenToSorted]);

  const { FOR_TABLET } = useDeviceSize();

  const isTableColumn = renderData?.length
      ? setupStyle(type)
      : 'addresses_body_no_data';

  const handleNavLinkClass = (itemValue: any) =>
    `tabs_link ${
      itemValue === transactionType ||
      (transactionType === 'ERC-20_Tx' &&
        itemValue === 'Transferss' &&
        tokenToSorted !== undefined) ||
      (transactionType === 'ERC-20_Tx' &&
        tokenToSorted === undefined &&
        itemValue === 'Alls')
        ? 'tabs_link_active'
        : ''
    }`;

  const handleShow = () => setIsShow(!isShow);

  return (
    <>
      <div className="tabs">
        <div className="tabs_heading" tabIndex={-1}>
          <div className="tabs_heading_filters" tabIndex={-1}>
            {isShow && (
              <div
                ref={mobileCalendarRef}
                className="tabs_heading_export_modal_mobile"
              >
                <Calendar />
              </div>
            )}
            {!filtered
              ? transactionFilters &&
                transactionFilters.length &&
                transactionFilters.map((filter) => (
                  <NavLink
                    key={filter.title}
                    to={`/addresses/${address}/${
                      filter.value ? filter.value : ''
                    }`}
                    className={() => handleNavLinkClass(filter.value)}
                    onClick={() => {
                      setTransactionType(filter.value);
                    }}
                  >
                    {filter.title}
                  </NavLink>
                ))
              : ERC20Filters &&
                ERC20Filters.length &&
                ERC20Filters.map((filter) => (
                  <NavLink
                    key={filter.title}
                    to={`/addresses/${address}/ERC-20_Tx/${filtered}/${filter.value} `}
                    className={() => handleNavLinkClass(`${filter?.title}s`)}
                    onClick={(e) => {
                      setTransactionType(filter.value);
                    }}
                  >
                    {filter.title}
                  </NavLink>
                ))}
          </div>

          <div ref={mobileCalendarRef} className="tabs_heading_export_modal">
            {FOR_TABLET ? (
              <ExportCsv />
            ) : (
              <>
                <div className="tabs_side_menu">
                  <button className="tabs_side_menu_icon" onClick={handleShow}>
                    <SideMenu />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <section className="tabs_table">
          {renderData?.length && (
            <AddressBlocksHeader
              txhash="txHash"
              method="Method"
              from="From"
              to="To"
              date="Date"
              block={headerBlock}
              amount="Amount"
              txfee={headerTxfee}
              token={headerToken}
              methodFilters={methodFilters}
              isTableColumn={isTableColumn}
            />
          )}

          {renderData?.length !== 0
            ? renderData?.map((transaction: TransactionProps, index: number) =>
                (renderData.length > 30 &&
                  renderData.length - 9 === index &&
                  type !== 'ERC-20_Tx') ||
                (renderData.length < 30 &&
                  renderData.length - 1 === index &&
                  type !== 'ERC-20_Tx') ? (
                  //TODO double code
                  <AddressBlock
                    lastCardRef={lastCardRef}
                    isLatest={type === 'ERC-20_Tx' && !filtered}
                    onClick={onClick}
                    key={transaction.txHash}
                    txhash={transaction.txHash}
                    method={transaction.method}
                    from={transaction.from}
                    to={transaction.to}
                    date={moment(transaction.date).fromNow()}
                    block={transaction.block}
                    amount={transaction.amount}
                    txfee={transaction.txFee}
                    token={`${transaction?.token ? transaction?.token : null}`}
                    symbol={`${
                      transaction?.symbol ? transaction?.symbol : null
                    }`}
                    isTableColumn={isTableColumn}
                  />
                ) : (
                  <AddressBlock
                    isLatest={type === 'ERC-20_Tx' && !filtered}
                    onClick={onClick}
                    key={transaction.txHash}
                    txhash={transaction.txHash}
                    method={transaction.method}
                    from={transaction.from}
                    to={transaction.to}
                    date={moment(transaction.date).fromNow()}
                    block={transaction.block}
                    amount={transaction.amount}
                    txfee={transaction.txFee}
                    token={`${transaction?.token ? transaction?.token : 'AMB'}`}
                    symbol={`${
                      transaction?.symbol ? transaction?.symbol : 'AMB'
                    }`}
                    isTableColumn={isTableColumn}
                  />
                ),
              )
            : null}

          {!loading &&
            //TODO вынести условие в константу
            !renderData?.length &&
            pageNum < addressData?.meta?.totalPages &&
            type !== 'ERC-20_Tx' &&
            pageNum < addressData?.meta?.totalPages && (
              <div style={{ height: 10, width: '100%' }} ref={lastCardRef} />
            )}

          {!loading && !renderData?.length && noDtaFound() && (
            <div className="tabs_not_found" ref={lastCardRef}>
              <NotFoundIcon />
              <span className="tabs_not_found_text">
                No results were found for this query.
              </span>
            </div>
          )}
        </section>
        {loading && (
          <div style={{ top: '-20px', position: 'relative' }}>
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(Tabs);
