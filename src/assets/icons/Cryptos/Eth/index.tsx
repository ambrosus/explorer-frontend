import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1002_4790)">
      <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#627EEA"/>
      <path d="M12.3735 3V9.6525L17.9963 12.165L12.3735 3Z" fill="white" fillOpacity="0.602"/>
      <path d="M12.3735 3L6.75 12.165L12.3735 9.6525V3Z" fill="white"/>
      <path d="M12.3735 16.4759V20.9962L18 13.2119L12.3735 16.4759Z" fill="white" fillOpacity="0.602"/>
      <path d="M12.3735 20.9962V16.4752L6.75 13.2119L12.3735 20.9962Z" fill="white"/>
      <path d="M12.3735 15.4296L17.9963 12.1648L12.3735 9.65381V15.4296Z" fill="white" fillOpacity="0.2"/>
      <path d="M6.75 12.1648L12.3735 15.4296V9.65381L6.75 12.1648Z" fill="white" fillOpacity="0.602"/>
    </g>
    <defs>
      <clipPath id="clip0_1002_4790">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
