import Calendar from '../Calendar';
import MoonLoader from '../Loader/MoonLoader';
import CalendarIcon from 'assets/icons/CalendarIcon';
import useDeviceSize from 'hooks/useDeviceSize';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';

const ExportCsv = ({ miningStats, showText = true }: any) => {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setIsShow((prevState) => !prevState);
  };
  const { FOR_BIG_TABLET } = useDeviceSize();
  const style: any = isShow
    ? { borderColor: '#05060f' }
    : !showText
    ? {
        justifyContent: 'center',
        minWidth: 40,
      }
    : { width: 139 };
  const calendarRef = useRef(null);
  useOnClickOutside(calendarRef, () => setIsShow(false));

  function toggleShow() {
    setIsShow(!isShow);
  }
  const widthStyle = showText ? undefined : { width: 40 };

  const calendarPosition = showText
    ? {
        top: 47,
        right: 0,
      }
    : {
        top: FOR_BIG_TABLET ? 70 : 50,
        left: 0,
      };

  return (
    <>
      <div ref={calendarRef} className="export_csv">
        <button
          className="export_csv_btn"
          onClick={toggleShow}
          style={widthStyle}
        >
          {!isLoading ? <CalendarIcon /> : <MoonLoader />}
          {!isLoading ? (
            <span>
              {showText ? (
                <span className="export_csv_text">ExportCsv</span>
              ) : null}
            </span>
          ) : (
            <span className="export_csv_text">Loading...</span>
          )}
        </button>
        {isShow && (
          <div className="calendar" style={calendarPosition}>
            <Calendar
              setIsLoading={setIsLoading}
              handleClose={handleClose}
              miningStats={miningStats}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default ExportCsv;
