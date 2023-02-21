import API from 'API/api';
import { addDays } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useParams } from 'react-router-dom';
import { TParams } from 'types';

const date = new Date();
const today = date.setHours(0, 0, 0, 0);
const Calendar = ({ handleClose, miningStats, initRange }: any) => {
  const { address }: TParams = useParams();

  const [dataRange, setDataRange] = useState(
    initRange || [
      {
        startDate: new Date(today),
        endDate: addDays(new Date(today), 0),
        color: '#05060F',
        key: 'selection',
      },
    ],
  );

  const changeData = (item: any) => {
    setDataRange([item.selection]);
  };

  function padTo2Digits(num: any) {
    return num.toString().padStart(2, '0');
  }

  function formatDate(date: any) {
    return [
      padTo2Digits(date.getDate()),
      padTo2Digits(date.getMonth() + 1),
      date.getFullYear(),
    ].join('/');
  }

  const exportCallback = async () => {
    if (dataRange) {
      return await API.followTheLinkRange(
        dataRange[0].startDate,
        dataRange[0].endDate,
        address,
      );
    } else {
      return await API.followTheLinkRange(0, 0, address);
    }
  };
  const exportData = async () => {
    if (miningStats) {
      const str = `${formatDate(dataRange[0].startDate)}-${formatDate(
        dataRange[0].endDate,
      )}`;

      miningStats(str, dataRange);
    } else {
      setTimeout(() => {
        exportCallback();
      }, 0);
    }
    handleClose();
  };

  return (
    <>
      <DateRange
        editableDateInputs={true}
        onChange={changeData}
        moveRangeOnFirstSelection={false}
        ranges={dataRange}
      />
      <button className="calendar_export_csv" onClick={exportData}>
        {miningStats ? 'Select' : ' Export CSV'}
      </button>
    </>
  );
};

export default Calendar;
