import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="12" fill="#F0B90B"/>
    <g clipPath="url(#clip0_1002_4741)">
      <path d="M11.9997 5.02979L13.7268 6.79317L9.37794 11.129L7.65088 9.40712L11.9997 5.02979Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M11.9999 5L13.7561 6.79314L9.378 11.1581L7.62158 9.40699L11.9999 5ZM7.6803 9.40685L9.378 11.0995L13.6976 6.79279L11.9997 5.05917L7.6803 9.40685Z" fill="white"/>
      <path d="M14.6215 7.64355L16.3486 9.40694L9.37794 16.3567L7.65088 14.6348L14.6215 7.64355Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M14.6218 7.61377L16.3779 9.40688L9.37802 16.3858L7.62158 14.6347L14.6218 7.61377ZM7.68035 14.6346L9.37802 16.3272L16.3194 9.40654L14.6215 7.67289L7.68035 14.6346Z" fill="white"/>
      <path d="M6.75636 10.2573L8.48341 12.0207L6.75636 13.7426L5.0293 12.0207L6.75636 10.2573Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M6.75631 10.228L8.51262 12.0213L6.75631 13.7723L5 12.0213L6.75631 10.228ZM5.05851 12.0209L6.75631 13.7137L8.45412 12.0209L6.75631 10.2874L5.05851 12.0209Z" fill="white"/>
      <path d="M17.2436 10.2573L18.9707 12.0207L12 18.9705L10.2729 17.2486L17.2436 10.2573Z" fill="white"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M17.2438 10.228L19 12.0211L12.0001 19.0001L10.2437 17.2489L17.2438 10.228ZM10.3024 17.2488L12.0001 18.9414L18.9415 12.0208L17.2436 10.2871L10.3024 17.2488Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_1002_4741">
        <rect width="14" height="14" fill="white" transform="translate(5 5)"/>
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
