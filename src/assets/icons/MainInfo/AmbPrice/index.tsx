import * as React from 'react';
import { SVGProps, memo } from 'react';

const AmbPrice = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="40"
    height="41"
    viewBox="0 0 40 41"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect x="0.5" y="1" width="39" height="39" rx="19.5" fill="white" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.7178 29.8781C13.5953 29.9528 13.4356 29.9182 13.3551 29.7994L13.0464 29.3444C12.9659 29.2256 12.9929 29.0647 13.106 28.9762C14.1224 28.1809 14.9579 27.2845 15.615 26.3243C18.0616 22.7492 18.0616 18.2503 15.615 14.6752C14.9579 13.7151 14.1224 12.8186 13.106 12.0233C12.9929 11.9348 12.9659 11.7739 13.0464 11.6551L13.3551 11.2001C13.4356 11.0813 13.5953 11.0467 13.7178 11.1214L27.4262 19.4779C28.1913 19.9443 28.1913 21.0552 27.4262 21.5216L13.7178 29.8781Z"
      fill="#A2B2D8"
    />
    <rect x="0.5" y="1" width="39" height="39" rx="19.5" stroke="#EDF3FF" />
  </svg>
);

const Memo = memo(AmbPrice);
export default Memo;
