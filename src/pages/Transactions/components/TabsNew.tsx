import NotFoundIcon from '../../../assets/icons/Errors/NotFoundIcon';
import Calendar from '../../../components/Calendar';
import Loader from '../../../components/Loader';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import { getContractData } from '../../../services/contract.service';
import AddressBlocksHeader from '../../Addresses/AddressDetails/components/AddressBlocksHeader';
import { ContractDetails } from '../../Addresses/AddressDetails/components/contract';
import AtlasBlocksSort from '../../Atlas/components/AtlasBlocksSort';
import { TabsItemProps, TabsNewProps } from '../transactions.interface';
import API2 from 'API/newApi';
import SideMenu from 'assets/icons/SideMenu';
import ExportCsv from 'components/ExportCsv';
import useDeviceSize from 'hooks/useDeviceSize';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const TabItem: FC<TabsItemProps> = ({ tab, el, handleTab }) => {
  const ref = useRef(null);

  const isOverflown = (el: any) => {
    const curOverflow = el.style.overflow;

    if (!curOverflow || curOverflow === 'visible') el.style.overflow = 'hidden';

    const isOverflowing =
      el.clientWidth < el.scrollWidth || el.clientHeight < el.scrollHeight;

    el.style.overflow = curOverflow;

    return isOverflowing;
  };

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
  );
};

const contractTab = {
  value: 'contract',
  title: 'Contract',
};

const TabsNew: FC<TabsNewProps> = ({
  tabs,
  sortOptions,
  fetchData,
  fetchParams,
  renderKey,
  render,
  withoutCalendar,
  initSortTerm = '',
  initTab = '',
  tableHeader,
  label,
  withoutLoader,
  isContract,
}) => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState(initTab);
  const [isShow, setIsShow] = useState(false);
  const [sortTerm, setSortTerm] = useState(initSortTerm);
  const [contractInfo, setContractInfo] = useState<any>(null);
  const [tabData, setTabData] = useState<any>({
    data: [],
    pagination: {
      hasNext: false,
      next: null,
    },
  });

  const { ref, inView } = useInView();

  const mobileCalendarRef = useRef(null);
  const { FOR_TABLET } = useDeviceSize();

  useOnClickOutside(mobileCalendarRef, () => setIsShow(false));

  const handleShow = () => setIsShow(!isShow);

  useEffect(() => {
    if (tab === 'contract') {
      getContractData(fetchParams.address).then((res) => {
        setContractInfo(res.data);
      });
    }
  }, [tab]);

  useEffect(() => {
    if (tab === 'contract') return;

    if (!withoutLoader) {
      setLoading(true);
    }

    setTabData({
      data: [],
      pagination: {
        hasNext: false,
        next: null,
      },
    });
    console.log(1);
    handleFetchData().then((response: any) => {
      if (!response) return;

      if (!!renderKey) {
        setTabData({
          data: response.data[renderKey],
          pagination: response.pagination,
        });
      } else {
        setTabData(response);
      }
    });
  }, [tab, sortTerm, fetchParams]);

  useEffect(() => {
    if (
      tab !== 'contract' &&
      inView &&
      !loading &&
      tabData.pagination &&
      tabData.pagination.hasNext
    ) {
      handleFetchData(tabData.pagination.next).then((response: any) => {
        setTabData((state: AccountsData) => ({
          data: [
            ...state.data,
            ...(renderKey ? response.data[renderKey] : response.data),
          ],
          pagination: response.pagination,
        }));
      });
    }
  }, [inView]);

  // useEffect(() => {
  //   if (tabs) {
  //     setTab(tabs[0].value);
  //   }
  //   console.log(2);
  // }, [tabs]);

  const handleFetchData = (page?: number) => {
    if (!withoutLoader) {
      setLoading(true);
    }
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

  return (
    <>
      {tabs ? (
        <>
          <div className="tabs">
            <div className="tabs_heading">
              <div className="tabs_heading_filters">
                {(isContract ? [...tabs, contractTab] : tabs).map((el: any) => (
                  <TabItem
                    key={el.value}
                    tab={tab}
                    handleTab={setTab}
                    el={el}
                  />
                ))}
              </div>

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
          {isShow && (
            <div
              ref={mobileCalendarRef}
              className="tabs_heading_export_modal_mobile"
            >
              <Calendar />
            </div>
          )}

          <div
            style={{ overflow: loading ? 'hidden' : 'auto' }}
            className="transactions_wrapper"
          >
            {tab === 'contract' ? (
              contractInfo && (
                <ContractDetails
                  address={fetchParams.address}
                  contractInfo={contractInfo}
                  selectedTab={'verify'}
                />
              )
            ) : !loading && !tabData?.data?.length ? (
              <div className="tabs_not_found">
                <NotFoundIcon />
                <span className="tabs_not_found_text">
                  No results were found for this query.
                </span>
              </div>
            ) : (
              <>
                <AddressBlocksHeader
                  txhash="txHash"
                  method="Method"
                  from="From"
                  to="To"
                  date="Date"
                  block={tab === 'tokens' ? null : 'Block'}
                  amount="Amount"
                  txfee={tab === 'tokens' ? null : 'txFee'}
                  token={tab === 'tokens' ? 'Token' : null}
                  methodFilters={null}
                  isTableColumn={`${
                    tab === 'tokens'
                      ? 'address_blocks_erc20'
                      : 'address_blocks_cells'
                  } no_border`}
                />
                {!!tabData?.data?.length &&
                  render(tabData.data, tab === 'tokens')}
              </>
            )}
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
            {!!tabData?.data?.length && render(tabData.data)}
          </div>
        </>
      )}
      <div ref={ref} />
      {loading && <Loader />}
    </>
  );
};

export default TabsNew;
