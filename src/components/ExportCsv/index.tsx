import Calendar from '../Calendar';
import CalendarIcon from 'assets/icons/CalendarIcon';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';

const ExportCsv = () => {
  const [isShow, setIsShow] = useState(false);
  const style: any = isShow ? { borderColor: '#05060f' } : null;
  const calendarRef = useRef(null);
  useOnClickOutside(calendarRef, () => setIsShow(false));

  return (
    <>
      <div ref={calendarRef} style={{ zIndex: 1 }}>
        <div className="export_csv">
          <button
            className="export_csv_btn"
            style={style}
            onClick={() => {
              setIsShow(!isShow);
            }}
          >
            <CalendarIcon />
            <span className="export_csv_text">ExportCsv</span>
          </button>
        </div>
        {isShow && <Calendar />}
      </div>
    </>
  );
};

export default ExportCsv;
