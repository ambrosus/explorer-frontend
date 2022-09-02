import * as React from 'react';
import { SVGProps } from 'react';

const Link = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.166 5.833h-2.5a.836.836 0 0 0-.833.833c0 .459.375.834.833.834h2.5c1.375 0 2.5 1.125 2.5 2.5s-1.125 2.5-2.5 2.5h-2.5a.836.836 0 0 0-.833.833c0 .458.375.833.833.833h2.5c2.3 0 4.167-1.866 4.167-4.166 0-2.3-1.866-4.167-4.166-4.167ZM6.666 10c0 .458.375.833.834.833h5a.836.836 0 0 0 .833-.833.836.836 0 0 0-.833-.834h-5a.836.836 0 0 0-.833.834Zm1.667 2.5h-2.5a2.507 2.507 0 0 1-2.5-2.5c0-1.375 1.125-2.5 2.5-2.5h2.5a.836.836 0 0 0 .833-.834.836.836 0 0 0-.833-.833h-2.5A4.168 4.168 0 0 0 1.666 10c0 2.3 1.867 4.166 4.167 4.166h2.5a.836.836 0 0 0 .833-.833.836.836 0 0 0-.833-.833Z"
      fill="#808A9D"
    />
  </svg>
);

export default Link;
