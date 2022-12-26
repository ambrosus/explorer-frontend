import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1029_3716)">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C18.6279 0 24 5.37212 24 12C24 18.6279 18.6279 24 12 24C5.37212 24 0 18.6279 0 12C0 5.37212 5.37212 0 12 0Z" fill="#E3ECFF"/>
      <rect x="9" y="6" width="4" height="2" fill="#4675E0"/>
      <rect x="11" y="6" width="4" height="2" fill="#4675E0"/>
      <path d="M15 6H17V8H15V6Z" fill="#4675E0"/>
      <path d="M15 8H17V10H15V8Z" fill="#4675E0"/>
      <rect x="7" y="6" width="2" height="2" fill="#4675E0"/>
      <rect x="7" y="16" width="2" height="2" fill="#4675E0"/>
      <rect x="11" y="16" width="2" height="2" fill="#4675E0"/>
      <rect x="13" y="16" width="2" height="2" fill="#4675E0"/>
      <rect x="9" y="16" width="2" height="2" fill="#4675E0"/>
      <rect x="7" y="8" width="2" height="8" fill="#4675E0"/>
      <path d="M11 18H13V20H11V18Z" fill="#4675E0"/>
      <rect x="15" y="12" width="2" height="4" fill="#4675E0"/>
      <rect x="15" y="12" width="2" height="2" fill="#4675E0"/>
      <rect x="11" y="12" width="4" height="2" fill="#4675E0"/>
      <rect x="15" y="16" width="2" height="2" fill="#4675E0"/>
      <path d="M11 4H13V6H11V4Z" fill="#4675E0"/>
    </g>
    <defs>
      <clipPath id="clip0_1029_3716">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
