import Loader from '../../../components/Loader';
import AddressBlocksHeader from '../../Addresses/AddressDetails/components/AddressBlocksHeader';
import { TabsNewProps } from '../transactions.interface';
import SideMenu from 'assets/icons/SideMenu';
import ExportCsv from 'components/ExportCsv';
import useDeviceSize from 'hooks/useDeviceSize';
import { AccountsData } from 'pages/Addresses/addresses.interface';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Calendar from "../../../components/Calendar";
import {useOnClickOutside} from "../../../hooks/useOnClickOutside";

const TabsNew: FC<TabsNewProps> = ({
  tabs,
  fetchData,
  fetchParams,
  render,
  withoutCalendar,
}) => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('');
  const [isShow, setIsShow] = useState(false);

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
    setTabData({
      data: [],
      pagination: {
        hasNext: false,
        next: null,
      },
    });

    handleFetchData().then((response: any) => setTabData(response));
  }, [tab]);

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
    const params: any = { ...fetchParams, page };

    if (fetchParams.hasOwnProperty('type')) {
      params.type = tab;
    }
    return fetchData({ ...params, limit: 50 }).finally(() => {
      setLoading(false);
    });
  };

  const handleTab = (type: string) => {
    setTab(type);
  };

  return tabData.data.length ? (
    <>
      <div className="tabs">
        <div className="tabs_heading" tabIndex={-1}>
          <div className="tabs_heading_filters" tabIndex={-1}>
            {tabs.map((el: any) => (
              <span
                className={`tabs_link ${
                  tab === el.value ? 'tabs_link_active' : ''
                }`}
                key={el.title}
                onClick={() => handleTab(el.value)}
              >
                {el.title}
              </span>
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
          )}
        </div>
      </div>
      <div style={{ overflow: 'auto', transform: 'translateX(-12px)'}}>
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
      <div ref={ref} />
      {loading && <Loader />}
    </>
  ) : null;
};

export default TabsNew;
