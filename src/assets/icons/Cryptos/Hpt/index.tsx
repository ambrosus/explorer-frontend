import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1029_3696)">
      <path d="M12 24C18.65 24 24 18.65 24 12C24 5.34996 18.65 0 12 0C5.34996 0 0 5.34996 0 12C0 18.65 5.34996 24 12 24Z" fill="#3568DD"/>
      <rect x="6" y="10" width="3" height="4" fill="white"/>
      <path d="M6 14H9V18H8C6.89543 18 6 17.1046 6 16V14Z" fill="white"/>
      <path d="M6 6H7C8.10457 6 9 6.89543 9 8V10H6V6Z" fill="white"/>
      <path d="M17 18H18C18.5523 18 19 17.5523 19 17V16H17V18Z" fill="white"/>
      <path d="M13 6H14C15.1046 6 16 6.89543 16 8V10H13V6Z" fill="white"/>
      <rect x="9" y="11" width="4" height="2" fill="white"/>
      <path d="M13 14H16V18H15C13.8954 18 13 17.1046 13 16V14Z" fill="white"/>
      <rect x="13" y="10" width="3" height="4" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_1029_3696">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
