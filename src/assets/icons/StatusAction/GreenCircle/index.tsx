import * as React from 'react';
import { memo, SVGProps } from 'react';

const GreenCircle = (props: any) => (
  <svg
    {...props}
    width="8"
    height="8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width={8}
      height={8}
      rx={4}
      fill={props.isYellow ? '#ffd400' : '#1ACD8C'}
    />
  </svg>
);

const Memo = memo(GreenCircle);
export default Memo;
