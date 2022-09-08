import * as React from 'react';
import { SVGProps, memo } from 'react';

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={14}
    height={14}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.542 1.675 4.791 6.158V12c0 .916.75 1.666 1.667 1.666s1.667-.75 1.667-1.666V7.833l4.791-6.158a.832.832 0 0 0-.666-1.342H1.2a.831.831 0 0 0-.658 1.342Z"
      fill="#808A9D"
    />
  </svg>
);

const Memo = memo(FilterIcon);
export default Memo;
