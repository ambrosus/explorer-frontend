import * as React from 'react';
import { SVGProps, memo } from 'react';

const ArrowUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4 10 4-4 4 4"
      stroke="#808A9D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Memo = memo(ArrowUp);
export default Memo;
