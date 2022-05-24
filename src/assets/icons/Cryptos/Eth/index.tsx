import * as React from 'react';
import { memo, SVGProps } from 'react';

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    shapeRendering="geometricPrecision"
    textRendering="geometricPrecision"
    imageRendering="optimizeQuality"
    fillRule="evenodd"
    clipRule="evenodd"
    viewBox="0 0 784.37 1277.39"
    width="20px"
    height="20px"
  >
    <g fillRule="nonzero">
      <path
        fill="#343434"
        d="m392.07 0-8.57 29.11v844.63l8.57 8.55 392.06-231.75z"
      />
      <path fill="#8C8C8C" d="M392.07 0 0 650.54l392.07 231.75V472.33z" />
      <path
        fill="#3C3C3B"
        d="m392.07 956.52-4.83 5.89v300.87l4.83 14.1 392.3-552.49z"
      />
      <path fill="#8C8C8C" d="M392.07 1277.38V956.52L0 724.89z" />
      <path fill="#141414" d="m392.07 882.29 392.06-231.75-392.06-178.21z" />
      <path fill="#393939" d="m0 650.54 392.07 231.75V472.33z" />
    </g>
  </svg>
);

const Memo = memo(SvgComponent);
export default Memo;
