import getMainInfoIcon from '../../../../config';
import { MainInfoProps } from '../../home.interfaces';
import React from 'react';

const MainInfo: React.FC<MainInfoProps> = ({ name, value }) => {
  const numberWithCommas = (number: number) =>
    number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  const currenCurrency = (nameCurrency: string) => {
    switch (nameCurrency) {
      case 'TOTAL SUPPLY':
        return `${value.toFixed()} AMB`;

      case 'MARKET CAP':
        return `${value.toFixed()} USD`;

      default:
        return value;
    }
  };

  const updatedValue = numberWithCommas(currenCurrency(name));

  return (
    <>
      <div className="main_info_td">
        <div className="main_info_icon">{getMainInfoIcon(name)}</div>
        <div className="main_info_text">
          <p className="main_info_span-light">{name}</p>
          <p className="main_info_span-dark">{updatedValue}</p>
        </div>
      </div>
    </>
  );
};

export default MainInfo;
