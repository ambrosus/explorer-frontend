import AddressBlock from '../../pages/Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import ExportCsv from '../ExportCsv';
import Loader from '../Loader';
import NotFoundIcon from 'assets/icons/Errors/NotFoundIcon';
import SideMenu from 'assets/icons/SideMenu';
import Calendar from 'components/Calendar';
import useDeviceSize from 'hooks/useDeviceSize';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useTypedSelector } from 'hooks/useTypedSelector';
import _ from 'lodash';
import moment from 'moment';
import {
  TabsProps,
  TransactionProps,
} from 'pages/Addresses/AddressDetails/address-details.interface';
import AddressBlocksHeader from 'pages/Addresses/AddressDetails/components/AddressBlocksHeader';
import { FC, useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { setupStyle, toUniqueValueByBlock } from 'utils/helpers';
import { sidePages } from 'utils/sidePages';

const Tabs: FC<TabsProps> = ({
  data,
  lastCardRef,
  onClick,
  setTransactionType,
  pageNum,
}) => {
  const [isShow, setIsShow] = useState(false);
  const { address, type, filtered, tokenToSorted } = useParams();
  const [prevType, setPrevType] = useState<any>(type);
  const [renderData, setRenderData] = useState<any>(null);
  const [notFound, setNotFound] = useState<any>(false);
  const { loading, data: addressData } = useTypedSelector(
    (state: any) => state.position,
  );
  const mobileCalendarRef = useRef(null);

  const { transactionFilters, ERC20Filters, methodFilters } = sidePages;
  const headerBlock: any = type === 'ERC-20_Tx' ? null : 'Block';
  const headerTxfee: any = type === 'ERC-20_Tx' ? null : 'txFee';
  const headerToken: any = type === 'ERC-20_Tx' ? 'token' : null;

  const setActiveLink = ({ isActive }: any) =>
    isActive ? 'tabs_link tabs_link_active' : 'tabs_link';

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

  useEffect(() => {
    if (type) {
      setPrevType(type);
    }
    if (prevType !== type) {
      setRenderData(null);
    }
    if (addressData && !loading) {
      if (data?.length && type !== 'ERC-20_Tx' && !filtered) {
        if (type === 'transfers') {
          setRenderData(() => {
            const transfersDataTx: TransactionProps[] = data.filter(
              (item: TransactionProps) => item.method === 'Transfer',
            );
            return transfersDataTx || [];
          });
        } else {
          setRenderData(toUniqueValueByBlock(data));
        }
      }
      if (data?.length && filtered && type === 'ERC-20_Tx') {
        setRenderData(toUniqueValueByBlock(data));
      }

      if (
        addressData &&
        addressData?.latestTransactions?.length &&
        type === 'ERC-20_Tx' &&
        !filtered
      ) {
        setRenderData(toUniqueValueByBlock(addressData.latestTransactions));
      }
    }
  }, [addressData, data, filtered, type, loading, pageNum]);

  useEffect(() => {
    if (address || type || filtered || tokenToSorted) {
      setRenderData(null);
    }
  }, [address, type, filtered, tokenToSorted]);
  const { FOR_TABLET } = useDeviceSize();

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
                _.map(transactionFilters, (filter) => (
                  <NavLink
                    key={filter.title}
                    to={`/addresses/${address}/${
                      filter.value ? filter.value : ''
                    }`}
                    className={setActiveLink}
                    onClick={(e) => {
                      setTransactionType(filter.value);
                    }}
                  >
                    {filter.title}
                  </NavLink>
                ))
              : ERC20Filters &&
                ERC20Filters.length &&
                _.map(ERC20Filters, (filter) => (
                  <NavLink
                    key={filter.title}
                    to={`/addresses/${address}/ERC-20_Tx/${filtered}/${filter.value}`}
                    className={setActiveLink}
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
                  <button
                    className="tabs_side_menu_icon"
                    onClick={() => setIsShow(!isShow)}
                  >
                    <SideMenu />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <section
          className="tabs_table"
          style={
            renderData && renderData?.length
              ? setupStyle(type)
              : { display: 'flex', justifyContent: 'center', paddingTop: 100 }
          }
        >
          {loading && !renderData?.length && (
            <div
              style={{
                width: '100%',
                paddingTop: 20,
                height: 200,
                position: 'absolute',
              }}
            >
              <Loader />
            </div>
          )}

          {renderData && renderData?.length !== 0 && (
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
            />
          )}

          {renderData && renderData?.length !== 0
            ? _.map(
                renderData,
                (transaction: TransactionProps, index: number) => (
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
                  />
                ),
              )
            : null}

          {!loading && pageNum < addressData?.meta?.totalPages && (
            <div ref={lastCardRef} />
          )}
          {!loading && !renderData?.length && noDtaFound() && (
            <div className="tabs_not_found">
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

export default Tabs;
