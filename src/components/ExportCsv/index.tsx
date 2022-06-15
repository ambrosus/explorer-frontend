import Calendar from '../Calendar';
import MoonLoader from '../Loader/MoonLoader';
import CalendarIcon from 'assets/icons/CalendarIcon';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useEffect, useRef, useState } from 'react';

const ExportCsv = ({ miningStats, showText = true }: any) => {
  const [isShow, setIsShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleClose = () => {
    setIsShow((prevState) => !prevState);
  };

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
  const paddingTopBtn = isShow ? 8 : 0;

  function toggleShow() {
    setIsShow(!isShow);
  }
  const widthStyle = showText ? undefined : { width: 40 };

  return (
    <>
      <div
        ref={calendarRef}
        className="export_csv"
        style={{ paddingTop: paddingTopBtn }}
      >
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
          <Calendar
            setIsLoading={setIsLoading}
            handleClose={handleClose}
            miningStats={miningStats}
          />
        )}
      </div>
    </>
  );
};

export default ExportCsv;
