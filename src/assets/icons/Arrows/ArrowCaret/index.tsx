import { memo, SVGProps } from 'react';

/**
 * @param props - SVG props.
 */

const ArrowCaret = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M4.95693 5C4.14924 5 3.67479 5.90803 4.13603 6.57107L6.76866 10.3555C7.36545 11.2134 8.6346 11.2133 9.23138 10.3555L11.864 6.57106C12.3253 5.90803 11.8508 5 11.0431 5H4.95693Z"
      fill="currentColor"
    />
  </svg>
);

const Memo = memo(ArrowCaret);
export default Memo;
