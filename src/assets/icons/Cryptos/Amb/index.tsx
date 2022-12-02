import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="14"
    height="30"
    viewBox="0 0 24 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.14101 29.9075C0.946189 30.0263 0.692446 29.9712 0.564374 29.7824L0.0738214 29.0591C-0.0542504 28.8703 -0.011245 28.6145 0.16845 28.4739C1.78415 27.2097 3.11224 25.7847 4.15669 24.2585C8.04575 18.5757 8.04575 11.4244 4.15669 5.74158C3.11224 4.21538 1.78415 2.79042 0.168451 1.52618C-0.011244 1.38558 -0.0542495 1.12984 0.0738224 0.941003L0.564375 0.217718C0.692447 0.0288857 0.946191 -0.0261775 1.14101 0.0925851L22.9313 13.3758C24.1474 14.1172 24.1474 15.8829 22.9313 16.6243L1.14101 29.9075Z"
      fill="url(#paint0_linear_2494_11262)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2494_11262"
        x1="26.6263"
        y1="15.2653"
        x2="-8.76879"
        y2="15.2653"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3568DD" />
        <stop offset="1" stopColor="#3568DD" stopOpacity="0.66" />
      </linearGradient>
    </defs>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
