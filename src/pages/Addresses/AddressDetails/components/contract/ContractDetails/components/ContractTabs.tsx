import { contractTabs } from '../../../../../../../utils/sidePages';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const ContractTabs = (props: any) => {
  const { address, allowedTabs, selectedTab } = props;

  const filteredContractTabs = contractTabs.filter((tab) =>
    allowedTabs.includes(tab.value),
  );

  return (
    <div className="tabs_heading" tabIndex={-1}>
      <div className="tabs_heading_filters" tabIndex={-1}>
        {contractTabs?.length &&
          filteredContractTabs.map((tab) => (
            <NavLink
              key={tab.title}
              to={`/addresses/${address}/contract/${tab.value || ''}`}
              className={`contract-link tabs_link ${
                tab.value === selectedTab ? 'tabs_link_active' : ''
              }`}
            >
              {tab.title}
            </NavLink>
          ))}
      </div>
    </div>
  );
};

export default memo(ContractTabs);
