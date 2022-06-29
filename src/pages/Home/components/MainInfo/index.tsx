import { MainInfoProps } from '../../home.interfaces';
import getMainInfoIcon from 'config';
import React from 'react';
import { currenCurrency, nameCurrency, numberWithCommas } from 'utils/helpers';

const MainInfo: React.FC<MainInfoProps> = ({ name, value }) => {
  const updatedValue = numberWithCommas(currenCurrency(value, name));
  const updatedName = nameCurrency(name);

  return (
    <>
      <div className="main_info_td" role="home__main-info">
        <div className="main_info_icon">{getMainInfoIcon(name)}</div>
        <div className="main_info_text">
          <p className="main_info_span-light" role="main-info__name">
            {name}
          </p>
          <p className="main_info_span-dark" role="main-info__value">
            {`${updatedValue}${updatedName}`}
          </p>
        </div>
      </div>
    </>
  );
};

export default MainInfo;
