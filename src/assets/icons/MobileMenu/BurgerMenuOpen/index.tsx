import * as React from 'react';
import { SVGProps, memo } from 'react';

const BurgerMenu = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect y={14} width={16} height={2} rx={1} fill="#fff" />
    <rect width={16} height={2} rx={1} fill="#fff" />
    <rect y={7} width={16} height={2} rx={1} fill="#fff" />
  </svg>
);

const Memo = memo(BurgerMenu);
export default Memo;
