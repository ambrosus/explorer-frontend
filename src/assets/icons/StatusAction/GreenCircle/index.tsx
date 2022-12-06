import * as React from 'react';
import { memo, SVGProps } from 'react';

const GreenCircle = (props: any) => {
  let fill = '#16C784';

  if (props.status === 'FAIL') {
    fill = '#ff7474';
  } else if (props.status === 'PENDING') {
    fill = '#ffd400';
  }

  return (
    <svg
      {...props}
      width="8"
      height="8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={8} height={8} rx={4} fill={fill} />
    </svg>
  );
};

const Memo = memo(GreenCircle);
export default Memo;
