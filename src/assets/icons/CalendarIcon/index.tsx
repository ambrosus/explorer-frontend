import * as React from 'react';
import { memo, SVGProps } from 'react';

const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Z"
      stroke="#05060F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 16h.002v.002H16V16ZM12 16h.002v.002H12V16ZM8 16h.002v.002H8V16ZM16 12h.002v.002H16V12ZM12 12h.002v.002H12V12ZM8 12h.002v.002H8V12ZM4 8h16M16 2v2M8 2v2"
      stroke="#05060F"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Memo = memo(CalendarIcon);
export default Memo;
