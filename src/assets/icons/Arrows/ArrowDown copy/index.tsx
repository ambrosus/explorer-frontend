import * as React from 'react';
import { memo, SVGProps } from 'react';

const ArrowDownSmall = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={8}
    height={6}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m.367 1.64 2.865 3.438a1 1 0 0 0 1.536 0L7.633 1.64A1 1 0 0 0 6.865 0h-5.73a1 1 0 0 0-.768 1.64Z"
      fill="#EFF2F5"
    />
  </svg>
);

const Memo = memo(ArrowDownSmall);
export default Memo;
