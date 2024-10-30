import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="48" height="49" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_5027_36842)">
      <circle cx="24" cy="24.5" r="24" fill="#302C58"/>
      <path
        d="M47.8333 25C47.8333 38.1628 37.1628 48.8333 24 48.8333C10.8372 48.8333 0.166667 38.1628 0.166667 25C0.166667 11.8372 10.8372 1.16667 24 1.16667C37.1628 1.16667 47.8333 11.8372 47.8333 25Z"
        fill="url(#paint0_linear_5027_36842)" stroke="#0C0C0D" stroke-width="0.333333"/>
      <path
        d="M28.7962 26.2518V21.4485C28.7962 20.7902 28.6679 20.1709 28.4112 19.5907C28.1657 18.9994 27.8253 18.4861 27.3901 18.051C26.9549 17.6159 26.4415 17.2755 25.8501 17.0301C25.2698 16.7735 24.6504 16.6451 23.992 16.6451C23.3336 16.6451 22.7087 16.7735 22.1172 17.0301C21.5369 17.2755 21.0292 17.6159 20.5939 18.051C20.1587 18.4861 19.8128 18.9994 19.5561 19.5907C19.3106 20.1709 19.1878 20.7902 19.1878 21.4485V26.2518H28.7962ZM33.6004 35.8418H28.7962V31.0384H19.1878V35.8418H14.4004V21.4485C14.4004 20.1207 14.6515 18.8767 15.1537 17.7163C15.6558 16.5447 16.3366 15.5238 17.1959 14.6535C18.0663 13.7832 19.0818 13.097 20.2424 12.5949C21.4142 12.0928 22.664 11.8418 23.992 11.8418C25.32 11.8418 26.5643 12.0928 27.7249 12.5949C28.8966 13.097 29.9177 13.7832 30.7882 14.6535C31.6586 15.5238 32.3449 16.5447 32.8471 17.7163C33.3493 18.8767 33.6004 20.1207 33.6004 21.4485V35.8418Z"
        fill="url(#paint1_linear_5027_36842)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_5027_36842" x1="0" y1="1" x2="51.1638" y2="45.3501"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#2E2E2E"/>
        <stop offset="1" stop-color="#080808"/>
      </linearGradient>
      <linearGradient id="paint1_linear_5027_36842" x1="19.735" y1="11.8418" x2="39.4349" y2="25.0465"
                      gradientUnits="userSpaceOnUse">
        <stop stop-color="#5CB1FF"/>
        <stop offset="0.503888" stop-color="#33E7FF"/>
        <stop offset="1" stop-color="#00E4C9"/>
      </linearGradient>
      <clipPath id="clip0_5027_36842">
        <rect y="0.5" width="48" height="48" rx="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
