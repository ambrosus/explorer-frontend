import * as React from 'react';
import { memo, SVGProps } from 'react';

const BurgerMenuClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width={16}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      width={20.395}
      height={2.039}
      rx={1.02}
      transform="scale(1.00862 -.9913) rotate(45 20.204 -6.33)"
      fill="#fff"
    />
    <rect
      width={20.395}
      height={2.039}
      rx={1.02}
      transform="scale(1.00862 .9913) rotate(45 .721 1.74)"
      fill="#fff"
    />
  </svg>
);

const Memo = memo(BurgerMenuClose);
export default Memo;
