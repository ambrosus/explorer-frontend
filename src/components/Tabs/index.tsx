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
import AddressBlock from 'pages/Addresses/AddressDetails/components/AddressBlocks';
import AddressBlocksHeader from 'pages/Addresses/AddressDetails/components/AddressBlocksHeader';
import ContractEvents from 'pages/Addresses/AddressDetails/components/ContractEvents';
import { ContractDetails } from 'pages/Addresses/AddressDetails/components/contract';
import React, {
  FC,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { setupStyle, toUniqueValueByBlock } from 'utils/helpers';
import { contractTabs, sidePages } from 'utils/sidePages';

const Tabs: FC<TabsProps> = ({
  data,
  lastCardRef,
  onClick,
  setTransactionType,
  pageNum,
  loading,
  transactionType,
  isContract,
  contractInfo,
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
    if (type === 'contract') return;

    if (pageNum < addressData?.meta?.totalPages && type !== 'ERC-20_Tx')
      return false;

    setTimeout(() => {
      const found = !loading && !renderData?.length;
      setNotFound(found);
    }, 500);
    return notFound;
  };

  useOnClickOutside(mobileCalendarRef, () => setIsShow(false));

  useLayoutEffect(() => {
    if (type === 'contract') return;

    if (
      addressData?.latestTransactions?.length &&
      type === 'ERC-20_Tx' &&
      !filtered
    )
      setRenderData(toUniqueValueByBlock(addressData.latestTransactions));

    if (!addressData || loading) return;

    if (data?.length && type !== 'ERC-20_Tx' && !filtered) {
      if (type === 'transfers') {
        let transfersDataTx: TransactionProps[];
        setRenderData((prev: any) => {
          if (prev === null) prev = [];

          transfersDataTx = [...prev, ...data].filter(
            (item: TransactionProps) => item.method === 'Transfer',
          );

          return transfersDataTx // todo: empty array is truthy value, looks like a bug
            ? toUniqueValueByBlock(transfersDataTx)
            : toUniqueValueByBlock(prev);
        });
      } else {
        setRenderData(toUniqueValueByBlock(data));
      }
    }

    if (data?.length && filtered && type === 'ERC-20_Tx') {
      setRenderData(toUniqueValueByBlock(data));
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

  const handleNavLinkClass = (itemValue: any) => {
    if (type !== 'contract') {
      if (
        itemValue === transactionType ||
        (transactionType === 'ERC-20_Tx' &&
          itemValue === 'Transferss' && // todo is it typo?
          tokenToSorted !== undefined) ||
        (transactionType === 'ERC-20_Tx' &&
          tokenToSorted === undefined &&
          itemValue === 'Alls')
      )
        return `tabs_link tabs_link_active`;

      return `tabs_link `;
    }

    const isContractTab = ['code', 'write', 'read', 'verify'].includes(
      filtered || '',
    );

    if (isContractTab) {
      if (
        itemValue === 'contract' ||
        itemValue === filtered ||
        itemValue === transactionType
      )
        return 'tabs_link tabs_link_active';
      return 'tabs_link';
    }
  };

  const contractUrl = (url: any) => {
    if (url === 'contract' && contractInfo?.status === 200) {
      return '/code';
    } else if (url === 'contract' && contractInfo?.status !== 200) {
      return '/verify';
    } else {
      return '';
    }
  };

  const handleShow = () => setIsShow(!isShow);
  const filteredContractTabs = useMemo(
    () =>
      contractInfo?.status === 200
        ? contractTabs.filter((tab) => tab.value !== 'verify')
        : contractTabs.filter((tab) => tab.value === 'verify'),
    [contractTabs],
  );

  let tabsView;

  if (type === 'contract') {
    tabsView = (
      <div className="contract">
        <div className="tabs_heading" tabIndex={-1}>
          <div className="tabs_heading_filters" tabIndex={-1}>
            {contractTabs?.length &&
              filteredContractTabs.map((tab) => (
                <NavLink
                  key={tab.title}
                  to={`/addresses/${address}/${type}/${
                    tab.value ? tab.value : ''
                  }`}
                  className={() =>
                    `contract-link ${handleNavLinkClass(tab.value)}`
                  }
                  onClick={() => {
                    setTransactionType(tab.value);
                  }}
                >
                  {tab.title}
                </NavLink>
              ))}
          </div>
        </div>
        <div className="contract-details">
          <ContractDetails />
        </div>
      </div>
    );
  } else if (type === 'events') {
    tabsView = (
      <div className="contract">
        <ContractEvents />
      </div>
    );
  } else {
    tabsView = (
      <>
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
            ? renderData
              ?.filter((el: TransactionProps) => el.block !== 0)
              .map((transaction: TransactionProps, index: number) =>
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
                    token={`${
                      transaction?.token ? transaction?.token : null
                    }`}
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
                    token={`${
                      transaction?.token ? transaction?.token : 'AMB'
                    }`}
                    symbol={`${
                      transaction?.symbol ? transaction?.symbol : 'AMB'
                    }`}
                    isTableColumn={isTableColumn}
                    inners={transaction.inners}
                  />
                ),
              )
            : null}
          {loading && (
            <div style={{ top: '-20px', position: 'relative' }}>
              <Loader />
            </div>
          )}
          {!loading &&
            //TODO вынести условие в константу
            !renderData?.length &&
            pageNum < addressData?.meta?.totalPages &&
            type !== 'ERC-20_Tx' &&
            pageNum < addressData?.meta?.totalPages && (
              <div
                style={{ height: 10, width: '100%' }}
                ref={lastCardRef}
              />
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
      </>
    )
  }

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
            {!filtered ||
            filtered === 'code' ||
            filtered === 'write' ||
            filtered === 'read' ||
            filtered === 'verify'
              ? transactionFilters?.length &&
                transactionFilters.map((filter) => (
                  <>
                    {isContract ? (
                      <NavLink
                        key={filter.title}
                        to={`/addresses/${address}/${
                          filter.value ? filter.value : ''
                        }${contractUrl(filter.value)} `}
                        className={() => handleNavLinkClass(filter.value)}
                        onClick={() => {
                          setTransactionType(filter.value);
                        }}
                      >
                        {filter.title}
                      </NavLink>
                    ) : (
                      filter.value !== 'contract' &&
                      filter.value !== 'events' && (
                        <NavLink
                          key={filter.title}
                          to={`/addresses/${address}/${
                            filter.value ? filter.value : ''
                          }${filter.value === 'contract' ? '/code' : '/'} `}
                          className={() => handleNavLinkClass(filter.value)}
                          onClick={() => {
                            setTransactionType(filter.value);
                          }}
                        >
                          {filter.title}
                        </NavLink>
                      )
                    )}
                  </>
                ))
              : ERC20Filters?.length &&
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
        {tabsView}
      </div>
    </>
  );
};

export default React.memo(Tabs);
