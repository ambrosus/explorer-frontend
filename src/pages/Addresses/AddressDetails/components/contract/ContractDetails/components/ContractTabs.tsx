import { contractTabs } from '../../../../../../../utils/sidePages';
import React, { memo, useMemo } from 'react';
import { NavLink } from 'react-router-dom';

const ContractTabs = (props: any) => {
  const { contractInfo, address, selectedTab } = props;

  const filteredContractTabs = useMemo(
    () =>
      contractInfo?.status === 200
        ? contractTabs.filter((tab) => tab.value !== 'verify')
        : contractTabs.filter((tab) => tab.value === 'verify'),
    [contractTabs],
  );

  const activeClass = (itemValue: any) => {
    return itemValue === selectedTab ? 'tabs_link_active' : '';
  };

  return (
    <div className="tabs_heading" tabIndex={-1}>
      <div className="tabs_heading_filters" tabIndex={-1}>
        {contractTabs?.length &&
          filteredContractTabs.map((tab) => (
            <NavLink
              key={tab.title}
              to={`/addresses/${address}/contract/${tab.value || ''}`}
              className={() =>
                `contract-link tabs_link ${activeClass(tab.value)}`
              }
            >
              {tab.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default memo(ContractTabs);
