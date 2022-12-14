import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1029_3723)">
      <path d="M12 24C18.65 24 24 18.65 24 12C24 5.34996 18.65 0 12 0C5.34996 0 0 5.34996 0 12C0 18.65 5.34996 24 12 24Z" fill="#E3ECFF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.57425 19.9666C7.4762 20.03 7.3485 20.0006 7.28404 19.8997L7.03715 19.5132C6.9727 19.4123 6.99434 19.2756 7.08478 19.2005C7.89793 18.5248 8.56634 17.7633 9.092 16.9477C11.0493 13.9108 11.0493 10.0892 9.092 7.05226C8.56634 6.23665 7.89793 5.47515 7.08478 4.79955C6.99434 4.72441 6.9727 4.58774 7.03715 4.48683L7.28404 4.1003C7.3485 3.99939 7.4762 3.96996 7.57425 4.03343L18.5409 11.132C19.153 11.5282 19.153 12.4718 18.541 12.868L7.57425 19.9666Z" fill="url(#paint0_linear_1029_3723)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear_1029_3723" x1="20.4006" y1="12.1417" x2="2.58681" y2="12.1417" gradientUnits="userSpaceOnUse">
        <stop stopColor="#3568DD"/>
        <stop offset="1" stopColor="#3568DD" stopOpacity="0.66"/>
      </linearGradient>
      <clipPath id="clip0_1029_3723">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>

);

const Memo = memo(SvgComponent);
export default Memo;
