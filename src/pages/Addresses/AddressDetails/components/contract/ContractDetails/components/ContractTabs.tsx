import { contractTabs } from '../../../../../../../utils/sidePages';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

const ContractTabs = (props: any) => {
  const { address, allowedTabs, selectedTab, selectTab } = props;

  const filteredContractTabs = contractTabs.filter((tab) =>
    allowedTabs.includes(tab.value),
  );

  return (
    <div className="tabs_heading" tabIndex={-1}>
      <div className="tabs_heading_filters" tabIndex={-1}>
        {contractTabs?.length &&
          filteredContractTabs.map((tab) => (
            <button
              key={tab.title}
              onClick={() => selectTab(tab.value)}
              className={`contract-link tabs_link ${
                tab.value === selectedTab ? 'tabs_link_active' : ''
              }`}
            >
              {tab.title}
            </button>
          ))}
      </div>
    </div>
  );
};

export default memo(ContractTabs);
