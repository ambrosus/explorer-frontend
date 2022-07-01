import { TabsNewProps } from '../transactions.interface';
import React, {FC, useEffect, useState} from 'react';
import {useInView} from "react-intersection-observer";
import Loader from "../../../components/Loader";
import { AccountsData } from 'pages/Addresses/addresses.interface';
import AddressBlocksHeader from "../../Addresses/AddressDetails/components/AddressBlocksHeader";

const TabsNew: FC<TabsNewProps> = ({ tabs, fetchData, fetchParams, render }) => {
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('');
  const { ref, inView } = useInView();
  const [tabData, setTabData] = useState<AccountsData>({
    data: [],
    pagination: {
      hasNext: false,
      next: null,
    },
  });

  useEffect(() => {
    handleFetchData().then((response: any) => setTabData(response));
  }, []);

  useEffect(() => {
    if (
      inView &&
      !loading &&
      tabData.pagination &&
      tabData.pagination.hasNext
    ) {
      handleFetchData().then(
        (response: any) => {
          setTabData((state: AccountsData) => ({
            data: [...state.data, ...response.data],
            pagination: response.pagination,
          }));
        },
      );
    }
  }, [inView]);

  const handleFetchData = () => {
    setLoading(true);
    const params: any = { ...fetchParams, page: tabData.pagination.next };

    if (fetchParams.hasOwnProperty('type')) {
      params.type = tab;
    }
    return fetchData({ ...params, limit: 50 }).finally(() =>
      setLoading(false),
    );
  };

  const handleTab = (type: string) => {
    setTabData({
      data: [],
      pagination: {
        hasNext: false,
        next: null,
      },
    });

    handleFetchData().then((response: any) => setTabData(response));

    setTab(type);
  };

  return (
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
            {loading && <Loader />}
          </div>
        </div>
      </div>
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
        isTableColumn={'address_blocks_cells'}
      />
      {!!tabData.data.length && render(tabData.data)}
      <div ref={ref} />
    </>
  );
};

export default TabsNew;
