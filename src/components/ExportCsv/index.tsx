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
  const { FOR_BIG_TABLET, FOR_TABLET } = useDeviceSize();
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

  const topPosition = () => {
    if (FOR_BIG_TABLET) {
      return 70;
    } else if (FOR_TABLET) {
      return 50;
    } else {
      return 42;
    }
  };

  const calendarPosition = showText
    ? {
        top: 47,
        right: 0,
      }
    : {
        top: topPosition(),
        left: '-137px',
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
