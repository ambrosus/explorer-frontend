import { memo, SVGProps } from 'react';

/**
 * @param props - SVG props.
 */

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="16"
    height="16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m4 6 4 4 4-4"
      stroke="#808A9D"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Memo = memo(ArrowDown);
export default Memo;
