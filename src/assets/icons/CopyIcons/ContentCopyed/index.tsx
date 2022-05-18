import * as React from 'react';
import { SVGProps, memo } from 'react';

const ContentCopyed = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9 16.17 5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17Z"
      fill="#1ACD8C"
    />
  </svg>
);

const Memo = memo(ContentCopyed);
export default Memo;
