import getMainInfoIcon from '../../../../config';
import { currenCurrency, numberWithCommas } from '../../../../utils/helpers';
import { MainInfoProps } from '../../home.interfaces';
import React from 'react';

const MainInfo: React.FC<MainInfoProps> = ({ name, value }) => {
  const updatedValue = currenCurrency(value, name);

  return (
    <>
      <div className="main_info_td" role="home__main-info">
        <div className="main_info_icon">{getMainInfoIcon(name)}</div>
        <div className="main_info_text">
          <p className="main_info_span-light" role="main-info__name">
            {name}
          </p>
          <p className="main_info_span-dark" role="main-info__value">
            {updatedValue}
          </p>
        </div>
      </div>
    </>
  );
};

export default MainInfo;
