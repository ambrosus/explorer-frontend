import * as React from 'react';
import { SVGProps, memo } from 'react';

const CheckCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2ZM9.29 16.29 5.7 12.7a.996.996 0 1 1 1.41-1.41L10 14.17l6.88-6.88a.996.996 0 1 1 1.41 1.41l-7.59 7.59a.996.996 0 0 1-1.41 0Z"
      fill="#16C784"
    />
  </svg>
);

const Memo = memo(CheckCircle);
export default Memo;
