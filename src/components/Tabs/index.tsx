import AddressBlock from '../../pages/Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import ExportCsv from '../ExportCsv';
import Loader from '../Loader';
import useTabs from './useTabs';
import NotFoundIcon from 'assets/icons/Errors/NotFoundIcon';
import SideMenu from 'assets/icons/SideMenu';
import Calendar from 'components/Calendar';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useTypedSelector } from 'hooks/useTypedSelector';
import useWindowSize from 'hooks/useWindowSize';
import moment from 'moment';
import {
  TabsProps,
  TransactionProps,
} from 'pages/Addresses/AddressDetails/address-details.interface';
import AddressBlocksHeader from 'pages/Addresses/AddressDetails/components/AddressBlocksHeader';
import { FC, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { setupStyle } from 'utils/helpers';
import { sidePages } from 'utils/sidePages';

const Tabs: FC<TabsProps> = ({
  data,
  lastCardRef,
  onClick,
  setTransactionType,
}) => {
  const [isShow, setIsShow] = useState(false);
  const { address, type, filtered } = useParams();
  const { loading } = useTypedSelector((state: any) => state.position);
  const mobileCalendarRef = useRef(null);
  const { width } = useWindowSize();
  const { transactionFilters, ERC20Filters, methodFilters } = sidePages;
  const headerBlock: string | null = type === 'ERC-20_Tx' ? null : 'Block';
  const headerTxfee: string | null = type === 'ERC-20_Tx' ? null : 'txFee';
  const headerToken: string | null = type === 'ERC-20_Tx' ? 'token' : null;

  const setActiveLink = (props: { isActive: boolean }): string =>
    props.isActive ? 'tabs_link tabs_link_active' : 'tabs_link';

  useOnClickOutside(mobileCalendarRef, () => setIsShow(false));

  const { renderData } = useTabs(data);

  const isRender = renderData && renderData?.length;

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
                ERC20Filters.map((filter) => (
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
            {width > 760 ? (
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
            isRender
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
          {isRender
            ? renderData.map((transaction: TransactionProps, index: number) =>
                renderData.length - 1 === index ? (
                  <AddressBlock
                    isLatest={type === 'ERC-20_Tx' && !filtered}
                    lastCardRef={lastCardRef}
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
                  />
                ),
              )
            : !loading && (
                <div className="tabs_not_found">
                  <NotFoundIcon />
                  <span className="tabs_not_found_text">
                    No results were found for this query.
                  </span>
                </div>
              )}
        </section>
        {loading && <Loader />}
      </div>
    </>
  );
};

export default Tabs;
