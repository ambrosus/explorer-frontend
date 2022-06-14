import AddressBlock from '../../pages/Addresses/AddressDetails/components/AddressBlocks/AddressBlock';
import ExportCsv from '../ExportCsv';
import Loader from '../Loader';
import NotFoundIcon from 'assets/icons/Errors/NotFoundIcon';
import SideMenu from 'assets/icons/SideMenu';
import Calendar from 'components/Calendar';
import useDeviceSize from 'hooks/useDeviceSize';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import _ from 'lodash';
import moment from 'moment';
import AddressBlocksHeader from 'pages/Addresses/AddressDetails/components/AddressBlocksHeader';
import React, { FC, useEffect, useRef, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import removeArrayDuplicates, { setupStyle } from 'utils/helpers';
import { sidePages } from 'utils/sidePages';

const Tabs2: FC<any> = ({
  data,
  lastCardRef,
  onClick,
  setTransactionType,
  transactionType,
  isIcon,
  loading,
  pageType,
  sortOptions,
}: any) => {
  const [isShow, setIsShow] = useState(false);
  const { address, type } = useParams();
  const [renderData, setRenderData] = useState<any>(null);
  const [notFound, setNotFound] = useState<any>(false);
  const mobileCalendarRef = useRef(null);
  const { methodFilters } = sidePages;
  const headerBlock: any = 'Block';
  const headerTxfee: any = 'txFee';
  const headerToken: any = null;

  const noDtaFound = () => {
    setTimeout(() => {
      if (!loading && !renderData?.length) {
        setNotFound(true);
      } else {
        setNotFound(false);
      }
    }, 500);
    return notFound;
  };

  //TODO убрать
  useOnClickOutside(mobileCalendarRef, () => setIsShow(false));

  useEffect(() => {
    if (type) {
      setRenderData([]);
    }
    setRenderData((prev: any) => {
      if (prev === null) {
        return removeArrayDuplicates(data);
      } else {
        return removeArrayDuplicates([...prev, ...data]);
      }
    });
  }, [data, transactionType]);

  useEffect(() => {
    if (address || type) {
      setRenderData(null);
    }
  }, [address, type]);
  //TODO delete
  const { FOR_TABLET } = useDeviceSize();

  const isTableColumn =
    renderData && renderData?.length
      ? setupStyle(type)
      : 'addresses_body_no_data';

  const handleNavLinkClass = (itemValue: any) => {
    return `tabs_link ${
      itemValue === transactionType ? 'tabs_link_active' : ''
    }`;
  };

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
            {sortOptions &&
              sortOptions.length &&
              _.map(sortOptions, (filter) => (
                <NavLink
                  key={filter.title}
                  to={`/${pageType}/${address}/${
                    filter.value ? filter.value : ''
                  }`}
                  className={() => handleNavLinkClass(filter.value)}
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

        <section className="tabs_table">
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
              isTableColumn={isTableColumn}
              isIcon={isIcon}
            />
          )}

          {renderData && renderData?.length !== 0
            ? _.map(renderData, (transaction: any, index: number) => {
                return (
                  <AddressBlock
                    lastCardRef={
                      renderData.length - 1 === index ? lastCardRef : null
                    }
                    isLatest={true}
                    onClick={onClick}
                    key={index}
                    txhash={transaction.hash}
                    method={transaction.type}
                    from={transaction.from}
                    to={transaction.to}
                    date={moment(transaction.timestamp * 1000).fromNow()}
                    block={transaction.blockNumber}
                    amount={transaction.value.ether}
                    txfee={transaction.gasCost.ether}
                    token={`${transaction?.token ? transaction?.token : 'AMB'}`}
                    symbol={`${
                      transaction?.symbol ? transaction?.symbol : 'AMB'
                    }`}
                    isTableColumn={isTableColumn}
                    isIcon={isIcon}
                  />
                );
              })
            : null}

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

export default React.memo(Tabs2);