import * as React from 'react';
import { memo, SVGProps } from 'react';

const OrangeCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={8}
    height={8}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width={8} height={8} rx={4} fill="#F2C037" />
  </svg>
);

const Memo = memo(OrangeCircle);
export default Memo;
