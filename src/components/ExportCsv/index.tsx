import Calendar from '../Calendar';
import CalendarIcon from 'assets/icons/CalendarIcon';
import {useOnClickOutside} from 'hooks/useOnClickOutside';
import React, {useRef, useState} from 'react';

const ExportCsv = ({showText = true}: any) => {
  const [isShow, setIsShow] = useState(false);
  const style: any = isShow ? {borderColor: '#05060f'} : !showText ? {
    justifyContent: 'center',
    minWidth: 40
  } : {width: 139};
  const calendarRef = useRef(null);
  useOnClickOutside(calendarRef, () => setIsShow(false));
  const paddingTopBtn = isShow ? 8 : 0;
  return (
    <>
      <div
        ref={calendarRef}
        className="export_csv"
        style={{paddingTop: paddingTopBtn}}
      >
        <button
          className="export_csv_btn"
          style={style}
          //TODO вынести с ретурна
          onClick={() => setIsShow(!isShow)}
        >

          <CalendarIcon/>
          {
            showText ?
              <span className="export_csv_text">ExportCsv</span>
              : null
          }
        </button>
        {isShow && <Calendar/>}
      </div>
    </>
  );
};

export default ExportCsv;
