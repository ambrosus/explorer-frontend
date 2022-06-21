import React, {FC} from 'react';
import {TabsNewProps} from "../transactions.interface";

const TabsNew:FC<TabsNewProps> = ({ tabs, onChange, selectedItem }) => {
  return (
    <div className="tabs">
      <div className="tabs_heading" tabIndex={-1}>
        <div className="tabs_heading_filters" tabIndex={-1}>
          {tabs.map((el: any) => (
            <span
              className={`tabs_link ${selectedItem === el.value ? 'tabs_link_active' : ''}`}
              key={el.title}
              onClick={() => onChange(el.value)}
            >
              {el.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TabsNew;
