import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1002_4734)">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 0C18.6279 0 24 5.37212 24 12C24 18.6279 18.6279 24 12 24C5.37212 24 0 18.6279 0 12C0 5.37212 5.37212 0 12 0Z" fill="#F0B90B"/>
      <path d="M6.5951 12L6.60375 15.1731L9.2999 16.7596V18.6173L5.02586 16.1106V11.0721L6.5951 12ZM6.5951 8.82693V10.676L5.0249 9.74712V7.89808L6.5951 6.96924L8.17298 7.89808L6.5951 8.82693ZM10.4259 7.89808L11.9961 6.96924L13.5739 7.89808L11.9961 8.82693L10.4259 7.89808Z" fill="white"/>
      <path d="M7.72998 14.5154V12.6577L9.30017 13.5865V15.4356L7.72998 14.5154ZM10.4261 17.425L11.9963 18.3539L13.5742 17.425V19.274L11.9963 20.2029L10.4261 19.274V17.425ZM15.8261 7.89808L17.3963 6.96924L18.9742 7.89808V9.74712L17.3963 10.676V8.82693L15.8261 7.89808ZM17.3963 15.1731L17.405 12L18.9752 11.0712V16.1096L14.7011 18.6164V16.7587L17.3963 15.1731Z" fill="white"/>
      <path d="M16.2704 14.5154L14.7002 15.4356V13.5866L16.2704 12.6577V14.5154Z" fill="white"/>
      <path d="M16.2704 9.48438L16.279 11.3421L13.5752 12.9286V16.1094L12.005 17.0296L10.4348 16.1094V12.9286L7.73094 11.3421V9.48438L9.30786 8.55553L11.9954 10.1498L14.6992 8.55553L16.2771 9.48438H16.2704ZM7.72998 6.31226L11.9963 3.79688L16.2704 6.31226L14.7002 7.24111L11.9963 5.64688L9.30017 7.24111L7.72998 6.31226Z" fill="white"/>
    </g>
    <defs>
      <clipPath id="clip0_1002_4734">
        <rect width="24" height="24" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
