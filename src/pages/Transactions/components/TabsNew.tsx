import Calendar from '../../../components/Calendar';
import Loader from '../../../components/Loader';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import AddressBlocksHeader from '../../Addresses/AddressDetails/components/AddressBlocksHeader';
import AtlasBlocksSort from '../../Atlas/components/AtlasBlocksSort';
import {TabsItemProps, TabsNewProps} from '../transactions.interface';
import SideMenu from 'assets/icons/SideMenu';
import ExportCsv from 'components/ExportCsv';
import useDeviceSize from 'hooks/useDeviceSize';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const TabItem: FC<TabsItemProps> = ({tab, el, handleTab}) => {
  const ref = useRef(null);

  const isOverflown = (el: any) => {
    const curOverflow = el.style.overflow;

    if ( !curOverflow || curOverflow === "visible" )
      el.style.overflow = "hidden";

    const isOverflowing = el.clientWidth < el.scrollWidth
      || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  };

  useEffect(() => {
    console.log(isOverflown(ref.current));
  }, []);

  return (
    <span
      ref={ref}
      className={`tabs_link tabs_link_new ${
        tab === el.value ? 'tabs_link_active' : ''
      }`}
      key={el.title}
      onClick={() => handleTab(el.value)}
    >
      {el.title}
    </span>
  )
};
const TabsNew: FC<TabsNewProps> = ({
  tabs,
  sortOptions,
  fetchData,
  fetchParams,
  render,
  withoutCalendar,
  initSortTerm = '',
  tableHeader,
  label,
}) => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('');
  const [isShow, setIsShow] = useState(false);
  const [sortTerm, setSortTerm] = useState(initSortTerm);

  const { ref, inView } = useInView();
  const [tabData, setTabData] = useState<AccountsData>({
    data: [],
    pagination: {
      hasNext: false,
      next: null,
    },
  });

  const mobileCalendarRef = useRef(null);
  const { FOR_TABLET } = useDeviceSize();

  useOnClickOutside(mobileCalendarRef, () => setIsShow(false));

  const handleShow = () => setIsShow(!isShow);

  useEffect(() => {
    setLoading(true);
    setTabData({
      data: [],
      pagination: {
        hasNext: false,
        next: null,
      },
    });
    handleFetchData().then((response: any) => setTabData(response));
  }, [tab, sortTerm]);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      tabData.pagination &&
      tabData.pagination.hasNext
    ) {
      handleFetchData(tabData.pagination.next).then((response: any) => {
        setTabData((state: AccountsData) => ({
          data: [...state.data, ...response.data],
          pagination: response.pagination,
        }));
      });
    }
  }, [inView]);

  const handleFetchData = (page?: number) => {
    setLoading(true);
    const params: any = { ...fetchParams };

    if (fetchParams.hasOwnProperty('page')) {
      params.page = page;
    }
    if (fetchParams.hasOwnProperty('next')) {
      params.next = page;
    }
    if (fetchParams.hasOwnProperty('type')) {
      params.type = tab;
    }
    if (fetchParams.hasOwnProperty('sort')) {
      params.sort = sortTerm;
    }
    return fetchData({ ...params, limit: 50 }).finally(() => {
      setLoading(false);
    });
  };

  const handleTab = (type: string) => {
    setTab(type);
  };

  return (
    <>
      {tabs ? (
        <>
          <div className="tabs">
            <div className="tabs_heading">
              <div className="tabs_heading_filters">
                {tabs.map((el: any) => (
                  <TabItem
                    key={el.value}
                    tab={tab}
                    handleTab={handleTab}
                    el={el}
                  />
                ))}
              </div>
              {isShow && (
                <div
                  ref={mobileCalendarRef}
                  className="tabs_heading_export_modal_mobile"
                >
                  <Calendar />
                </div>
              )}
              {!withoutCalendar && (
                <div
                  ref={mobileCalendarRef}
                  className="tabs_heading_export_modal"
                >
                  {FOR_TABLET ? (
                    <ExportCsv />
                  ) : (
                    <>
                      <div className="tabs_side_menu">
                        <button
                          className="tabs_side_menu_icon"
                          onClick={handleShow}
                        >
                          <SideMenu />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
          <div
            style={{ overflow: loading ? 'hidden' : 'auto' }}
            className="transactions_wrapper"
          >
            <AddressBlocksHeader
              txhash="txHash"
              method="Method"
              from="From"
              to="To"
              date="Date"
              block="Block"
              amount="Amount"
              txfee="txFee"
              token={null}
              methodFilters={null}
              isTableColumn={'address_blocks_cells no_border'}
            />
            {!!tabData.data.length && render(tabData.data)}
          </div>
        </>
      ) : (
        <>
          <AtlasBlocksSort
            sortOptions={sortOptions}
            sortTerm={sortTerm}
            setSortTerm={setSortTerm}
            label={label}
          />
          <div
            style={{ overflow: loading ? 'hidden' : 'auto' }}
            className="tabs_list"
          >
            {tableHeader()}
            {!!tabData.data.length && render(tabData.data)}
          </div>
        </>
      )}
      <div ref={ref} />
      {loading && <Loader />}
    </>
  );
};

export default TabsNew;
